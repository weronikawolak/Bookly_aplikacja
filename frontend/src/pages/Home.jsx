// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";
// // import AddBook from "./AddBook";

// // const Home = () => {
// //     const navigate = useNavigate();
// //     const { userId } = useParams(); 
// //     const [userData, setUserData] = useState(null);
// //     const [books, setBooks] = useState([]);
// //     const token = localStorage.getItem("token");

// //     const fetchBooks = async () => {
// //         try {
// //             console.log("📡 Pobieranie książek...");
// //             const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
// //                 headers: { Authorization: `Token ${token}` },
// //             });
// //             console.log("✅ Odpowiedź API (books):", response.data);
// //             setBooks(response.data);
// //         } catch (error) {
// //             console.error("Błąd pobierania książek:", error.response ? error.response.data : error);
// //         }
// //     };
    


// //     useEffect(() => {
// //         if (!token) {
// //             navigate("/"); 
// //             return;
// //         }

// //         const fetchUserData = async () => {
// //             try {
// //                 console.log("📡 Pobieranie danych użytkownika...");
// //                 const response = await axios.get("http://127.0.0.1:8000/api/user/", {
// //                     headers: { Authorization: `Token ${token}` },
// //                 });
// //                 console.log("✅ Odpowiedź API (user):", response.data);
// //                 setUserData(response.data);
// //             } catch (error) {
// //                 console.error("❌ Błąd pobierania danych użytkownika:", error.response ? error.response.data : error);
// //                 navigate("/");
// //             }
// //         };

// //         // const fetchBooks = async () => {
// //         //     try {
// //         //         console.log("📡 Pobieranie książek...");
// //         //         const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
// //         //             headers: { Authorization: `Token ${token}` },
// //         //         });
// //         //         console.log("✅ Odpowiedź API (books):", response.data);
// //         //         setBooks(response.data);
// //         //     } catch (error) {
// //         //         console.error("Błąd pobierania książek:", error.response ? error.response.data : error);
// //         //     }
// //         // };

// //         fetchUserData();
// //         fetchBooks();
// //     }, [navigate, token]);

// //     if (!token) return <p>Ładowanie...</p>;

// //     return (
// //         <div>
// //             <h1>Witaj, {userData?.username}!</h1>
// //             <h2>Twoje książki:</h2>

// //             <AddBook onBookAdded={fetchBooks} /> {/* ✅ Dodany formularz */}

// //             <ul>
// //                 {books.length > 0 ? (
// //                     books.map((book) => (
// //                         <li key={book.id}>{book.title} by {book.author}</li>
// //                     ))
// //                 ) : (
// //                     <p>Brak książek w bibliotece.</p>
// //                 )}
// //             </ul>
// //             <button onClick={() => {
// //                 localStorage.removeItem("token");
// //                 navigate("/");
// //             }}>
// //                 Wyloguj się
// //             </button>
// //         </div>
// //     );
// // };

// // export default Home;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import AddBook from "./AddBook";
// import { Link } from "react-router-dom";
// import RatingForm from "./RatingForm";
// const Home = () => {
//     const navigate = useNavigate();
//     const { userId } = useParams();
//     const [userData, setUserData] = useState(null);
//     const [books, setBooks] = useState([]);
//     const [editingBook, setEditingBook] = useState(null); // 🔁 Edytowana książka
//     const [editData, setEditData] = useState({ title: "", author: "" }); // 📄 Dane do edycji
//     const token = localStorage.getItem("token");

//     const fetchBooks = async () => {
//         try {
//             const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//                 headers: { Authorization: `Token ${token}` },
//             });
//             setBooks(response.data);
//         } catch (error) {
//             console.error("Błąd pobierania książek:", error.response?.data || error);
//         }
//     };

//     useEffect(() => {
//         if (!token) {
//             navigate("/");
//             return;
//         }

//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/user/", {
//                     headers: { Authorization: `Token ${token}` },
//                 });
//                 setUserData(response.data);
//             } catch (error) {
//                 navigate("/");
//             }
//         };

