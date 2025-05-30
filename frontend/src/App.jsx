
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import BookList from "./pages/BookList";
import Statistics from "./pages/Statistics"; // <-- Ścieżka do pliku, dopasuj do siebie
import CurrentlyReading from "./pages/CurrentlyReading";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="*" element={<Login />} /> {/* Fallback */}
        <Route path="/add-book/:userId" element={<AddBook />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/statistics/:userId" element={<Statistics />} />
        <Route path="/currently-reading/:userId" element={<CurrentlyReading />} />

      </Routes>
    </Router>
  );
}

export default App;
