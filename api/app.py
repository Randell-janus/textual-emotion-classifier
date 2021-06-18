from fastapi import FastAPI
from transformers import pipeline
from pydantic import BaseModel

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# class TextClassification(BaseModel):
#     text: str
    
@app.get("/")
def read_root():
    return {"Hello": "User"}

@app.post("/classify")
def classify_text(text):
    classify = pipeline('sentiment-analysis')
    output = classify(text)
    return output

@app.post("/goemotions")
def classify_emotion(text):
    model_name= "joeddav/distilbert-base-uncased-go-emotions-student"
    classify = pipeline('sentiment-analysis', model=model_name)
    output = classify(text)
    return output