from google.cloud import speech, storage
from google.oauth2 import service_account

from pathlib import Path

credentials = service_account.Credentials.from_service_account_file(Path(__file__).parent / './gooseninja-ad3a3755b7d3.json')
storage_client = storage.Client(project="gooseninja", credentials=credentials)

