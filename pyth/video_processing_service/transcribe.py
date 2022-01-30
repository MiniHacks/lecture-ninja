from google.cloud import speech, storage
import ffmpeg
from rich import print
import time

fin = 'ted.mp4'
stem = fin.split(".")[0]
fout = stem + ".wav"

stream = ffmpeg.input('ted.mp4')
# type is coerced to wav by fout
# vn=None sets -vn, no video
# y=None sets -y, no confirmation
stream = ffmpeg.output(stream.audio, fout, vn=None, y=None)
# write to outfile (I think)
ffmpeg.run(stream)

storage_client = storage.Client()
speech_client = speech.SpeechClient()

destination = f"{stem}_wav_blob"
bucket = storage_client.bucket("covert_goose_videos")
blob = bucket.blob(destination)

blob.upload_from_filename(fout)

print(f"File {fout} uploaded to {destination}.")

uri=f"gs://covert_goose_videos/{destination}"
print(uri)
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

print(f"{time.ctime}: Started operation.")

operation = speech_client.long_running_recognize(config=config, audio=audio)
response = operation.result(timeout=600)

print(f"{time.ctime}: Finished operation.")

print(response)
for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        print("-" * 20)
        print("First alternative of result {}".format(i))
        print(u"Transcript: {}".format(alternative.transcript))