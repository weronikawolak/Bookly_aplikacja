// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BookDetail = () => {
//   const { id } = useParams(); // ID książki z URL
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [book, setBook] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ rating: "", comment: "" });

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     const fetchBook = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setBook(response.data);
//       } catch (error) {
//         console.error("Błąd pobierania książki:", error);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Błąd pobierania recenzji:", error);
//       }
//     };

//     fetchBook();
//     fetchReviews();
//   }, [id, token, navigate]);

//   const handleAddReview = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/reviews/",
//         { ...newReview, book: id },
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       setNewReview({ rating: "", comment: "" });
//       const refreshed = await axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setReviews(refreshed.data);
//     } catch (error) {
//       console.error("Błąd dodawania recenzji:", error);
//     }
//   };

//   if (!book) return <p>Ładowanie danych książki...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
//       <p>Autor: {book.author}</p>
//       <p>Status: {book.status}</p>
//       <p>Kategoria: {book.category?.name || "Brak"}</p>

//       <h3 className="text-xl mt-4">📝 Recenzje:</h3>
//       {reviews.length > 0 ? (
//         <ul className="mt-2 space-y-2">
//           {reviews.map((review) => (
//             <li key={review.id} className="border p-2 rounded">
//               <strong>{review.user}</strong> — Ocena: {review.rating}
//               <p>{review.comment}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Brak recenzji.</p>
//       )}

//       <form onSubmit={handleAddReview} className="mt-6 space-y-2">
//         <h4 className="text-lg font-semibold">Dodaj recenzję:</h4>
//         <input
//           type="number"
//           min="1"
//           max="5"
//           placeholder="Ocena (1-5)"
//           value={newReview.rating}
//           onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//           required
//           className="border p-1 w-full"
//         />
//         <textarea
//           placeholder="Komentarz"
//           value={newReview.comment}
//           onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//           className="border p-1 w-full"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Dodaj recenzję
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BookDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [book, setBook] = useState(null);
//   const [status, setStatus] = useState("");
//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setBook(response.data);
//         setStatus(response.data.status);
//         setRating(response.data.rating || "");
//         setReview(response.data.review || "");
//       } catch (err) {
//         console.error("❌ Błąd ładowania książki:", err);
//         navigate("/");
//       }
//     };

//     fetchBook();
//   }, [id, navigate, token]);

//   const handleUpdate = async () => {
//     try {
//       const updatedData = { status };
//       if (status === "completed") {
//         updatedData.rating = rating;
//         updatedData.review = review;
//       }

//       await axios.put(`http://127.0.0.1:8000/api/books/${id}/`, updatedData, {
//         headers: { Authorization: `Token ${token}` },
//       });

//       alert("✅ Książka zaktualizowana!");
//       navigate("/home/" + book.user); // lub przekieruj do Home z userId
//     } catch (err) {
//       console.error("❌ Błąd aktualizacji:", err.response?.data || err);
//     }
//   };

//   if (!book) return <p>⏳ Ładowanie danych książki...</p>;

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
//       <p className="mb-2">Autor: {book.author}</p>

//       <div className="mb-4">
//         <label>Status: </label>
//         <select value={status} onChange={(e) => setStatus(e.target.value)} className="ml-2 border p-1">
//           <option value="wishlist">Do przeczytania</option>
//           <option value="reading">Czytam</option>
//           <option value="completed">Przeczytane</option>
//         </select>
//       </div>

//       {status === "completed" && (
//         <>
//           <div className="mb-2">
//             <label>Ocena (1-10): </label>
//             <input
//               type="number"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="border p-1 ml-2 w-16"
//               min="1"
//               max="10"
//             />
//           </div>
//           <div className="mb-4">
//             <label>Recenzja:</label>
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               className="block w-full border p-2 mt-1"
//               rows={4}
//             />
//           </div>
//         </>
//       )}

//       <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         💾 Zapisz zmiany
//       </button>
//     </div>
//   );
// };

// export default BookDetail;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Błąd przy pobieraniu książek:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Twoje książki</h2>
//       <button
//         onClick={fetchBooks}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
//       >
//         🔄 Odśwież listę
//       </button>

