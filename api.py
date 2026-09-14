from fastapi import FastAPI
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_connection():
    connection = sqlite3.connect("books.db")
    connection.row_factory = sqlite3.Row
    return connection


@app.get("/")
def home():
    return {
        "message": "Books API is running"
    }


@app.get("/books")
def get_books(
    search: str = "",
    category: str = "",
    rating: int = 0
):
    connection = get_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM books WHERE 1=1"
    parameters = []

    # Search by title
    if search:
        query += " AND title LIKE ?"
        parameters.append(f"%{search}%")

    # Filter by category
    if category:
        query += " AND category = ?"
        parameters.append(category)

    # Filter by rating
    if rating:
        query += " AND rating = ?"
        parameters.append(rating)

    cursor.execute(query, parameters)

    books = cursor.fetchall()

    connection.close()

    return [dict(book) for book in books]


@app.get("/books/{book_id}")
def get_book(book_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM books WHERE id = ?",
        (book_id,)
    )

    book = cursor.fetchone()

    connection.close()

    if book is None:
        return {
            "error": "Book not found"
        }

    return dict(book)

@app.get("/stats")
def get_stats():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM books")
    total_books = cursor.fetchone()[0]

    cursor.execute("SELECT AVG(price) FROM books")
    average_price = cursor.fetchone()[0]

    cursor.execute("SELECT MAX(price) FROM books")
    highest_price = cursor.fetchone()[0]

    cursor.execute("SELECT MIN(price) FROM books")
    lowest_price = cursor.fetchone()[0]

    cursor.execute("""
        SELECT category, COUNT(*) as count
        FROM books
        GROUP BY category
        ORDER BY count DESC
        LIMIT 10
    """)

    categories = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return {
        "total_books": total_books,
        "average_price": round(average_price, 2),
        "highest_price": highest_price,
        "lowest_price": lowest_price,
        "top_categories": categories
    }