import functools
import io
import itertools
from multiprocessing.sharedctypes import Value
from pathlib import Path
import statistics
from typing import Callable, Dict, Iterable, List, Optional, Tuple
from warnings import warn
import cv2
import numpy as np
from dataclasses import dataclass

from video_processing_service import gcs, model


@dataclass
class Region:
    image_size: Tuple[int, int]
    contour: np.ndarray
    bounding_rect: Tuple[int, int, int, int]

    def aspect_ratio(self) -> float:
        _, _, width, height = self.bounding_rect
        return width / height

    def size(self) -> int:
        _, _, width, height = self.bounding_rect
        return width * height

    def get_bounding_rect_bitmask(self):
        ret = np.zeros(self.image_size, dtype=np.uint8)
        x, y, width, height = self.bounding_rect
        ret[y : y + height, x : x + width] = 255
        return ret


def guess_slide_region(color_img: np.ndarray) -> Region:
    greyscale_img = cv2.cvtColor(
        cv2.GaussianBlur(color_img, (5, 5), 2), cv2.COLOR_BGR2GRAY
    )
    _, thresholded = cv2.threshold(
        greyscale_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )

    # contours is a list of np.ndarrays
    contours, _ = cv2.findContours(
        thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )

    # each bounding rect is (x, y, width, height)
    bounding_rects = list(map(cv2.boundingRect, contours))

    def aspect_ratio_error(ar):
        sixteen_nine = 16 / 9
        four_three = 4 / 3
        # Most slides are either 16:9 or 4:3
        return min(
            abs(ar - sixteen_nine) / sixteen_nine,
            abs(ar - four_three) / four_three,
        )

    regions = [
        Region(greyscale_img.shape, contour, bounding_rect)
        for contour, bounding_rect in zip(contours, bounding_rects)
    ]

    best_region: Region = max(
        [r for r in regions],  # if aspect_ratio_error(r.aspect_ratio()) < 0.2],
        key=Region.size,
    )

    all_rectangles = color_img.copy()
    for x, y, w, h in bounding_rects:
        all_rectangles = cv2.rectangle(
            all_rectangles, (x, y), (x + w, y + h), (0, 0, 255)
        )
        all_rectangles = cv2.putText(
            all_rectangles,
            f"{aspect_ratio_error(w/h):0.2f}",
            (x, y - 2),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
            cv2.LINE_4,
        )
    x, y, w, h = best_region.bounding_rect
    all_rectangles = cv2.rectangle(
        all_rectangles, (x, y), (x + w, y + h), (255, 0, 255)
    )

    all_contours = cv2.drawContours(color_img.copy(), contours, -1, (0, 0, 255))
    all_contours = cv2.drawContours(
        all_contours, [best_region.contour], -1, (255, 0, 255)
    )
    for i, (x, y, _, _) in enumerate(bounding_rects):
        all_contours = cv2.putText(
            all_contours,
            f"c {i}",
            (x + 2, y + 2),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
            cv2.LINE_4,
        )

    # cv2.imshow("rectangle", all_rectangles)
    # cv2.imshow("contours", all_contours)

    return best_region


@dataclass
class FeatureVector:
    img: np.ndarray
    keypoints: Tuple[cv2.KeyPoint, ...]
    descriptors: np.ndarray
    region: Region


def extract_features(color_img: np.ndarray) -> FeatureVector:
    slide_region = guess_slide_region(color_img)

    region_bitmask = slide_region.get_bounding_rect_bitmask()

    FEATURE_EXTRACTOR = cv2.ORB_create()
    keypoints, descriptors = FEATURE_EXTRACTOR.detectAndCompute(
        color_img, region_bitmask
    )
    return FeatureVector(color_img, keypoints, descriptors, slide_region)


def get_num_sift_matches_between_slides(
    slide_a: FeatureVector, slide_b: FeatureVector
) -> int:
    # create BFMatcher object
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    # Match descriptors.
    matches = bf.match(slide_a.descriptors, slide_b.descriptors)

    return len(matches)


def get_num_sift_matches_between_imgs(a: np.ndarray, b: np.ndarray) -> int:
    if False:
        a_features = extract_features(a)
        b_features = extract_features(b)
        cv2.imshow("a", a)
        cv2.imshow("b", b)
        cv2.imshow("a mask", a_features.region.get_bounding_rect_bitmask())
        cv2.imshow("b mask", b_features.region.get_bounding_rect_bitmask())
        cv2.imshow("a keypoints", cv2.drawKeypoints(a, a_features.keypoints, None))
        cv2.imshow("b keypoints", cv2.drawKeypoints(b, b_features.keypoints, None))
        cv2.waitKey()
        cv2.destroyAllWindows()
    else:
        a_features = extract_features(a)
        b_features = extract_features(b)

    return get_num_sift_matches_between_slides(a_features, b_features)


# a window is a list of images
@dataclass
class Window:
    frame_offset: int
    frames: List[np.ndarray]

    def enumerate(self) -> Iterable[Tuple[int, np.ndarray]]:
        return ((i + self.frame_offset, f) for i, f in enumerate(self.frames))

    def sub_window(
        self, start: Optional[int] = None, end: Optional[int] = None
    ) -> "Window":
        start = start - self.frame_offset if start is not None else 0
        end = end - self.frame_offset if end is not None else len(self.frames) - 1

        return Window(
            frame_offset=self.frame_offset + start, frames=self.frames[start:end]
        )

    def sample_frames(self, k: int) -> Iterable[Tuple[int, np.ndarray]]:
        step = len(self.frames) // k
        return itertools.islice(self.enumerate(), None, None, step)

    def __len__(self):
        return len(self.frames)


