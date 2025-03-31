// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/home/:userId" element={<Home />} /> {/* ✅ Dynamiczny route */}
//             </Routes>
//         </Router>
//     );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook"; // lub poprawna ścieżka
import BookDetail from "./pages/BookDetail";
import BookList from "./pages/BookList";
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
        {/* <Route path="/books/:id" element={<BookDetail />} /> */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