//         fetchUserData();
//         fetchBooks();
//     }, [navigate, token]);

//     const handleDelete = async (id) => {
//         if (!window.confirm("Czy na pewno chcesz usunąć tę książkę?")) return;

//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`, {
//                 headers: { Authorization: `Token ${token}` },
//             });
//             fetchBooks();
//         } catch (error) {
//             console.error("Błąd usuwania:", error.response?.data || error);
//         }
//     };

//     const handleEdit = (book) => {
//         setEditingBook(book.id);
//         setEditData({ title: book.title, author: book.author });
//     };

//     const handleUpdate = async () => {
//         try {
//             await axios.patch(
//                 `http://127.0.0.1:8000/api/books/${editingBook}/`,
//                 editData,
//                 { headers: { Authorization: `Token ${token}` } }
//             );
//             setEditingBook(null);
//             fetchBooks();
//         } catch (error) {
//             console.error("Błąd aktualizacji:", error.response?.data || error);
//         }
//     };

//     const handleChange = (e) => {
//         setEditData({ ...editData, [e.target.name]: e.target.value });
//     };

//     if (!token) return <p>Ładowanie...</p>;

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Witaj, {userData?.username}!</h1>
//             <h2 className="text-xl font-semibold mb-2">Twoje książki:</h2>

//             <AddBook onBookAdded={fetchBooks} />

//             <ul className="space-y-3 mt-6">
//             {books.length > 0 ? (
//                 books.map((book) => (
//                     <li key={book.id}  className="mb-4 border p-3 rounded shadow">
//                     <strong>{book.title}</strong> by {book.author} <br />
//                     <span>Status: {book.status}</span>
//                     <br />
//                     <span>Ocena: {book.rating || "brak"}</span>

//                     {book.status !== "completed" ? (
//                         <button
//                         className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
//                         onClick={async () => {
//                             try {
//                             await axios.patch(
//                                 `http://127.0.0.1:8000/api/books/${book.id}/`,
//                                 { status: "completed" },
//                                 { headers: { Authorization: `Token ${token}` } }
//                             );
//                             fetchBooks();
//                             } catch (err) {
//                             console.error("❌ Błąd zmiany statusu:", err);
//                             }
//                         }}
//                         >
//                         Oznacz jako przeczytane
//                         </button>
//                     ) : (
//                         <RatingForm book={book} token={token} onUpdate={fetchBooks} />
//                     )}
//                     </li>
//                 ))
//                 ) : (
//                 <p>Brak książek w bibliotece.</p>
//                 )}

//             </ul>

//             <button
//                 onClick={() => {
//                     localStorage.removeItem("token");
//                     navigate("/");
//                 }}
//                 className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//             >
//                 Wyloguj się
//             </button>
//         </div>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [books, setBooks] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Błąd pobierania książek:", error);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/user/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setUserData(response.data);
//     } catch (error) {
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     if (!token) navigate("/");
//     else {
//       fetchUserData();
//       fetchBooks();
//     }
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">
//         Witaj, {userData?.username}!
//       </h1>
//       <h2 className="text-xl font-semibold text-center mb-6">Twoje książki</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div
//               key={book.id}
//               onClick={() => navigate(`/book/${book.id}`)}
//               className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
//             >
//               <h3 className="text-lg font-bold mb-1">{book.title}</h3>
//               <p className="text-sm text-gray-600 mb-1">Autor: {book.author}</p>
//               <p className="text-sm text-gray-500">Status: {book.status}</p>
//               {book.rating && (
//                 <p className="text-sm text-gray-700 mt-1">Ocena: {book.rating}/10</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-600">Brak książek w bibliotece.</p>
//         )}
//       </div>

//       <div className="text-center">
//         <button
//           onClick={handleLogout}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Wyloguj się
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import AddBook from "./AddBook";