def lazy_get_windows(
    vid: cv2.VideoCapture, window_size=300, frame_step=3
) -> Iterable[Window]:
    frame_counter = 0
    while True:
        frames = []
        need_to_return = False
        # time to get the next window
        for i in range(window_size):
            for i2 in range(frame_step):
                ret, frame = vid.read()

            frame_counter += 1
            if ret:
                frames.append(frame)
            else:
                need_to_return = True
                break

        yield Window(frame_offset=frame_counter, frames=frames)
        if need_to_return:
            return


def overlapping_pairs(i):
    i = iter(i)
    try:
        prev = next(i)
        for cur in i:
            yield (prev, cur)
            prev = cur
    except StopIteration:
        return


def recursive_interval_pruning(
    window: Window, transition_frame: List[Tuple[int, np.ndarray]], recursion_level=0
) -> List[Tuple[int, np.ndarray]]:
    if len(window) < 30:
        if len(window.frames) > 0:
            transition_frame.append((window.frame_offset, window.frames[0]))
        else:
            warn("for some reason, recursive_interval_pruning was given an empty window")
        return transition_frame

    samples = list(enumerate(window.sample_frames(10)))

    feature_match_memoization: Dict[Tuple[int, int], int] = dict()
    for i, (x_fidx, x) in samples:
        for j, (y_fidx, y) in samples:
            if j > i:
                # print((x_fidx, y_fidx))
                feature_match_memoization[i, j] = get_num_sift_matches_between_imgs(
                    x, y
                )

    mu = statistics.mean(feature_match_memoization.values())
    sigma = statistics.stdev(feature_match_memoization.values())
    try:
        threshold = mu * (1 - 1 / sigma)
    except ZeroDivisionError:
        return transition_frame

    print("\t" * recursion_level + f"want threshold to be {threshold}")

    for a, b in overlapping_pairs(samples):
        a_i, (a_frame_idx, a_frame) = a
        b_i, (b_frame_idx, b_frame) = b

        num_matches = feature_match_memoization[(a_i, b_i)]
        print(
            "\t" * recursion_level
            + f"{num_matches} feature matches between frames #{a_frame_idx} and #{b_frame_idx}"
        )
        if num_matches < threshold:
            recursive_interval_pruning(
                window.sub_window(a_frame_idx, b_frame_idx),
                transition_frame,
                recursion_level=recursion_level + 1,
            )

    return transition_frame

    video = cv2.VideoCapture(
        "/home/ritik/codeday_workspace/LectureNinja/pyth/IMG_1619.MOV"
    )
    print("starting . . .")
    window_size = 300
    frame_step = 3
    for i, window in enumerate(lazy_get_windows(video, window_size, frame_step)):
        print(f"doing the {i} time")
        x = recursive_interval_pruning(window, [])
        print(f"{len(x)} slide changes")
        for frame_id, frame in x:
            cv2.imwrite(f"{frame_id}.png", frame)


def extract_slides_from_video(
    video_filename, image_uploader: Callable[[int, np.ndarray], str]
) -> List[Tuple[int, str]]:
    """returns tuple of timestamp offsets from start as well as links to URLs as provided by the image uploader"""
    video = cv2.VideoCapture(video_filename)
    # print("starting . . .")
    window_size = 300
    frame_step = 3

    adjusted_fps = 30 / frame_step

    ret = []

    for i, window in enumerate(lazy_get_windows(video, window_size, frame_step)):
        print(f"doing the {i} time")
        x = recursive_interval_pruning(window, [])
        print(f"{len(x)} slide changes")
        ret.extend(
            (
                (frame_id / adjusted_fps, image_uploader(frame_id, frame))
                for frame_id, frame in x
            )
        )

    return ret


def lazy_convert_extracted_uploaded_slides_to_figures(
    uploaded_slides: List[Tuple[int, str]]
) -> model.Section:
    return model.Section(
        timestamp=0,
        contents=[
            model.Figure(timestamp=t, image_url=url, caption=None)
            for t, url in uploaded_slides
        ],
    )


def upload_ndarray_to_gcs_bucket(video_filename, image_frame_id, image) -> str:
    stem = Path(video_filename).stem
    destination = f"{stem}_{image_frame_id}.png"
    is_success, buffer = cv2.imencode(".png", image)
    if not is_success:
        raise ValueError(
            "help! something wentt wrong when encoding an image to png????"
        )

    io_buf = io.BytesIO(buffer)

    bucket = gcs.storage_client.bucket("covert_goose_slides")
    blob = bucket.blob(destination)
    blob.upload_from_file(io_buf)

    public_url = f"http://storage.googleapis.com/covert_goose_slides/{destination}"
    return public_url

def video_to_figures_schema(video_filename) -> model.Section:
    extracted_and_uploaded = extract_slides_from_video(
        str(video_filename),
        functools.partial(upload_ndarray_to_gcs_bucket, video_filename)
    )

    return lazy_convert_extracted_uploaded_slides_to_figures(extracted_and_uploaded)

def merge_schema(text_section: model.Section, figures_section: model.Section) -> model.Section:
    text = text_section.contents
    figures = figures_section.contents

    result_contents = [*text, *figures]
    result_contents.sort(key=lambda x: x.timestamp)
    return model.Section(timestamp=0, contents=result_contents)
