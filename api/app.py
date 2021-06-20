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

class TextClassification(BaseModel):
    text: str
    
# @app.get("/")
# def read_root():
#     return {"Hello": "User"}
# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

@app.post("/")
async def classify_emotion(tc: TextClassification):
    model_name= "joeddav/distilbert-base-uncased-go-emotions-student"
    classify = pipeline('sentiment-analysis', model=model_name)
    output = classify(tc.text)
    return output