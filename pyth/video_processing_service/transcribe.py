from google.cloud import speech, storage
import ffmpeg
from rich import print
# Instantiates a client

fin = 'ted.mp4'
stem = fin.split(".")[0]
fout = stem + ".wav"

stream = ffmpeg.input('ted.mp4')
# c=:a refers to just the audio channel, vn=None enables a binary ignore video flag
stream = ffmpeg.output(stream.audio, fout, vn=None, y=None)
ffmpeg.run(stream)

storage_client = storage.Client()
destination = f"{stem}_wav_blob"
bucket = storage_client.bucket("covert_goose_videos")
blob = bucket.blob(destination)

blob.upload_from_filename(fout)

print(f"File {fout} uploaded to {destination}.")

uri=f"gs://covert_goose_videos/{destination}"
print(uri)
audio = speech.RecognitionAudio(uri=uri)

client = speech.SpeechClient()

diarization_config = speech.SpeakerDiarizationConfig(
  enable_speaker_diarization=True,
  min_speaker_count=1,
  max_speaker_count=20,
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

# Detects speech in the audio file
#gcs_uri = "gs://covert_goose_videos/test.wav"
#audio = speech.RecognitionAudio(uri=gcs_uri)
print(u"Waiting for operation to complete...")
operation = client.long_running_recognize(config=config, audio=audio)

response = operation.result(timeout=60)
print("Operation ends!")

print(response)
for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        print("-" * 20)
        print("First alternative of result {}".format(i))
        print(u"Transcript: {}".format(alternative.transcript))

"""
for result in response.results:
    alternative = result.alternatives[0]
    # print(f'Alternatives: {list(map(lambda x: x.words, result.alternatives))}')
    print(f'Transcript: {alternative.transcript}')
    print(f'Confidence: {alternative.confidence}')

    for word_info in alternative.words:
        word = word_info.word
        start_time = word_info.start_time
        end_time = word_info.end_time
        speaker = word_info.speaker_tag
        print(f'Word: {word}, start_time: {start_time}, end_time: {end_time}')
"""