// const Home = () => {
//     const navigate = useNavigate();
//     const { userId } = useParams(); 
//     const [userData, setUserData] = useState(null);
//     const [books, setBooks] = useState([]);
//     const token = localStorage.getItem("token");

//     const fetchBooks = async () => {
//         try {
//             console.log("📡 Pobieranie książek...");
//             const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//                 headers: { Authorization: `Token ${token}` },
//             });
//             console.log("✅ Odpowiedź API (books):", response.data);
//             setBooks(response.data);
//         } catch (error) {
//             console.error("Błąd pobierania książek:", error.response ? error.response.data : error);
//         }
//     };
    


//     useEffect(() => {
//         if (!token) {
//             navigate("/"); 
//             return;
//         }

//         const fetchUserData = async () => {
//             try {
//                 console.log("📡 Pobieranie danych użytkownika...");
//                 const response = await axios.get("http://127.0.0.1:8000/api/user/", {
//                     headers: { Authorization: `Token ${token}` },
//                 });
//                 console.log("✅ Odpowiedź API (user):", response.data);
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error("❌ Błąd pobierania danych użytkownika:", error.response ? error.response.data : error);
//                 navigate("/");
//             }
//         };

//         // const fetchBooks = async () => {
//         //     try {
//         //         console.log("📡 Pobieranie książek...");
//         //         const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         //             headers: { Authorization: `Token ${token}` },
//         //         });
//         //         console.log("✅ Odpowiedź API (books):", response.data);
//         //         setBooks(response.data);
//         //     } catch (error) {
//         //         console.error("Błąd pobierania książek:", error.response ? error.response.data : error);
//         //     }
//         // };

//         fetchUserData();
//         fetchBooks();
//     }, [navigate, token]);

//     if (!token) return <p>Ładowanie...</p>;

//     return (
//         <div>
//             <h1>Witaj, {userData?.username}!</h1>
//             <h2>Twoje książki:</h2>

//             <AddBook onBookAdded={fetchBooks} /> {/* ✅ Dodany formularz */}

