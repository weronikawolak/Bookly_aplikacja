// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BookList = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     const fetchBooks = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get("http://127.0.0.1:8000/api/books/", {
//                 headers: { Authorization: `Token ${token}` },
//             });
//             setBooks(response.data);
//         } catch (error) {
//             console.error("Błąd przy pobieraniu książek:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-bold mb-4">Twoje książki</h2>
//             <button 
//                 onClick={fetchBooks} 
//                 className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition">
//                 🔄 Odśwież listę
//             </button>

//             {loading ? (
//                 <p>⏳ Ładowanie...</p>
//             ) : books.length > 0 ? (
//                 <ul className="space-y-2">
//                     {books.map((book) => (
//                         <li
//                         key={book.id}
//                         onClick={() => navigate(`/book/${book.id}`)}
//                         className="cursor-pointer p-3 border rounded shadow hover:bg-gray-100"
//                       >
//                         <strong>{book.title}</strong> – {book.author} ({book.status})
//                       </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Brak książek.</p>
//             )}
//         </div>
//     );
// };

// export default BookList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./BookList.css"; // Dodaj osobny plik CSS jeśli nie używasz Tailwinda

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://127.0.0.1:8000/api/books/", {
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
//     <div className="book-list-container">
//       <h2 className="section-title">📚 Twoje książki</h2>
//       <button onClick={fetchBooks} className="refresh-btn">
//         🔄 Odśwież listę
//       </button>

//       {loading ? (
//         <p>⏳ Ładowanie...</p>
//       ) : books.length > 0 ? (
//         <div className="book-grid">
//           {books.map((book) => (
//             <div
//               key={book.id}
//               onClick={() => navigate(`/book/${book.id}`)}
//               className="book-card"
//             >
//               <h3 className="book-title">{book.title}</h3>
//               <p className="book-author">Autor: {book.author}</p>
//               <p className="book-status">Status: <strong>{book.status}</strong></p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Brak książek.</p>
//       )}
//     </div>
//   );
// };

