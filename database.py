import sqlite3

connection = sqlite3.connect("books.db")
connection.row_factory = sqlite3.Row

cursor = connection.cursor()

cursor.execute("SELECT * FROM books LIMIT 5")

books = cursor.fetchall()

for book in books:
    print(dict(book))

connection.close()