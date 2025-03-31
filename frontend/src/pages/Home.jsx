import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Pobieramy ID użytkownika z URL
    const [userData, setUserData] = useState(null);
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/"); // Jeśli brak tokena, przekierowanie do logowania
            return;
        }

        const fetchUserData = async () => {
            try {
                console.log("📡 Pobieranie danych użytkownika...");
                const response = await axios.get("http://127.0.0.1:8000/api/user/", {
                    headers: { Authorization: `Token ${token}` },
                });
                console.log("✅ Odpowiedź API (user):", response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("❌ Błąd pobierania danych użytkownika:", error.response ? error.response.data : error);
                navigate("/");
            }
        };

        const fetchBooks = async () => {
            try {
                console.log("📡 Pobieranie książek...");
                const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
                    headers: { Authorization: `Token ${token}` },
                });
                console.log("✅ Odpowiedź API (books):", response.data);
                setBooks(response.data);
            } catch (error) {
                console.error("❌ Błąd pobierania książek:", error.response ? error.response.data : error);
            }
        };

        fetchUserData();
        fetchBooks();
    }, [navigate, token]);

    if (!token) return <p>Ładowanie...</p>;

    return (
        <div>
            <h1>Witaj, {userData?.username}!</h1>
            <h2>Twoje książki:</h2>
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>{book.title} by {book.author}</li>
                    ))
                ) : (
                    <p>Brak książek w bibliotece.</p>
                )}
            </ul>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}>
                Wyloguj się
            </button>
        </div>
    );
};

export default Home;
