import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams(); // ID książki z URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBook(response.data);
      } catch (error) {
        console.error("Błąd pobierania książki:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Błąd pobierania recenzji:", error);
      }
    };

    fetchBook();
    fetchReviews();
  }, [id, token, navigate]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/reviews/",
        { ...newReview, book: id },
        { headers: { Authorization: `Token ${token}` } }
      );
      setNewReview({ rating: "", comment: "" });
      const refreshed = await axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setReviews(refreshed.data);
    } catch (error) {
      console.error("Błąd dodawania recenzji:", error);
    }
  };

  if (!book) return <p>Ładowanie danych książki...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p>Autor: {book.author}</p>
      <p>Status: {book.status}</p>
      <p>Kategoria: {book.category?.name || "Brak"}</p>

      <h3 className="text-xl mt-4">📝 Recenzje:</h3>
      {reviews.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {reviews.map((review) => (
            <li key={review.id} className="border p-2 rounded">
              <strong>{review.user}</strong> — Ocena: {review.rating}
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak recenzji.</p>
      )}

      <form onSubmit={handleAddReview} className="mt-6 space-y-2">
        <h4 className="text-lg font-semibold">Dodaj recenzję:</h4>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Ocena (1-5)"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          required
          className="border p-1 w-full"
        />
        <textarea
          placeholder="Komentarz"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="border p-1 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Dodaj recenzję
        </button>
      </form>
    </div>
  );
};

export default BookDetail;
