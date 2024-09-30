from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DEV_DATABASE")
    CORS_HEADERS = "Content-type"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")