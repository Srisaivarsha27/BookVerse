from fastapi import FastAPI
from app.routes.neo4j_routes import router as neo4j_router
from app.routes.mongo_routes import router as mongo_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BookVerse API",
    description="API for managing books in the BookVerse application with XML support"
)

# Include the routers
app.include_router(neo4j_router)
app.include_router(mongo_router)

# Root endpoint to display a welcome message
@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to BookVerse API! 🚀 Use /docs for API documentation."}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],
)


