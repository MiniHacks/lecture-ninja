from google.cloud import speech


# Instantiates a client
client = speech.SpeechClient()

diarization_config = speech.SpeakerDiarizationConfig(
  enable_speaker_diarization=True,
  min_speaker_count=1,
  max_speaker_count=20,
)


config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    enable_automatic_punctuation=True,
    sample_rate_hertz=16000,
    language_code="en-US",
    enable_word_time_offsets=True,
    diarization_config=diarization_config,
)

# Local file
import io
speech_file = "test.mkv"
with io.open(speech_file, "rb") as audio_file:
        content = audio_file.read()


# The name of the audio file to transcribe
gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"
audio = speech.RecognitionAudio(uri=gcs_uri)

# Detects speech in the audio file
response = client.recognize(config=config, audio=audio)

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
        print(f'Word: {word}, Speaker: {speaker}, start_time: {start_time}, end_time: {end_time}')
