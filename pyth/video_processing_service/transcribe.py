from google.cloud import speech, storage
from google.oauth2 import service_account
import ffmpeg
import time
from pathlib import Path
from video_processing_service import model
from transformers import pipeline

credentials = service_account.Credentials.from_service_account_file(Path(__file__).parent / './gooseninja-ad3a3755b7d3.json')
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

### THESE FUNCS ARE BLOCKING AND SHOULD NOT BE CALLED FROM AN ASYNC CONTEXT ###

def transcribe_video(filename: Path):
    # def print(s):
    #     logger.info(s)

    stem = filename.stem
    out_file = stem + ".wav"

    print("Started ffmpeg conversion.")
    stream = ffmpeg.input(filename)
    # type is coerced to wav by out_file
    # vn=None sets -vn, no video
    # y=None sets -y, no confirmation
    stream = ffmpeg.output(stream.audio, out_file, vn=None, y=None, loglevel="error")
    # write to outfile
    ffmpeg.run(stream)
    print("Finished ffmpeg conversion.")

    storage_client = storage.Client(project="gooseninja", credentials=credentials)
    speech_client = speech.SpeechClient(credentials=credentials)

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
        max_alternatives=0,
        diarization_config=diarization_config,
        model="video"
    )

    print(f"Started operation.")

    operation = speech_client.long_running_recognize(config=config, audio=audio)
    response = operation.result(timeout=600)

    print(f"Finished operation.")

    for i, result in enumerate(response.results):
            print(f"Result {i}: {result.alternatives[0].transcript}")
    
    return response.results

def convert_to_model(sections) -> model.TextbookElement:
    section_contents = [model.Heading(text="empty header", timestamp=0)]
    raw_words = []
    for section in sections:
        segments = []
        for word in section.alternatives[0].words:
            raw_words.append(word.word)
            segments.append(model.ParagraphSegment(text=word.word, timestamp=word.start_time.seconds, speaker_tag=word.speaker_tag))
        section_contents.append(model.Paragraph(contents=segments, timestamp=0))
    
    lecture_text = " ".join(raw_words)

    print("Started summarization.")

    summary_text = summarizer(lecture_text, max_length=200, min_length=100, do_sample=False)[0]['summary_text']
    summary = model.Section(
        contents=[model.Heading(text="Summary", timestamp=0), model.Paragraph(timestamp=0, contents=[model.ParagraphSegment(timestamp=0, text=summary_text, speaker_tag=0, tiemstamp=0)])],
        timestamp=0
        )
    section_contents.append(summary)

    print("Finished summarization.")


    return model.Section(timestamp=0, contents=section_contents)

def convert_textbook_to_schema(filename: str) -> model.TextbookElement:
    return convert_to_model(transcribe_video(filename))

if __name__ == "__main__":
    f = 'ted.mp4'
    t = transcribe_video(f)
    print(convert_to_model(t).json(indent=2))