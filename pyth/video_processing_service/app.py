from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

from uuid import uuid4
import subprocess
from pathlib import Path
import os

from video_processing_service import model, transcribe

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

    with open(video_filename, "wb") as f:
        f.write(video_file.file.read())

    schema: model.TextbookElement =  transcribe.convert_textbook_to_schema(video_filename)

    return schema

@app.get("/test_schema")
async def test_schema() -> model.TextbookElement:
    return model.Section(
        timestamp=0,
        contents=[
        model.Heading(text="Scratch for PhD students", timestamp=0),
        model.Figure(
            image_url="https://placekitten.com/200/300",
            caption = "scratch cat cosplay",
            timestamp=0
        ),
        model.Paragraph(
            contents=[
                model.ParagraphSegment(text="scratch is a event-driven programming language.", timestamp=50, speaker_tag="Speaker 1"),
                model.ParagraphSegment(text="it supports a lightweight threading model using both message-passing and shared-state paradigms.", timestamp=55, speaker_tag="Speaker 2"),
            ],
            timestamp=50
        )
    ])
