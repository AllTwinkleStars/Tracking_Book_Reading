from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from model.book import BookRepository
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi_sqlalchemy import db
from pydantic import BaseModel
from typing import Optional, List

load_dotenv()
app = FastAPI()
app.add_middleware(DBSessionMiddleware, db_url="sqlite:///back.db")


class BookScheme(BaseModel):
    id: Optional[int]
    title: str
    shelves: int

    class Config:
        orm_mode = True


origins = [
    "http://localhost:3000",
    "localhost:3000"
    "http://127.0.0.1:3000"
    "127.0.0.1:3000"
    "http://localhost:8000"
    "localhost:8000"
    "http://127.0.0.1:8000"
    "127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api/getAllBooks", response_model=List[BookScheme])
async def getAllBooks():
    books = db.session.query(BookRepository).all()
    return books


@app.post("/api/addBook/", tags=["books"])
async def addBook(bookItem: BookScheme):
    book = BookRepository(title=bookItem.title, shelves=bookItem.shelves)
    db.session.add(book)
    db.session.commit()
    db.session.refresh(book)
    return book


@app.put("/api/updateBook/{id}", tags=["books"])
async def updateBook(id: int, bookItem: BookScheme):
    book = db.session.query(BookRepository).get(id)
    book.title = bookItem.title
    book.shelves = bookItem.shelves
    db.session.commit()
    db.session.refresh(book)
    return book


@app.delete("/api/removeBook/{id}", tags=["books"])
async def removeBook(id: int):
    book = db.session.query(BookRepository).get(id)
    db.session.delete(book)
    db.session.commit()
    return book
