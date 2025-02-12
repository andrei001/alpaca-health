from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.testclient import TestClient

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Note(BaseModel):
    duration: str
    type: str
    value: str


notes = []

@app.get("/")
async def health_check():
    return {"status": "healthy"}

@app.post("/ai_summary/")
async def get_ai_summary(note: Note):
    client = OpenAI(api_key=openai_api_key)
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant at an ABA Clinic for people with autism. Your job is to take a note from a clinician and summarize it in a professional manner."},
                {
                    "role": "user",
                    "content": note.value + " for duration " + note.duration + " for client type " + note.type
                }
            ]
        )
        return {"status": 200, "message": completion.choices[0].message.content}
    except Exception:
        return {"status": 500}

@app.post("/save/")
async def saveNote(note: Note):
    note_dict = {}
    note_dict['text'] = note.value
    note_dict['duration'] = note.duration
    note_dict['type'] = note.type
    notes.append(note_dict)
    return {"status": 200}

@app.get("/notes/")
async def getNotes():
    return {"status": 200, "notes": notes}


client = TestClient(app)

def test_healthy_check():
    resp = client.get("/")
    assert resp.json() == {"status": "healthy"}

def test_get_notes():
    resp = client.get("/notes")
    assert resp.json() == {"status": 200, "notes": []}

    note_dict = {}
    note_dict['text'] = "Hello"
    note_dict['duration'] = "5 min"
    note_dict['type'] = "client"
    notes.append(note_dict)
    resp = client.get("/notes")
    assert resp.json() == {"status": 200, "notes": [note_dict]}
    notes.clear()

def test_save_notes():
    resp = client.post("/save", json={"value": "hello world", "duration": "5 min", "type": "client"})
    assert resp.json() == {"status": 200}
    assert notes[0]['text'] == "hello world"
    notes.clear()
test_healthy_check()
test_get_notes()
test_save_notes()