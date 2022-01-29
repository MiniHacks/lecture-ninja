from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

from uuid import uuid4
import subprocess
from pathlib import Path
import os

TEMP_DIR_NAME = Path('temp_files').resolve()

app = FastAPI()

@app.on_event("startup")
def make_temp_file_dir():
    try:
        os.makedirs(TEMP_DIR_NAME)
    except FileExistsError:
        pass # great! it exists :D


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload_video")
def process_video(
    video_file: UploadFile = File(...)
):
    the_uuid = uuid4()

    # TODO: is the file actually an mp4? check mimetype? or do a conversion first? ???
    video_filename = TEMP_DIR_NAME / f"{the_uuid}.mp4" 
    audio_filename = TEMP_DIR_NAME / f"{the_uuid}.mp3"

    with open(video_filename, "wb") as f:
        f.write(video_file.file.read())

    subprocess.run(['ffmpeg', '-i', str(video_filename), '-q:a', '0', '-map', 'a', str(audio_filename)])
    
    return JSONResponse({ "did we extract audio?": "sure did!" }) 
