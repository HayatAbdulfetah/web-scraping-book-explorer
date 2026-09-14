# 📚 Web Scraping Book Explorer

A full-stack web scraping and book analytics project built by scraping data from [Books to Scrape](https://books.toscrape.com/), storing it in SQLite, exposing it through a FastAPI REST API, and displaying it through a React frontend.

## 🚀 Features

- Scrapes 1,000 books from Books to Scrape
- Extracts:
  - Title
  - Price
  - Availability
  - Rating
  - Category
  - Description
  - UPC
  - Book URL

- Handles pagination automatically
- Saves scraped data to CSV
- Performs data analysis with Pandas
- Stores data in SQLite
- Provides a REST API with FastAPI
- Search books by title
- Filter books by category
- Filter books by rating
- View individual book details
- Display book statistics
- React frontend for interacting with the API

## 🛠️ Technologies

### Backend / Data

- Python
- Requests
- BeautifulSoup
- Pandas
- SQLite
- FastAPI
- Uvicorn

### Frontend

- React
- Vite
- JavaScript
- CSS

## 📁 Project Structure

```text
web-scraping-project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── scraper.py
├── analyze.py
├── database.py
├── api.py
├── .gitignore
└── README.md
```

## 🔄 Project Architecture

```text
Books to Scrape
       ↓
Python Web Scraper
       ↓
     CSV
       ↓
Pandas Analysis
       ↓
    SQLite
       ↓
   FastAPI
       ↓
 React Frontend
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd web-scraping-project
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

Windows:

```bash
venv\Scripts\activate
```

### 4. Install Python dependencies

```bash
pip install requests beautifulsoup4 pandas fastapi uvicorn
```

### 5. Run the scraper

```bash
python scraper.py
```

This creates:

```text
books.csv
```

### 6. Analyze the data

```bash
python analyze.py
```

### 7. Create the database

```bash
python database.py
```

This creates:

```text
books.db
```

### 8. Start the API

```bash
uvicorn api:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 9. Start the React frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

### Get all books

```http
GET /books
```

### Search books

```http
GET /books?search=Harry
```

### Filter by rating

```http
GET /books?rating=5
```

### Filter by category

```http
GET /books?category=Poetry
```

### Get a specific book

```http
GET /books/{book_id}
```

### Get statistics

```http
GET /stats
```

## 📊 Data Analysis

The project uses Pandas to analyze:

- Total number of books
- Average book price
- Most expensive book
- Cheapest book
- Average price by rating
- Number of books by rating
- Books by category
- Most expensive books

## 🎯 Learning Goals

This project was built to practice:

- Web scraping
- HTML parsing
- HTTP requests
- Pagination
- Data cleaning
- CSV handling
- Data analysis
- SQL databases
- REST API development
- React API integration
- Full-stack application development

## 👤 Author

**Hayat Abdulfetah**

Software Engineering Student
Ethiopia

GitHub: [HayatAbdulfetah](https://github.com/HayatAbdulfetah)