//       {loading ? (
//         <p>⏳ Ładowanie...</p>
//       ) : books.length > 0 ? (
//         <ul className="space-y-2">
//           {books.map((book) => (
//             <li
//               key={book.id}
//               onClick={() => navigate(`/book/${book.id}`)}
//               className="cursor-pointer p-3 border rounded shadow hover:bg-gray-100 transition"
//             >
//               <strong>{book.title}</strong> – {book.author} ({book.status})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Brak książek.</p>
//       )}
//     </div>
//   );
// };

// export default BookList;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BookDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [book, setBook] = useState(null);
//   const [status, setStatus] = useState("");
//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchBook = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setBook(response.data);
//         setStatus(response.data.status);
//         setRating(response.data.rating || "");
//         setReview(response.data.review || "");
//       } catch (err) {
//         console.error("❌ Błąd ładowania książki:", err);
//         navigate("/home");
//       }
//     };

//     fetchBook();
//   }, [id, token, navigate]);

//   const handleUpdate = async () => {
//     const updatedData = { status };
//     if (status === "completed") {
//       updatedData.rating = rating ? parseInt(rating) : null;
//       updatedData.review = review;
//     }
  
//     console.log("🔁 Wysyłam dane do API:", updatedData);
//     console.log("📦 Token:", token);
      
//     try {

//       await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, updatedData, {
//         headers: { Authorization: `Token ${token}` },
//       });
  
//       alert("✅ Książka zaktualizowana!");
//       window.location.href = "/home/${userData.id}";

//     } catch (err) {
//       console.error("❌ Błąd aktualizacji:", err.response?.data || err);
//     }
//   };
  
//   if (!book) return <p className="p-4">⏳ Ładowanie danych książki...</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
//       <p className="text-gray-600 mb-2">Autor: {book.author}</p>

//       <label className="block mb-2 font-medium">
//         Status:
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="block w-full border mt-1 p-2 rounded"
//         >
//           <option value="wishlist">Do przeczytania</option>
//           <option value="reading">Czytam</option>
//           <option value="completed">Przeczytane</option>
//         </select>
//       </label>

//       {status === "completed" && (
//         <>
//           <label className="block mb-2 font-medium">
//             Ocena (1-10):
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="block w-full border mt-1 p-2 rounded"
//             />
//           </label>

//           <label className="block mb-4 font-medium">
//             Recenzja:
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               rows="4"
//               className="block w-full border mt-1 p-2 rounded"
//             />
//           </label>
//         </>
//       )}

//       <div className="flex justify-between">
//         <button
//           onClick={handleUpdate}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           💾 Zapisz zmiany
//         </button>

//         <button
//           onClick={() => navigate("/home/${userData.id}")}
//           className="text-gray-600 underline"
//         >
//           ← Wróć do listy
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!token) return;
  
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBook(res.data);
        setStatus(res.data.status);
        setRating(res.data.rating || "");
        setReview(res.data.review || "");
      } catch (err) {
        console.error(" Błąd ładowania książki:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          //navigate("/books");
        }
      }
    };
  
    fetchBook();
  }, [id, token, navigate]);
  
  const handleUpdate = async () => {
    const updatedData = { status };
    if (status === "completed") {
      updatedData.rating = rating ? parseInt(rating) : null;
      updatedData.review = review;
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, updatedData, {
        headers: { Authorization: `Token ${token}` },
      });

      alert(" Książka zaktualizowana!");
      navigate("/books");
    } catch (err) {
      console.error(" Błąd aktualizacji:", err.response?.data || err);
    }
  };

  if (!book) return <p className="book-detail-loading"> Ładowanie danych książki...</p>;

  return (
    <div className="book-detail-container">
      <h1>{book.title}</h1>
      <p className="book-detail-author">Autor: {book.author}</p>

      <label>Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="wishlist">Do przeczytania</option>
          <option value="reading">Czytam</option>
          <option value="completed">Przeczytane</option>
        </select>
      </label>

      {status === "completed" && (
        <>
          <label>Ocena (1-10):
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <label>Recenzja:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
        </>
      )}

      <div className="book-detail-buttons">
        <button onClick={handleUpdate}>💾 Zapisz zmiany</button>
        <button onClick={() => navigate("/books")}>← Wróć</button>
      </div>
    </div>
  );
};

export default BookDetail;
