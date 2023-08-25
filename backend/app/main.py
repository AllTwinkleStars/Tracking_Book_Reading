from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from dotenv import load_dotenv
from dataclasses import dataclass
from pydantic import BaseModel
from typing import Optional, List, Sequence, Any
from app.model.bookModel import BookRepository

load_dotenv()
app = FastAPI()
app.add_middleware(DBSessionMiddleware, db_url="sqlite:///back.db")
repo = BookRepository("sqlite:///back.db")


class Book(BaseModel):
    id: Optional[int]
    title: str
    shelves: int

    class Config:
        orm_mode = True


origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://10.10.13.226:3000",
    "10.10.13.226:3000",
    "http://127.0.0.1:3000",
    "127.0.0.1:3000",
    "http://0.0.0.0:3000",
    "0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


def convert_to_json(rows: Sequence[tuple]) -> Sequence[dict]:
    result = []
    # replace with actual column names
    column_names = ['id', 'title', 'shelves']
    for row in rows:
        row_dict = dict(zip(column_names, row))
        result.append(row_dict)
    return result


@app.get("/api/getAllBooks", response_model=List[Book], status_code=status.HTTP_200_OK)
async def getAllBooks():
    sql = "SELECT * FROM books"
    result = repo.fetch_raw_sql(sql)
    books = convert_to_json(result)
    return books


@app.post("/api/addBook/", tags=["books"], status_code=status.HTTP_201_CREATED)
async def addBook(bookItem: Book):
    sql = "INSERT INTO books (title, shelves) VALUES (:title, :shelves)"
    params = {
        "title": bookItem.title,
        "shelves": str(bookItem.shelves),
    }
    book = repo.execute_raw_sql(sql, params)
    book = convert_to_json(repo.fetch_raw_sql(
        "select MAX(id), title, shelves from books"))
    return book[0]


@app.put("/api/updateBook/{id}", tags=["books"], status_code=status.HTTP_202_ACCEPTED)
async def updateBook(id: int, bookItem: Book):
    sql = "UPDATE books SET title = :title, shelves = :shelves WHERE id = :id"
    params = {
        "id": id,
        "title": bookItem.title,
        "shelves": bookItem.shelves,
    }
    repo.execute_raw_sql(sql, params)
    book = convert_to_json(repo.fetch_raw_sql(
        "select * from books where id = :id", {'id': id}))
    return book[0]


@app.delete("/api/removeBook/{id}", tags=["books"], status_code=status.HTTP_200_OK)
async def removeBook(id: int):
    sql = "DELETE FROM books WHERE id = :id"
    params = {"id": id}
    result = repo.execute_raw_sql(sql, params)
    return result
