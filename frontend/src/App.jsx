import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  async function fetchBooks() {
    setLoading(true);

    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (rating) {
      params.append("rating", rating);
    }

    if (category) {
      params.append("category", category);
    }

    const response = await fetch(
      `http://127.0.0.1:8000/books?${params.toString()}`,
    );

    const data = await response.json();

    setBooks(data);
    setLoading(false);
  }

  async function fetchStats() {
    const response = await fetch("http://127.0.0.1:8000/stats");

    const data = await response.json();

    setStats(data);
  }

  async function fetchBookDetails(id) {
    const response = await fetch(`http://127.0.0.1:8000/books/${id}`);

    const data = await response.json();

    setSelectedBook(data);
  }

  function handleSearch(event) {
    event.preventDefault();
    fetchBooks();
  }

  return (
    <div className="container">
      <h1>📚 Book Explorer</h1>

      {stats && (
        <div className="stats">
          <div>
            <strong>{stats.total_books}</strong>
            <span>Total Books</span>
          </div>

          <div>
            <strong>£{stats.average_price}</strong>
            <span>Average Price</span>
          </div>

          <div>
            <strong>£{stats.highest_price}</strong>
            <span>Highest Price</span>
          </div>

          <div>
            <strong>£{stats.lowest_price}</strong>
            <span>Lowest Price</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="">All ratings</option>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading books...</p>}

      <div className="books">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.title}</h2>

            <p>💷 £{book.price}</p>

            <p>⭐ {book.rating}/5</p>

            <p>📖 {book.category}</p>

            <p>{book.availability}</p>

            <button onClick={() => fetchBookDetails(book.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {!loading && books.length === 0 && <p>No books found.</p>}

      {selectedBook && (
        <div className="details">
          <button onClick={() => setSelectedBook(null)}>← Back</button>

          <h2>{selectedBook.title}</h2>

          <p>
            <strong>Price:</strong> £{selectedBook.price}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {selectedBook.rating}/5
          </p>

          <p>
            <strong>Category:</strong> {selectedBook.category}
          </p>

          <p>
            <strong>Availability:</strong> {selectedBook.availability}
          </p>

          <p>
            <strong>UPC:</strong> {selectedBook.upc || "N/A"}
          </p>

          <h3>Description</h3>

          <p>{selectedBook.description}</p>

          <a href={selectedBook.url} target="_blank" rel="noreferrer">
            View original book
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
