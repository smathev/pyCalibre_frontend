
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 30
SECRET_KEY = os.getenv("SECRET_KEY")

FASTAPI_URL = "http://127.0.0.1:8000"