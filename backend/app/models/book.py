from pydantic import BaseModel
from typing import Optional, List

class Book(BaseModel):
    title: str
    author: str
    price: float
    rating: float
    image_url: str
    genre: List[str]
    fiction: bool
    pacing: str  # "Slow", "Medium", "Fast"
