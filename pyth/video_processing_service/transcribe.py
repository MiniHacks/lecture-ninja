from google.cloud import speech


# Instantiates a client
client = speech.SpeechClient()

# The name of the audio file to transcribe
gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"

audio = speech.RecognitionAudio(uri=gcs_uri)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code="en-US",
    enable_word_time_offsets=True
)

# Detects speech in the audio file
response = client.recognize(config=config, audio=audio)

for result in response.results:
    alternative = result.alternatives[0]
    print('Transcript: {}'.format(alternative.transcript))
    print('Confidence: {}'.format(alternative.confidence))

    for word_info in alternative.words:
        word = word_info.word
        start_time = word_info.start_time
        end_time = word_info.end_time
        print(f'Word: {word}, start_time: {start_time}, end_time: {end_time}')
