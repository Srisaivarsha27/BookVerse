from fastapi import APIRouter, Response, Request, HTTPException
from pymongo import MongoClient
import xmltodict
import json

router = APIRouter()
client = MongoClient("mongodb://localhost:27017")
db = client["bookverse"]
books_collection = db["books"]

# Convert dictionary to XML
def dict_to_xml(data: dict) -> str:
    """Convert dictionary to XML format."""
    return xmltodict.unparse({"response": data}, pretty=True)

# Convert XML to dictionary
def xml_to_dict(xml_data: str) -> dict:
    """Convert XML string to dictionary."""
    return xmltodict.parse(xml_data).get("book", {})

# Create a Book (POST)
@router.post("/books", response_class=Response)
async def create_book(request: Request):
    body = await request.body()
    try:
        book_data = xml_to_dict(body.decode("utf-8"))
        
        # Ensure genres are stored as a list
        if "genre" in book_data and isinstance(book_data["genre"], dict):
            book_data["genre"] = book_data["genre"].get("item", [])
            if isinstance(book_data["genre"], str):
                book_data["genre"] = [book_data["genre"]]  # Ensure list format
        
        # Check if book already exists
        existing_book = books_collection.find_one({"title": book_data["title"]})
        if existing_book:
            raise HTTPException(status_code=400, detail="Book already exists")

        books_collection.insert_one(book_data)
        return Response(content=dict_to_xml({"message": "Book added successfully"}), media_type="application/xml")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get All Books (GET)
@router.get("/books", response_class=Response)
async def get_all_books():
    books = list(books_collection.find({}, {"_id": 0}))
    return Response(content=dict_to_xml({"books": {"book": books}}), media_type="application/xml")

# Get Book by Title (GET)
@router.get("/books/{title}", response_class=Response)
async def get_book(title: str):
    book = books_collection.find_one({"title": title}, {"_id": 0})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return Response(content=dict_to_xml({"book": book}), media_type="application/xml")

# Update Book by Title (PUT)
@router.put("/books/{title}", response_class=Response)
async def update_book(title: str, request: Request):
    body = await request.body()
    try:
        update_data = xml_to_dict(body.decode("utf-8"))
        
        # Ensure genres are stored as a list
        if "genre" in update_data and isinstance(update_data["genre"], dict):
            update_data["genre"] = update_data["genre"].get("item", [])
            if isinstance(update_data["genre"], str):
                update_data["genre"] = [update_data["genre"]]  # Ensure list format
        
        result = books_collection.update_one({"title": title}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Book not found")
        
        return Response(content=dict_to_xml({"message": "Book updated successfully"}), media_type="application/xml")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Delete Book by Title (DELETE)
@router.delete("/books/{title}", response_class=Response)
async def delete_book(title: str):
    result = books_collection.delete_one({"title": title})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return Response(content=dict_to_xml({"message": "Book deleted successfully"}), media_type="application/xml")
