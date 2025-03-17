import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // ✅ Pobieramy ID użytkownika z URL
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/"); // Jeśli brak tokena, przekierowanie do logowania
            return;
        }

        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user-books/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBooks(response.data);
            } catch (error) {
                console.error("Błąd pobierania książek:", error);
            }
        };

        fetchBooks();
    }, [navigate, token]);

    if (!token) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, User {userId}!</h1>
            <h2>Your Books:</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title} by {book.author}</li>
                ))}
            </ul>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
            }}>
                Logout
            </button>
        </div>
    );
};

export default Home;
