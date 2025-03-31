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


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddBook from "./AddBook";
import { Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null); // 🔁 Edytowana książka
    const [editData, setEditData] = useState({ title: "", author: "" }); // 📄 Dane do edycji
    const token = localStorage.getItem("token");

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
                headers: { Authorization: `Token ${token}` },
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Błąd pobierania książek:", error.response?.data || error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user/", {
                    headers: { Authorization: `Token ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                navigate("/");
            }
        };

        fetchUserData();
        fetchBooks();
    }, [navigate, token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę książkę?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            fetchBooks();
        } catch (error) {
            console.error("Błąd usuwania:", error.response?.data || error);
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book.id);
        setEditData({ title: book.title, author: book.author });
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(
                `http://127.0.0.1:8000/api/books/${editingBook}/`,
                editData,
                { headers: { Authorization: `Token ${token}` } }
            );
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error("Błąd aktualizacji:", error.response?.data || error);
        }
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    if (!token) return <p>Ładowanie...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Witaj, {userData?.username}!</h1>
            <h2 className="text-xl font-semibold mb-2">Twoje książki:</h2>

            <AddBook onBookAdded={fetchBooks} />

            <ul className="space-y-3 mt-6">
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`} className="text-blue-600 underline">
                            {book.title} by {book.author}
                            </Link>
                            {editingBook === book.id ? (
                                <>
                                    <input
                                        name="title"
                                        value={editData.title}
                                        onChange={handleChange}
                                        className="border p-1 mr-2"
                                    />
                                    <input
                                        name="author"
                                        value={editData.author}
                                        onChange={handleChange}
                                        className="border p-1 mr-2"
                                    />
                                    <button onClick={handleUpdate} className="text-green-600 mr-2">💾 Zapisz</button>
                                    <button onClick={() => setEditingBook(null)} className="text-gray-600">✖️ Anuluj</button>
                                </>
                            ) : (
                                <>
                                    <strong>{book.title}</strong> – {book.author}
                                    <div>
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="text-blue-600 mr-2 hover:underline"
                                        >
                                            ✏️ Edytuj
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            🗑️ Usuń
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Brak książek.</p>
                )}
            </ul>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}
                className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
                Wyloguj się
            </button>
        </div>
    );
};

export default Home;
