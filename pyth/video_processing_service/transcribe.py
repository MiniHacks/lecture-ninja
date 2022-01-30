from google.cloud import speech, storage
import ffmpeg
import rich
import time


def transcribe_video(f):
    def print(s):
        rich.print(f"{time.ctime()}: {s}")

    stem = f.split(".")[0]
    out_file = stem + ".wav"

    print("Started ffmpeg conversion.")
    stream = ffmpeg.input('ted.mp4')
    # type is coerced to wav by out_file
    # vn=None sets -vn, no video
    # y=None sets -y, no confirmation
    stream = ffmpeg.output(stream.audio, out_file, vn=None, y=None, loglevel="error")
    # write to outfile
    ffmpeg.run(stream)
    print("Finished ffmpeg conversion.")

    storage_client = storage.Client()
    speech_client = speech.SpeechClient()

    destination = f"{stem}_wav_blob"
    bucket = storage_client.bucket("covert_goose_videos")
    blob = bucket.blob(destination)

    blob.upload_from_filename(out_file)

    print(f"Uploaded {out_file} to {destination}.")

    uri=f"gs://covert_goose_videos/{destination}"
    audio = speech.RecognitionAudio(uri=uri)


    # enable speaker tagging
    diarization_config = speech.SpeakerDiarizationConfig(
    enable_speaker_diarization=True,
    min_speaker_count=1,
    max_speaker_count=4,
    )

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        enable_automatic_punctuation=True,
        sample_rate_hertz=44100,
        language_code="en-US",
        enable_word_time_offsets=True,
        audio_channel_count=2,
        diarization_config=diarization_config,
        model="video"
    )

    print(f"Started operation.")

    operation = speech_client.long_running_recognize(config=config, audio=audio)
    response = operation.result(timeout=600)

    print(f"Finished operation.")

    import pdb; pdb.set_trace()
    for i, result in enumerate(response.results):
            print(f"Result {i}: {result.alternatives[0].transcript}")
    
    return response.results
if __name__ == "__main__":
    f = 'ted.mp4'
    transcribe_video(f)