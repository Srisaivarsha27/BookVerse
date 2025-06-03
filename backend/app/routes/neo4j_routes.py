from fastapi import APIRouter, HTTPException, Response, Query
from app.neo4j_queries.queries import Neo4jQueries

router = APIRouter()
neo4j_db = Neo4jQueries()  # Neo4j instance

# 📌 1️⃣ Get Similar Books
@router.get("/books/similar/{book_name}", response_class=Response)
async def get_similar_books(book_name: str):
    books = neo4j_db.get_similar_books(book_name)
    if not books:
        raise HTTPException(status_code=404, detail="No similar books found")
    
    response_xml = f"<books>{''.join(f'<book>{b}</book>' for b in books)}</books>"
    return Response(content=response_xml, media_type="application/xml")

# 📌 2️⃣ Create SIMILAR_TO Relationship
@router.post("/books/similar/")
async def create_similar(book1: str = Query(...), book2: str = Query(...), weight: float = Query(...)):
    if neo4j_db.create_similar_relationship(book1, book2, weight):
        return {"message": "SIMILAR_TO relationship created successfully"}
    raise HTTPException(status_code=400, detail="Failed to create relationship")

# 📌 3️⃣ Update SIMILAR_TO Relationship
@router.put("/books/similar/")
async def update_similar(book1: str = Query(...), book2: str = Query(...), new_weight: float = Query(...)):
    if neo4j_db.update_similar_relationship(book1, book2, new_weight):
        return {"message": "SIMILAR_TO relationship updated successfully"}
    raise HTTPException(status_code=404, detail="Relationship not found")

# 📌 4️⃣ Delete SIMILAR_TO Relationship
@router.delete("/books/similar/")
async def delete_similar(book1: str = Query(...), book2: str = Query(...)):
    if neo4j_db.delete_similar_relationship(book1, book2):
        return {"message": "SIMILAR_TO relationship deleted successfully"}
    raise HTTPException(status_code=404, detail="Relationship not found")

# 📌 5️⃣ BELONGS_TO Relationship (Book → Genre)
@router.post("/books/genre/")
async def create_belongs_to(book_title: str = Query(...), genre_name: str = Query(...)):
    neo4j_db.create_belongs_to_relationship(book_title, genre_name)
    return {"message": f"Book '{book_title}' now belongs to genre '{genre_name}'"}

@router.get("/books/genre/related/")
async def get_related_books_by_genre(book_title: str = Query(...)):
    related_books = neo4j_db.get_related_books_by_genre(book_title)
    return {"book": book_title, "related_books": related_books}

@router.put("/books/genre/")
async def update_belongs_to(book_title: str = Query(...), old_genre: str = Query(...), new_genre: str = Query(...)):
    neo4j_db.update_belongs_to_relationship(book_title, old_genre, new_genre)
    return {"message": f"Updated genre of '{book_title}' from '{old_genre}' to '{new_genre}'"}

@router.delete("/books/genre/")
async def delete_belongs_to(book_title: str = Query(...), genre_name: str = Query(...)):
    neo4j_db.delete_belongs_to_relationship(book_title, genre_name)
    return {"message": f"Removed '{book_title}' from genre '{genre_name}'"}

# 📌 6️⃣ WRITTEN_BY Relationship (Book → Author)
@router.post("/books/author/")
async def create_written_by(book_title: str = Query(...), author_name: str = Query(...)):
    neo4j_db.create_written_by_relationship(book_title, author_name)
    return {"message": f"Book '{book_title}' is now written by '{author_name}'"}

@router.get("/books/same-author/")
async def get_books_by_author(book_title: str = Query(...)):
    books = neo4j_db.get_books_by_same_author(book_title)
    return {"book": book_title, "books_by_same_author": books}

@router.put("/books/author/")
async def update_written_by(book_title: str = Query(...), old_author: str = Query(...), new_author: str = Query(...)):
    neo4j_db.update_written_by_relationship(book_title, old_author, new_author)
    return {"message": f"Updated author of '{book_title}' from '{old_author}' to '{new_author}'"}

@router.delete("/books/author/")
async def delete_written_by(book_title: str = Query(...), author_name: str = Query(...)):
    neo4j_db.delete_written_by_relationship(book_title, author_name)
    return {"message": f"Removed author '{author_name}' from book '{book_title}'"}