// export default BookList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./BookList.css";

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

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const renderSection = (title, booksArray) => (
//     <div className="book-section">
//       <h3 className="section-title">{title}</h3>
//       {booksArray.length > 0 ? (
//         <div className="book-grid">
//           {booksArray.map((book) => (
//             <div
//               key={book.id}
//               onClick={() => navigate(`/book/${book.id}`)}
//               className="book-card"
//             >
//               <h4 className="book-title">{book.title}</h4>
//               <p className="book-author">Autor: {book.author}</p>
//               <p className="book-status">Status: {book.status}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="empty-msg">Brak książek.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="book-lists-wrapper">
//       <div className="header-row">
//         <h2 className="main-title">Twoje listy książek</h2>
//         <button onClick={fetchBooks} className="refresh-btn">
//           🔄 Odśwież
//         </button>
//       </div>

//       {loading ? (
//         <p>⏳ Ładowanie...</p>
//       ) : (
//         <>
//           {renderSection(" To read", groupedBooks.wishlist)}
//           {renderSection(" Reading", groupedBooks.reading)}
//           {renderSection(" Read", groupedBooks.completed)}
//         </>
//       )}

//       <div className="add-list-box">
//         <button className="add-list-btn" onClick={() => alert("Dodawanie własnych list wkrótce!")}>
//           ➕ Dodaj nową listę
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookList;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";
// import "./BookList.css";

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

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const renderList = (title, booksArray) => (
//     <div className="custom-list">
//       <h3 className="custom-list-title">{title}</h3>
//       <div className="custom-list-box">
//         {booksArray.length > 0 ? (
//           <ul className="custom-list-books">
//             {booksArray.map((book) => (
//               <li
//                 key={book.id}
//                 onClick={() => navigate(`/books/${book.id}`)}
//                 className="custom-list-book"
//               >
//                 {book.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="custom-empty">Brak książek.</p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="custom-page">
//       <h1 className="custom-page-title">My lists</h1>

//       {loading ? (
//         <p className="custom-loading">⏳ Ładowanie...</p>
//       ) : (
//         <div className="custom-list-container">
//           {renderList("To read", groupedBooks.wishlist)}
//           {renderList("Reading", groupedBooks.reading)}
//           {renderList("Read", groupedBooks.completed)}
//         </div>
//       )}

//       <div className="custom-add-container">
//         <button className="custom-add-btn" onClick={() => alert("Dodawanie list już wkrótce!")}>
//           ➕ Add new
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";
// import "./BookList.css";

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

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const renderList = (title, booksArray, status) => (
//     <div className="custom-list">
//       <h3 className="custom-list-title">{title}</h3>
//       <div className="custom-list-box">
//         {booksArray.length > 0 ? (
//           <ul className="custom-list-books">
//             {booksArray.map((book) => (
//               <li
//                 key={book.id}
//                 onClick={() => navigate(`/books/${book.id}`)}
//                 className="custom-list-book"
//               >
//                 {book.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="custom-empty">Brak książek.</p>
//         )}
//       </div>

//       {/* Formularz dodawania nowej książki do konkretnej listy */}
//       <AddBook
//         defaultStatus={status}
//         onBookAdded={fetchBooks}
//         compact
//       />
//     </div>
//   );

//   return (
//     <div className="custom-page">
//       <h1 className="custom-page-title">My lists</h1>

//       {loading ? (
//         <p className="custom-loading">⏳ Ładowanie...</p>
//       ) : (
//         <div className="custom-list-container">
//           {renderList("To read", groupedBooks.wishlist, "wishlist")}
//           {renderList("Reading", groupedBooks.reading, "reading")}
//           {renderList("Read", groupedBooks.completed, "completed")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";
// import "./BookList.css";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState({
//     wishlist: false,
//     reading: false,
//     completed: false,
//   });

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

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const toggleForm = (status) => {
//     setShowForm((prev) => ({
//       ...prev,
//       [status]: !prev[status],
//     }));
//   };

//   const renderList = (label, status, booksArray) => (
//     <div className="custom-list">
//       <h3 className="custom-list-title">{label}</h3>
//       <div className="custom-list-box">
//         {booksArray.length > 0 ? (
//           <ul className="custom-list-books">
//             {booksArray.map((book) => (
//               <li
//                 key={book.id}
//                 onClick={() => navigate(`/books/${book.id}`)}
//                 className="custom-list-book"
//               >
//                 {book.title}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="custom-empty">Brak książek.</p>
//         )}
//       </div>

//       <button className="custom-add-btn" onClick={() => toggleForm(status)}>
//         ➕ Add book
//       </button>

//       {showForm[status] && (
//         <AddBook
//           initialStatus={status}
//           onBookAdded={() => {
//             fetchBooks();
//             toggleForm(status); // zamyka formularz po dodaniu
//           }}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div className="custom-page">
//       <h1 className="custom-page-title">My lists</h1>

//       {loading ? (
//         <p className="custom-loading">⏳ Ładowanie...</p>
//       ) : (
//         <div className="custom-list-container">
//           {renderList("To read", "wishlist", groupedBooks.wishlist)}
//           {renderList("Reading", "reading", groupedBooks.reading)}
//           {renderList("Read", "completed", groupedBooks.completed)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookList;

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
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Błąd przy pobieraniu książek:", error);
    } finally {
      setLoading(false);
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
    <div className="custom-list">
      <h3 className="custom-list-title">{label}</h3>
      <div className="custom-list-box">
        {booksArray.length > 0 ? (
          <ul className="custom-list-books">
            {booksArray.map((book) => (
              <li
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="custom-list-book"
              >
                {book.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="custom-empty">Brak książek.</p>
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
            toggleForm(status); // zamyka formularz po dodaniu
          }}
        />
      )}
    </div>
  );

  return (
    <div className="custom-page">
      <div className="custom-header-row">
        <h1 className="custom-page-title">My lists</h1>
        <button className="custom-back-btn" onClick={() => navigate(-1)}>
          ← Wróć
        </button>
      </div>

      {loading ? (
        <p className="custom-loading">⏳ Ładowanie...</p>
      ) : (
        <div className="custom-list-container">
          {renderList("To read", "wishlist", groupedBooks.wishlist)}
          {renderList("Reading", "reading", groupedBooks.reading)}
          {renderList("Read", "completed", groupedBooks.completed)}
        </div>
      )}
    </div>
  );
};

export default BookList;
