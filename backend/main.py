from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tweepy
import requests
from pprint import pprint

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

auth = tweepy.OAuth2BearerHandler(
    "AAAAAAAAAAAAAAAAAAAAAIATdAEAAAAAWHX22r4oXMHg%2BfWdVF0B6hXSCIE%3DoEjaAbVzxc9D68sXx7Og9qMKz0T42ELHOgK9oLzQKvFKWm4KrX"
)

api = tweepy.API(auth)


@app.get("/")
def index():
    return "Home"


@app.get("/users/{user}/tweets")
def req_user(user):
    results = list(api.search_tweets(q=user))
    dicts = []
    for result in results:
        dicts.append(result._json)
    return dicts


@app.get("/tweets/{tweet_id}/embedding")
def req_embedding(tweet_id):
    embedding = requests.get(
        f"https://publish.twitter.com/oembed?url=https://twitter.com/twitter/status/{tweet_id}"
    )
    return embedding.json()
