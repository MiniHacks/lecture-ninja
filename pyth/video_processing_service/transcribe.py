from google.cloud import speech
import ffmpeg
import io

"""
stream = ffmpeg.input('ted.mp4')
stream = ffmpeg.hflip(stream)
stream = ffmpeg.output(stream, 'flip.mp4')
ffmpeg.run(stream)
"""

# Instantiates a client

stream = ffmpeg.input('ted.mp4')
# c=:a refers to just the audio channel, vn=None enables a binary ignore video flag
stream = ffmpeg.output(stream.audio, "out.m4a", acodec="copy", vn=None)
ffmpeg.run(stream)

speech_file = "out.m4a"
with io.open(speech_file, "rb") as audio_file:
        content = audio_file.read()
audio = speech.RecognitionAudio(uri="gs://covert_goose_videos/google_test")

client = speech.SpeechClient()

diarization_config = speech.SpeakerDiarizationConfig(
  enable_speaker_diarization=True,
  min_speaker_count=1,
  max_speaker_count=20,
)


config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    enable_automatic_punctuation=True,
    sample_rate_hertz=44100,#16000,
    language_code="en-US",
    enable_word_time_offsets=True,
    diarization_config=diarization_config,
    model="video"
)

# Detects speech in the audio file
#gcs_uri = "gs://covert_goose_videos/test.wav"
#audio = speech.RecognitionAudio(uri=gcs_uri)
operation = client.long_running_recognize(config=config, audio=audio)
response = operation.result(timeout=600)

print(response)
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