import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({
    wishlist: false,
    reading: false,
    completed: false,
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const groupedBooks = {
    wishlist: books.filter((b) => b.status === "wishlist"),
    reading: books.filter((b) => b.status === "reading"),
    completed: books.filter((b) => b.status === "completed"),
  };

  const toggleForm = (status) => {
    setShowForm((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const renderList = (label, status, booksArray) => (
    <div className="custom-list" key={status}>
      <h3 className="custom-list-title">{label}</h3>
      <div className="custom-list-box">
        {booksArray.length > 0 ? (
          <ul className="custom-list-books">
            {booksArray.map((book) => (
              <li key={book.id} className="custom-list-book">
                <span
                  className="book-link"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  {book.title}
                </span>
                <button
                  className="delete-btn"
                  title="Delete book"
                  onClick={() => handleDelete(book.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="custom-empty">No books in this list.</p>
        )}
      </div>

      <button className="custom-add-btn" onClick={() => toggleForm(status)}>
        ➕ Add book
      </button>

      {showForm[status] && (
        <AddBook
          initialStatus={status}
          onBookAdded={() => {
            fetchBooks();
            toggleForm(status);
          }}
        />
      )}
    </div>
  );

  return (
    <div className="custom-page">
      <div className="custom-header-row">
        <h1 className="custom-page-title">My Book Lists</h1>
        <button className="custom-back-btn" onClick={() => navigate(`/home/${userId}`)}>
          ← Go Back
        </button>
      </div>

      {loading ? (
        <p className="custom-loading">⏳ Loading...</p>
      ) : (
        <div className="custom-list-container">
          {renderList("To Read", "wishlist", groupedBooks.wishlist)}
          {renderList("Reading", "reading", groupedBooks.reading)}
          {renderList("Read", "completed", groupedBooks.completed)}
        </div>
      )}
    </div>
  );
};

export default BookList;
