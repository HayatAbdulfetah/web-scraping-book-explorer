# 📚 Web Scraping Book Explorer

A full-stack web scraping and book analytics application that collects book data from **Books to Scrape**, processes and analyzes the data with Python, stores it in SQLite, exposes it through a FastAPI REST API, and provides a React frontend for searching and exploring the books.

## 🚀 Features

### 🕷️ Web Scraping

- Scrapes all 1,000 books from Books to Scrape
- Automatically handles pagination
- Extracts:
  - Book title
  - Price
  - Availability
  - Rating
  - Category
  - Description
  - UPC
  - Book URL

- Uses `requests` and `BeautifulSoup`
- Uses a persistent HTTP session for efficient requests

### 📊 Data Analysis

- Total number of books
- Average book price
- Most expensive book
- Cheapest book
- Average price by rating
- Number of books by rating
- Books by category
- Top 10 most expensive books
- List of 5-star books

### 📈 Data Visualization

The project uses Matplotlib to visualize the scraped data:

- Number of books by rating
- Top 10 book categories
- Book price distribution

### 🗄️ Database

- SQLite database
- Stores all scraped books
- Each book has a unique ID
- Data can be queried using SQL

### 🔌 REST API

Built with FastAPI.

Available features:

- Get all books
- Search books by title
- Filter books by category
- Filter books by rating
- Get an individual book
- Get book statistics
- Interactive Swagger API documentation

### 💻 React Frontend

The frontend provides:

- Book catalog
- Search
- Rating filtering
- Category filtering
- Book details
- Price and rating information
- Availability information
- Overall book statistics
- Link to the original book page

---

## 🛠️ Technologies

### Data & Backend

- Python
- Requests
- BeautifulSoup4
- Pandas
- Matplotlib
- SQLite
- FastAPI
- Uvicorn

### Frontend

- React
- Vite
- JavaScript
- CSS

### Tools

- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
web-scraping-project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── ...
│
├── scraper.py
├── analyze.py
├── visualize.py
├── database.py
├── api.py
├── .gitignore
└── README.md
```

### File Responsibilities

| File           | Purpose                                   |
| -------------- | ----------------------------------------- |
| `scraper.py`   | Scrapes book data from the website        |
| `analyze.py`   | Performs data analysis using Pandas       |
| `visualize.py` | Creates charts using Matplotlib           |
| `database.py`  | Creates and populates the SQLite database |
| `api.py`       | Provides the FastAPI REST API             |
| `frontend/`    | React user interface                      |
| `books.csv`    | Generated scraped dataset                 |
| `books.db`     | Generated SQLite database                 |

> `books.csv` and `books.db` are generated files and are excluded from Git using `.gitignore`.

---

## 🔄 Project Architecture

```text
                 Books to Scrape
                        │
                        ▼
                Python Web Scraper
                        │
                        ▼
                    books.csv
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
       Pandas Analysis       Matplotlib
             │                Visualizations
             │
             ▼
        SQLite Database
             │
             ▼
         FastAPI API
             │
             ▼
       React Frontend
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
    Search Filters Details
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd web-scraping-project
```

## 2. Create a Python virtual environment

```bash
python -m venv venv
```

## 3. Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

## 4. Install Python dependencies

```bash
pip install requests beautifulsoup4 pandas matplotlib fastapi uvicorn
```

---

# 🕷️ Run the Web Scraper

Run:

```bash
python scraper.py
```

The scraper automatically:

1. Visits the website
2. Extracts books from each page
3. Follows the next-page link
4. Visits individual book pages
5. Extracts additional information
6. Continues until all pages are processed
7. Saves the data to `books.csv`

Expected result:

```text
Saved 1000 books to books.csv
```

---

# 📊 Analyze the Data

Run:

```bash
python analyze.py
```

The analysis provides information such as:

```text
Total books
Average price
Most expensive book
Cheapest book
Average price by rating
Books by rating
Books by category
Top 10 most expensive books
5-star books
```

---

# 📈 Create Visualizations

Run:

```bash
python visualize.py
```

This generates visualizations for:

- Book ratings
- Top book categories
- Price distribution

---

# 🗄️ Create the Database

Run:

```bash
python database.py
```

This reads `books.csv`, creates a SQLite database, and stores the books in a `books` table.

Expected result:

```text
Database created successfully!
Books stored: 1000
```

The generated database file is:

```text
books.db
```

---

# 🔌 Run the FastAPI Backend

Start the API:

```bash
uvicorn api:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

## API Documentation

FastAPI automatically provides interactive documentation at:

```text
http://127.0.0.1:8000/docs
```

---

# 🔗 API Endpoints

## Get all books

```http
GET /books
```

Example:

```text
http://127.0.0.1:8000/books
```

---

## Search books

```http
GET /books?search=Harry
```

Searches book titles.

---

## Filter by rating

```http
GET /books?rating=5
```

Returns books with a 5-star rating.

---

## Filter by category

```http
GET /books?category=Poetry
```

Returns books from the selected category.

---

## Combine filters

Filters can be combined:

```http
GET /books?category=Poetry&rating=5
```

or:

```http
GET /books?search=Love&rating=4
```

---

## Get a specific book

```http
GET /books/{book_id}
```

Example:

```text
http://127.0.0.1:8000/books/1
```

---

## Get statistics

```http
GET /stats
```

Returns:

- Total number of books
- Average price
- Highest price
- Lowest price
- Top categories

---

# 💻 Run the React Frontend

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Make sure the FastAPI backend is running at the same time.

---

# 🔍 Frontend Features

The React application allows users to:

### Search

Search books by title.

### Filter

Filter books by:

- Rating
- Category

### View Details

Open detailed information about an individual book:

- Title
- Price
- Rating
- Category
- Availability
- UPC
- Description
- Original book URL

### Statistics

View overall statistics including:

- Total books
- Average price
- Highest price
- Lowest price

---

# 🧪 Example Workflow

To run the complete project from scratch:

### Terminal 1

```bash
python scraper.py
```

### Terminal 1

```bash
python analyze.py
```

### Terminal 1

```bash
python visualize.py
```

### Terminal 1

```bash
python database.py
```

### Terminal 1

```bash
uvicorn api:app --reload
```

### Terminal 2

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔒 Git Ignore

The following files and folders are excluded from Git:

```gitignore
venv/
__pycache__/
*.pyc

books.csv
books.db

.env

frontend/node_modules/
frontend/dist/

.vscode/
```

Generated datasets and local dependencies should not be committed to the repository.

---

# 🎯 Learning Goals

This project was built to practice and demonstrate:

- Web scraping
- HTTP requests
- HTML parsing
- CSS selectors
- Pagination
- URL handling
- Data extraction
- Data cleaning
- CSV handling
- Pandas
- Data visualization
- SQL
- SQLite
- REST API development
- FastAPI
- CORS
- React
- API integration
- Search and filtering
- Full-stack application architecture
- Git and GitHub

---

# 🌟 What I Learned

Through this project, I learned how to build a complete data-driven application starting from raw website data.

The project demonstrates the complete flow:

```text
Scrape
   ↓
Clean
   ↓
Analyze
   ↓
Visualize
   ↓
Store
   ↓
Serve through API
   ↓
Display through React
```

---

# 👤 Author

**Hayat Abdulfetah**

Software Engineering Student
Ethiopia

GitHub:
https://github.com/HayatAbdulfetah

---

# 📌 Data Source

This project uses **Books to Scrape**, a website specifically designed for practicing web scraping.

Source:

https://books.toscrape.com/

This project is intended for educational and portfolio purposes.
