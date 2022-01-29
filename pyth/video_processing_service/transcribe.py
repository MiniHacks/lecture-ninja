from google.cloud import speech


# Instantiates a client
client = speech.SpeechClient()

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="en-US",
    enable_word_time_offsets=True
)

# Local file
import io
speech_file = "/Users/shy/Downloads/brooklyn_bridge.raw"
with io.open(speech_file, "rb") as audio_file:
        content = audio_file.read()
audio = speech.RecognitionAudio(content=content)

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
        print(f'Word: {word}, start_time: {start_time}, end_time: {end_time}')


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
        print(f'Word: {word}, start_time: {start_time}, end_time: {end_time}')
