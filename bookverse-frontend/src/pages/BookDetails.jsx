import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookByTitle, getBooksBySameAuthor, getRelatedBooksByGenre, getSimilarBooks } from "../api/api";
import "../styles/bookdetails.css";

const BookDetails = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState({
    sameAuthorBooks: [],
    sameGenre: [],
    similarBooks: [],
  });

  useEffect(() => {
    if (title) {
      fetchBookDetails();
      fetchRelatedBooks();
    }
  }, [title]);

  const fetchBookDetails = async () => {
    try {
      const bookData = await getBookByTitle(title);
      if (!bookData) return;
      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const fetchRelatedBooks = async () => {
    try {
      const [sameAuthorBooks, sameGenre, similarBooks] = await Promise.all([
        getBooksBySameAuthor(title),
        getRelatedBooksByGenre(title),
        getSimilarBooks(title),
      ]);
      setRelatedBooks({
        sameAuthorBooks: sameAuthorBooks.length ? sameAuthorBooks : ["No books found"],
        sameGenre: sameGenre.length ? sameGenre : ["No related genres"],
        similarBooks: similarBooks.length ? similarBooks : ["No similar books found"],
      });
    } catch (error) {
      console.error("Error fetching related books:", error);
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details">
      {/* Book Info Section */}
      <div className="book-info">
        <img src={book.image} alt={book.title} className="book-cover" />
        <div className="book-details-text">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Rating:</strong> {book.rating}/5</p>
          <p><strong>Genres:</strong> {book.genres?.join(", ")}</p>
          <p><strong>Fiction:</strong> {book.fiction ? "Yes" : "No"}</p>

          {/* Summary (Blurb) */}
          <div className="summary-review">
            <h3>Blurb</h3>
            <p className="blurb">  
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula sapien quis dolor dignissim, nec pretium neque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula sapien quis dolor dignissim, nec pretium neque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula sapien quis dolor dignissim, nec pretium neque tincidunt.
            </p>

            {/* Overall Review */}
            <h3>Overall Review</h3>
            <p className="overall-review">
              "A fantastic book that keeps you hooked from the start!"
            </p>

            {/* User Reviews */}
            <div className="reviews">
              <h4>User Reviews</h4>
              <div className="review"><p><strong>John Doe:</strong> "A masterpiece! Couldn't put it down."</p></div>
              <div className="review"><p><strong>Jane Smith:</strong> "Engaging and thought-provoking."</p></div>
              <div className="review"><p><strong>Emily Brown:</strong> "A great read! Highly recommend it."</p></div>
              <div className="review"><p><strong>Michael Johnson:</strong> "Interesting plot, but the ending could be better."</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      <div className="related-books">
        <h3>Related Books</h3>
        <div className="related-books-sections">
          <div className="related-books-box"><h4>Same Author</h4><ul>{relatedBooks.sameAuthorBooks.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
          <div className="related-books-box"><h4>Same Genre</h4><ul>{relatedBooks.sameGenre.map((g, i) => <li key={i}>{g}</li>)}</ul></div>
          <div className="related-books-box"><h4>Similar Books</h4><ul>{relatedBooks.similarBooks.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
