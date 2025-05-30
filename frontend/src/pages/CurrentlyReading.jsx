
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Button,
//   TextField,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BookIcon from "@mui/icons-material/Book";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";

// const CurrentlyReading = () => {
//   const [books, setBooks] = useState([]);
//   const [progressInput, setProgressInput] = useState({});
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/user/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       const readingBooks = res.data.filter((book) => book.status === "reading");
//       setBooks(readingBooks);
//     } catch (err) {
//       console.error("❌ Error fetching reading books", err);
//     }
//   };

//   const handleUpdateProgress = async (bookId) => {
//     const newPages = parseInt(progressInput[bookId]);
//     if (isNaN(newPages)) return;

//     try {
//       await axios.patch(
//         `http://127.0.0.1:8000/api/books/${bookId}/`,
//         { pages_read: newPages },
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       fetchBooks();
//       setProgressInput((prev) => ({ ...prev, [bookId]: "" }));
//     } catch (err) {
//       console.error("❌ Error updating progress", err);
//     }
//   };

//   const handleDelete = async (bookId) => {
//     if (!window.confirm("Delete this book from your reading list?")) return;
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       fetchBooks();
//     } catch (err) {
//       console.error("❌ Error deleting book", err);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
//       {/* 🔙 Back to Home button */}
//       <Button
//         variant="outlined"
//         onClick={() => navigate('/home/${userId}')}
//         sx={{ mb: 3 }}
//       >
//         ← Back to Home
//       </Button>

//       <Box
//         sx={{
//           background: "linear-gradient(to right, #5e60ce, #5390d9)",
//           color: "white",
//           borderRadius: 3,
//           p: 3,
//           mb: 4,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Box
//           sx={{
//             bgcolor: "white",
//             borderRadius: "50%",
//             width: 56,
//             height: 56,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#5e60ce",
//             boxShadow: 2,
//           }}
//         >
//           <BookIcon fontSize="large" />
//         </Box>
//         <Box>
//           <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
//             📖 Currently Reading
//           </Typography>
//           <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//             Track your active reading progress
//           </Typography>
//         </Box>
//       </Box>

//       {books.length === 0 ? (
//         <Typography textAlign="center" color="text.secondary">
//           No books are currently being read.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {books.map((book) => {
//             const percent =
//               book.pages && book.pages_read
//                 ? Math.min((book.pages_read / book.pages) * 100, 100)
//                 : 0;

//             return (
//               <Grid item xs={12} md={6} key={book.id}>
//                 <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
//                   <CardContent sx={{ display: "flex", gap: 2 }}>
//                     {book.cover_url && (
//                       <img
//                         src={book.cover_url}
//                         alt={book.title}
//                         style={{
//                           width: 80,
//                           height: 120,
//                           objectFit: "cover",
//                           borderRadius: 8,
//                         }}
//                       />
//                     )}
//                     <Box sx={{ flexGrow: 1 }}>
//                       <Typography variant="h6">{book.title}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         by {book.author || "Unknown"}
//                       </Typography>

//                       <LinearProgress
//                         variant="determinate"
//                         value={percent}
//                         sx={{ my: 2, height: 10, borderRadius: 5 }}
//                       />
//                       <Typography variant="caption" display="block" gutterBottom>
//                         {book.pages_read || 0} / {book.pages || "?"} pages ({Math.round(percent)}%)
//                       </Typography>

//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
//                         <TextField
//                           type="number"
//                           label="Pages read"
//                           size="small"
//                           value={progressInput[book.id] || ""}
//                           onChange={(e) =>
//                             setProgressInput((prev) => ({
//                               ...prev,
//                               [book.id]: e.target.value,
//                             }))
//                           }
//                         />
//                         <Button
//                           variant="contained"
//                           onClick={() => handleUpdateProgress(book.id)}
//                         >
//                           Update
//                         </Button>
//                         <IconButton
//                           onClick={() =>
//                             navigate(`/books/${book.id}`, {
//                               state: { from: "currently-reading" },
//                             })
//                           }
//                         >
//                           <VisibilityIcon />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDelete(book.id)}
//                           sx={{ color: "#999" }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default CurrentlyReading;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookIcon from "@mui/icons-material/Book";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import readingBg from "../assets/manreading.png"; // ścieżka do tła

const CurrentlyReading = () => {
  const [books, setBooks] = useState([]);
  const [progressInput, setProgressInput] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/user/books/", {
        headers: { Authorization: `Token ${token}` },
      });
      const readingBooks = res.data.filter((book) => book.status === "reading");
      setBooks(readingBooks);
    } catch (err) {
      console.error("❌ Error fetching reading books", err);
    }
  };

  const handleUpdateProgress = async (bookId) => {
    const newPages = parseInt(progressInput[bookId]);
    if (isNaN(newPages)) return;

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/books/${bookId}/`,
        { pages_read: newPages },
        { headers: { Authorization: `Token ${token}` } }
      );
      fetchBooks();
      setProgressInput((prev) => ({ ...prev, [bookId]: "" }));
    } catch (err) {
      console.error("❌ Error updating progress", err);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Delete this book from your reading list?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchBooks();
    } catch (err) {
      console.error("❌ Error deleting book", err);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${readingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 4,
          p: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/home/${userData.id}")}
          sx={{ mb: 3 }}
        >
          ← Back to Home
        </Button>

        <Box
          sx={{
            background: "linear-gradient(to right, #5e60ce, #5390d9)",
            color: "white",
            borderRadius: 3,
            p: 3,
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "50%",
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5e60ce",
              boxShadow: 2,
            }}
          >
            <BookIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
            Currently Reading
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              Track your active reading progress
            </Typography>
          </Box>
        </Box>

        {books.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No books are currently being read.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => {
              const percent =
                book.pages && book.pages_read
                  ? Math.min((book.pages_read / book.pages) * 100, 100)
                  : 0;

              return (
                <Grid item xs={12} md={6} key={book.id}>
                  <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
                    <CardContent sx={{ display: "flex", gap: 2 }}>
                      {book.cover_url && (
                        <img
                          src={book.cover_url}
                          alt={book.title}
                          style={{
                            width: 80,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          by {book.author || "Unknown"}
                        </Typography>

                        <LinearProgress
                          variant="determinate"
                          value={percent}
                          sx={{ my: 2, height: 10, borderRadius: 5 }}
                        />
                        <Typography variant="caption" display="block" gutterBottom>
                          {book.pages_read || 0} / {book.pages || "?"} pages ({Math.round(percent)}%)
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                          <TextField
                            type="number"
                            label="Pages read"
                            size="small"
                            value={progressInput[book.id] || ""}
                            onChange={(e) =>
                              setProgressInput((prev) => ({
                                ...prev,
                                [book.id]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            variant="contained"
                            onClick={() => handleUpdateProgress(book.id)}
                          >
                            Update
                          </Button>
                          <IconButton
                            onClick={() =>
                              navigate(`/books/${book.id}`, {
                                state: { from: "currently-reading" },
                              })
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(book.id)} sx={{ color: "#999" }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CurrentlyReading;
