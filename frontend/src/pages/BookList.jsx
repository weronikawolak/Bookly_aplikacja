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
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (bookId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this book?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       fetchBooks(); // Refresh list
//     } catch (err) {
//       console.error("Error deleting book:", err);
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
//     <div className="custom-list" key={status}>
//       <h3 className="custom-list-title">{label}</h3>
//       <div className="custom-list-box">
//         {booksArray.length > 0 ? (
//           <ul className="custom-list-books">
//             {booksArray.map((book) => (
//               <li key={book.id} className="custom-list-book">
//                 <span
//                   className="book-link"
//                   onClick={() => navigate(`/books/${book.id}`)}
//                 >
//                   {book.title}
//                 </span>
//                 <button
//                   className="delete-btn"
//                   title="Delete book"
//                   onClick={() => handleDelete(book.id)}
//                 >
//                   🗑️
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="custom-empty">No books in this list.</p>
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
//             toggleForm(status);
//           }}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div className="custom-page">
//       <div className="custom-header-row">
//         <h1 className="custom-page-title">My Book Lists</h1>
//         <button className="custom-back-btn" onClick={() => navigate(`/home/${userId}`)}>
//           ← Go Back
//         </button>
//       </div>

//       {loading ? (
//         <p className="custom-loading">⏳ Loading...</p>
//       ) : (
//         <div className="custom-list-container">
//           {renderList("To Read", "wishlist", groupedBooks.wishlist)}
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

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import bgImage from "../assets/manreading.png"; // 🖼️ Użyj innego pliku jeśli chcesz

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({
    wishlist: false,
    reading: false,
    completed: false,
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/user/books/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
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

  const renderList = (label, status, booksArray) => {
    const icon =
      status === "wishlist" ? (
        <BookmarkBorderIcon />
      ) : status === "reading" ? (
        <MenuBookIcon />
      ) : (
        <CheckCircleOutlineIcon />
      );

    return (
      <Grid item xs={12} sm={6} md={4} key={status}>
        <Card sx={{ borderRadius: 4, boxShadow: 2, height: "100%" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box
                sx={{
                  bgcolor: "grey.100",
                  color: "grey.700",
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}
              >
                {icon}
              </Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {label}
              </Typography>
            </Box>

            <Box flexGrow={1}>
              {booksArray.length > 0 ? (
                booksArray.map((book) => (
                  <Box
                    key={book.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        color: "text.primary",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "primary.main" },
                      }}
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      {book.title}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": {
                          color: "grey.800",
                        },
                      }}
                      onClick={() => handleDelete(book.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No books in this list.
                </Typography>
              )}
            </Box>

            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: "grey.300",
                color: "text.primary",
                "&:hover": {
                  borderColor: "grey.400",
                  backgroundColor: "grey.100",
                },
              }}
              onClick={() => toggleForm(status)}
            >
              Add Book
            </Button>

            {showForm[status] && (
              <Box mt={2}>
                <AddBook
                  initialStatus={status}
                  onBookAdded={() => {
                    fetchBooks();
                    toggleForm(status);
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 3,
          py: 4,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Box
              sx={{
                bgcolor: "#f0f4ff",
                color: "#1976d2",
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 1,
              }}
            >
              <MenuBookIcon fontSize="large" />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: "text.primary",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                My Library
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organize, track, and plan your reading
              </Typography>
            </Box>
          </Box>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/home/${userId}`)}
          >
            Go Back
          </Button>
        </Box>

        {loading ? (
          <Typography variant="body1">⏳ Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {renderList("To Read", "wishlist", groupedBooks.wishlist)}
            {renderList("Reading", "reading", groupedBooks.reading)}
            {renderList("Read", "completed", groupedBooks.completed)}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default BookList;
