from pymongo import MongoClient
from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["bookverse"]  # Use your DB name

# Neo4j Connection
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "bookverse")

neo4j_driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def get_neo4j_session():
    return neo4j_driver.session()

# Ensure it runs when imported
if __name__ == "__main__":
    print("MongoDB Connected:", mongo_db.list_collection_names())
    print("Neo4j Connected:", neo4j_driver is not None)