//             <ul>
//                 {books.length > 0 ? (
//                     books.map((book) => (
//                         <li key={book.id}>{book.title} by {book.author}</li>
//                     ))
//                 ) : (
//                     <p>Brak książek w bibliotece.</p>
//                 )}
//             </ul>
//             <button onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/");
//             }}>
//                 Wyloguj się
//             </button>
//         </div>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import AddBook from "./AddBook";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [books, setBooks] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(res.data);
//     } catch (error) {
//       console.error("Błąd pobierania książek:", error);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/user/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setUserData(res.data);
//       } catch (error) {
//         console.error("Błąd pobierania użytkownika:", error);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//     fetchBooks();
//   }, [navigate, token]);

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const Section = ({ title, books }) => (
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold mb-3">{title}</h3>
//       {books.length > 0 ? (
//         <ul className="space-y-2">
//           {books.map((book) => (
//             <li key={book.id}>
//               <Link
//                 to={`/books/${book.id}`}
//                 className="text-blue-600 hover:underline font-medium"
//               >
//                 {book.title}
//               </Link>{" "}
//               – {book.author}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">Brak książek.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">
//         Witaj, {userData?.username || "użytkowniku"}!
//       </h1>

//       <AddBook onBookAdded={fetchBooks} />

//       <div className="mt-6">
//         <Section title="📚 Do przeczytania" books={groupedBooks.wishlist} />
//         <Section title="📖 Czytam" books={groupedBooks.reading} />
//         <Section title="✅ Przeczytane" books={groupedBooks.completed} />
//       </div>

//       <button
//         onClick={handleLogout}
//         className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//       >
//         Wyloguj się
//       </button>
//     </div>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import AddBook from "./AddBook";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [books, setBooks] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(res.data);
//     } catch (error) {
//       console.error("Błąd pobierania książek:", error);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/user/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setUserData(res.data);
//       } catch (error) {
//         console.error("Błąd pobierania użytkownika:", error);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//     fetchBooks();
//   }, [navigate, token]);

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const Section = ({ title, icon, books }) => (
//     <div>
//       <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//         <span>{icon}</span> {title}
//       </h3>
//       <div className="grid gap-4">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div
//               key={book.id}
//               className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border"
//             >
//               <h4 className="text-lg font-bold text-blue-600 hover:underline">
//                 <Link to={`/books/${book.id}`}>{book.title}</Link>
//               </h4>
//               <p className="text-gray-600">{book.author}</p>
//               {book.rating && (
//                 <p className="text-sm text-gray-500 mt-1">Ocena: {book.rating}/10</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">Brak książek.</p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-blue-600">Witaj, {userData?.username}!</h1>
//           <p className="text-gray-600 mt-2">Zarządzaj swoją biblioteką</p>
//         </div>

//         <AddBook onBookAdded={fetchBooks} />

//         <div className="mt-10 space-y-10">
//           <Section title="Do przeczytania" icon="📚" books={groupedBooks.wishlist} />
//           <Section title="Czytam" icon="📖" books={groupedBooks.reading} />
//           <Section title="Przeczytane" icon="✅" books={groupedBooks.completed} />
//         </div>

//         <div className="text-center mt-10">
//           <button
//             onClick={handleLogout}
//             className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
//           >
//             Wyloguj się
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import openBook from "../assets/reading.png";
// import statsIcon from "../assets/statictics.png";
// import listIcon from "../assets/lists.png";
// import "./Home.css"; // 
// import BookList from "./BookList";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/user/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setUserData(res.data);
//       } catch (error) {
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [navigate, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-pink-50 p-6">
//       <h1 className="text-5xl font-bold text-center mb-10">My library</h1>

//       <div className="card-grid">
//         {/* Kafelki */}
//         <div className="card">
//           <img src={openBook} alt="Currently reading" className="card-icon" />
//           <h2 className="card-title">Currently reading</h2>
//           <p className="card-desc">
//             Keep track of the books you're currently reading and monitor your progress.
//           </p>
//         </div>

//         <div className="card">
//           <img src={statsIcon} alt="Statistics" className="card-icon" />
//           <h2 className="card-title">Statistics</h2>
//           <p className="card-desc">
//             View your reading statistics, favorite genres, and the number of books you've completed.
//           </p>
//         </div>

//         <div className="card">
//           <img src={listIcon} alt="Book lists" className="card-icon" />
//           <h2 className="card-title">Book lists</h2>
//           <p className="card-desc">
//             Browse and manage your book lists, including those you want to read or have already finished.
//           </p>
//         </div>
//       </div>

//       {/* 🔽 Tutaj BookList */}
//       <div className="booklist-section">
//         <BookList />
//       </div>

//       <div className="text-center mt-10">
//         <button
//           onClick={handleLogout}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Wyloguj się
//         </button>
//       </div>
//     </div>
//   );
// }
// export default Home;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import openBook from "../assets/reading.png";
import statsIcon from "../assets/statictics.png";
import listIcon from "../assets/lists.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">My library</h1>

      <div className="card-grid">
        <div className="card" onClick={() => navigate("/reading")}>
          <img src={openBook} alt="Currently reading" className="card-icon" />
          <h2 className="card-title">Currently reading</h2>
          <p className="card-desc">
            Keep track of the books you're currently reading and monitor your progress.
          </p>
        </div>

        <div className="card" onClick={() => navigate("/statistics")}>
          <img src={statsIcon} alt="Statistics" className="card-icon" />
          <h2 className="card-title">Statistics</h2>
          <p className="card-desc">
            View your reading statistics, favorite genres, and the number of books you've completed.
          </p>
        </div>

        {/* Box 3 - Book lists */}
        <div className="card" onClick={() => navigate("/books")}>
            <img src={listIcon} alt="Book lists" className="card-icon" />
            <h2 className="card-title">Book lists</h2>
            <p className="card-desc">
                Browse and manage your book lists, including those you want to read or have already finished.
            </p>
            </div>


      </div>

      <div className="logout">
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default Home;
