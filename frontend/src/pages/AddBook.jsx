// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

// const AddBook = () => {
//   const { userId } = useParams(); // ✅ hook w ciele funkcji

//   return (
//     <div>
//       <h1>Dodaj książkę (użytkownik ID: {userId})</h1>
//     </div>
//   );
// };

// export default AddBook;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AddBook = ({ onBookAdded }) => {
//     const [title, setTitle] = useState("");
//     const [author, setAuthor] = useState("");
//     const [status, setStatus] = useState("wishlist");
//     const [review, setReview] = useState("");
//     const [categoryId, setCategoryId] = useState("");
//     const [categories, setCategories] = useState([]);

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
//                     headers: { Authorization: `Token ${token}` }
//                 });
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("❌ Błąd pobierania kategorii:", error);
//             }
//         };

//         fetchCategories();
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://127.0.0.1:8000/api/books/", {
//                 title,
//                 author,
//                 status,
//                 review,
//                 category_id: categoryId
//             }, {
//                 headers: { Authorization: `Token ${token}` }
//             });

//             // Czyszczenie formularza
//             setTitle("");
//             setAuthor("");
//             setStatus("wishlist");
//             setReview("");
//             setCategoryId("");

//             if (onBookAdded) onBookAdded(); // odświeżenie listy książek
//         } catch (error) {
//             console.error("❌ Błąd dodawania książki:", error.response?.data || error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6">
//             <h3 className="text-xl font-semibold mb-2">➕ Dodaj książkę</h3>

//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Tytuł"
//                 required
//                 className="block w-full mb-2 p-2 border rounded"
//             />

//             <input
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Autor"
//                 required
//                 className="block w-full mb-2 p-2 border rounded"
//             />

//             <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="block w-full mb-2 p-2 border rounded"
//             >
//                 <option value="reading">Czytam</option>
//                 <option value="completed">Przeczytane</option>
//                 <option value="wishlist">Do przeczytania</option>
//             </select>

//             <select
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(e.target.value)}
//                 className="block w-full mb-2 p-2 border rounded"
//                 required
//             >
//                 <option value="">-- Wybierz kategorię --</option>
//                 {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>{cat.name}</option>
//                 ))}
//             </select>

//             <textarea
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 placeholder="Recenzja (opcjonalnie)"
//                 className="block w-full mb-2 p-2 border rounded"
//             />

//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                 Dodaj książkę
//             </button>
//         </form>
//     );
// };

// export default AddBook;

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
        console.error("❌ Błąd pobierania kategorii:", error);
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

      // Reset
      setTitle("");
      setAuthor("");
      setStatus(initialStatus || "wishlist");
      setReview("");
      setRating("");
      setCategoryId("");

      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("❌ Błąd dodawania książki:", error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">
      <h3 className="text-lg font-semibold mb-2">➕ Dodaj książkę</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł"
        required
        className="block w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
        required
        className="block w-full mb-2 p-2 border rounded"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      >
        <option value="">-- Wybierz kategorię --</option>
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
            placeholder="Ocena (1–5)"
            className="block w-full mb-2 p-2 border rounded"
          />

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Recenzja (opcjonalnie)"
            className="block w-full mb-2 p-2 border rounded"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Dodaj książkę
      </button>
    </form>
  );
};

export default AddBook;
