import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api/api";
import "../styles/books.css";
import defaultCover from "../assets/book-cover.png"; // Ensure correct path

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      console.log("Fetched Books:", data); // Debugging API response
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="books-container">
      <h1 className="heading">📚 Explore Books</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Book Grid */}
      <div className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link key={book.title} to={`/books/${encodeURIComponent(book.title)}`} className="book-link">
              <div className="book-card">
                <BookImage imageUrl={book.image} />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">
                  {book.author.length > 20 ? <span data-long="true">{book.author}</span> : <span>{book.author}</span>}
                </p>
                <p className="book-rating">⭐ {book.rating}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-results">No books found.</p>
        )}
      </div>
    </div>
  );
};

// 📖 Book Cover Component (Handles Broken Images)
const BookImage = ({ imageUrl }) => {
  const [src, setSrc] = useState(imageUrl ? encodeURI(imageUrl) : defaultCover);

  return (
    <img
      src={src}
      alt="Book Cover"
      className="book-image"
      onError={() => setSrc(defaultCover)}
    />
  );
};

export default Books;
