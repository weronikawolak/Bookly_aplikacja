import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/api/books/", {
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

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Twoje książki</h2>
            <button 
                onClick={fetchBooks} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition">
                🔄 Odśwież listę
            </button>

            {loading ? (
                <p>⏳ Ładowanie...</p>
            ) : books.length > 0 ? (
                <ul className="space-y-2">
                    {books.map((book) => (
                        <li key={book.id} className="p-3 border rounded shadow">
                            <strong>{book.title}</strong> – {book.author} ({book.status})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak książek.</p>
            )}
        </div>
    );
};

export default BookList;
