
import os
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()


MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file")


client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000
)


db = client["modellab"]
experiments_collection = db["experiments"]



def test_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connection successful!")
        print("Connected database:", db.name)

    except Exception as error:
        print("MongoDB connection failed!")
        print("Error:", error)


if __name__ == "__main__":
    test_connection()

