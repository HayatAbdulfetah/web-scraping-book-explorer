import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      setError("");

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

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(
        "Unable to load books. Make sure the FastAPI server is running.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchBookDetails(id) {
    try {
      setDetailsLoading(true);
      setError("");

      const response = await fetch(`http://127.0.0.1:8000/books/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }

      const data = await response.json();

      setSelectedBook(data);

      // Scroll to the details section after it appears
      setTimeout(() => {
        document.querySelector(".details")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Error fetching book details:", error);

      setError("Unable to load the book details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const response = await fetch("http://127.0.0.1:8000/stats");

      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    setSelectedBook(null);
    fetchBooks();
  }

  function handleClearFilters() {
    setSearch("");
    setRating("");
    setCategory("");
    setSelectedBook(null);

    // Fetch all books again
    setTimeout(() => {
      fetchBooks();
    }, 0);
  }

  return (
    <div className="container">
      {/* Header */}

      <h1>📚 Book Explorer</h1>

      {/* Error Message */}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
          }}
        >
          {error}
        </div>
      )}

      {/* Statistics */}

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

      {/* Search and Filters */}

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

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="History">History</option>
          <option value="Poetry">Poetry</option>
          <option value="Romance">Romance</option>
          <option value="Science">Science</option>
          <option value="Travel">Travel</option>
          <option value="Business">Business</option>
          <option value="Philosophy">Philosophy</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {/* Clear Filters */}

      {(search || rating || category) && (
        <button
          onClick={handleClearFilters}
          style={{
            marginBottom: "25px",
            padding: "10px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: "white",
            color: "#4b5563",
          }}
        >
          Clear Filters
        </button>
      )}

      {/* Loading */}

      {loading && <p>Loading books...</p>}

      {/* Books */}

      {!loading && (
        <div className="books">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <h2>{book.title}</h2>

              <p>💷 £{Number(book.price).toFixed(2)}</p>

              <p>⭐ {book.rating}/5</p>

              <p>📖 {book.category}</p>

              <p>{book.availability}</p>

              <button
                onClick={() => fetchBookDetails(book.id)}
                disabled={detailsLoading}
              >
                {detailsLoading ? "Loading..." : "View Details"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}

      {!loading && books.length === 0 && <p>No books found.</p>}

      {/* Book Details */}

      {selectedBook && (
        <div className="details">
          <button onClick={() => setSelectedBook(null)}>← Back to Books</button>

          <h2>{selectedBook.title}</h2>

          <p>
            <strong>Price:</strong> £{Number(selectedBook.price).toFixed(2)}
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

          <p>{selectedBook.description || "No description available."}</p>

          {selectedBook.url && (
            <a href={selectedBook.url} target="_blank" rel="noreferrer">
              View Original Book
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
