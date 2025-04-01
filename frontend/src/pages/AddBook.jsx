import React, { useEffect, useState } from "react";
import axios from "axios";

const AddBook = ({ onBookAdded, initialStatus }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState(initialStatus || "wishlist");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      status,
      category_id: categoryId,
    };

    if (status === "completed") {
      bookData.review = review;
      bookData.rating = rating;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/books/", bookData, {
        headers: { Authorization: `Token ${token}` },
      });

      // Reset form
      setTitle("");
      setAuthor("");
      setStatus(initialStatus || "wishlist");
      setReview("");
      setRating("");
      setCategoryId("");

      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("❌ Error adding book:", error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="block w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
        className="block w-full mb-2 p-2 border rounded"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      >
        <option value="">-- Choose a category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {status === "completed" && (
        <>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (1–5)"
            className="block w-full mb-2 p-2 border rounded"
          />

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Review (optional)"
            className="block w-full mb-2 p-2 border rounded"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add book
      </button>
    </form>
  );
};

export default AddBook;
