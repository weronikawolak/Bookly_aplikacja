import React, { useState } from "react";
import axios from "axios";

const RatingForm = ({ book, token, onUpdate }) => {
  const [rating, setRating] = useState(book.rating || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/books/${book.id}/`,
        { rating },
        { headers: { Authorization: `Token ${token}` } }
      );
      onUpdate(); 
    } catch (err) {
      console.error("Błąd zapisu oceny:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <label>
        Ocena (1-10):
        <input
          type="number"
          value={rating}
          min={1}
          max={10}
          onChange={(e) => setRating(e.target.value)}
          className="ml-2 p-1 border rounded w-16"
        />
      </label>
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Zapisz
      </button>
    </form>
  );
};

export default RatingForm;
