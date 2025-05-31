// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./BookDetail.css";

// const BookDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [book, setBook] = useState(null);
//   const [status, setStatus] = useState("");
//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     if (!token) return;

//     const fetchBook = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setBook(res.data);
//         setStatus(res.data.status);
//         setRating(res.data.rating || "");
//         setReview(res.data.review || "");
//       } catch (err) {
//         console.error("Error loading book:", err);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       }
//     };

//     fetchBook();
//   }, [id, token, navigate]);

//   const handleUpdate = async () => {
//     const updatedData = { status };
//     if (status === "completed") {
//       updatedData.rating = rating ? parseInt(rating) : null;
//       updatedData.review = review;
//     }

//     try {
//       await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, updatedData, {
//         headers: { Authorization: `Token ${token}` },
//       });

//       alert("Book updated!");
//       navigate("/books");
//     } catch (err) {
//       console.error("Update error:", err.response?.data || err);
//     }
//   };

//   if (!book) return <p className="book-detail-loading">⏳ Loading book details...</p>;

//   return (
//     <div className="book-detail-container">
//       <h1>{book.title}</h1>
//       <p><strong>Author:</strong> {book.author}</p>

//       {book.cover_url && (
//         <div className="book-detail-cover mb-3">
//           <img src={book.cover_url} alt="Book cover" className="w-40 h-auto rounded shadow" />
//         </div>
//       )}

//       {book.category && <p><strong>Category:</strong> {book.category.name}</p>}
//       {book.pages && <p><strong>Pages:</strong> {book.pages}</p>}

//       {book.description && (
//         <div className="book-detail-description mt-2 mb-4">
//           <p><strong>Description:</strong></p>
//           <p className="whitespace-pre-line text-gray-700">{book.description}</p>
//         </div>
//       )}

//       <label className="block font-semibold mt-4">
//         Status:
//         <select value={status} onChange={(e) => setStatus(e.target.value)} className="block p-2 border rounded mt-1">
//           <option value="wishlist">To read</option>
//           <option value="reading">Reading</option>
//           <option value="completed">Read</option>
//         </select>
//       </label>

//       {status === "completed" && (
//         <>
//           <label className="block font-semibold mt-4">
//             Rating (1–10):
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="block p-2 border rounded mt-1"
//             />
//           </label>

//           <label className="block font-semibold mt-4">
//             Review:
//             <textarea
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               className="block w-full p-2 border rounded mt-1"
//             />
//           </label>
//         </>
//       )}

//       <div className="book-detail-buttons mt-4 flex gap-3">
//         <button onClick={handleUpdate} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
//           Save changes
//         </button>
//         <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
//           ← Go back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookDetail;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  InputLabel,
  FormControl,
} from "@mui/material";

import bgImage from "../assets/manreading.png";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBook(res.data);
        setStatus(res.data.status);
        setRating(res.data.rating || "");
        setReview(res.data.review || "");
      } catch (err) {
        console.error("Error loading book:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchBook();
  }, [id, token, navigate]);

  const handleUpdate = async () => {
    const updatedData = { status };
    if (status === "completed") {
      updatedData.rating = rating ? parseInt(rating) : null;
      updatedData.review = review;
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/api/books/${id}/`, updatedData, {
        headers: { Authorization: `Token ${token}` },
      });

      alert("Book updated!");
      navigate("/books");
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
    }
  };

  if (!book) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>
        ⏳ Loading book details...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        m: 0,
        p: 0,
        top: 0,
        left: 0,
        position: "absolute",
        overflowX: "hidden",
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", p: 3, m: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {book.title}
          </Typography>

          <Typography variant="subtitle1" mb={1}>
            <strong>Author:</strong> {book.author}
          </Typography>

          {book.cover_url && (
            <Box
              component="img"
              src={book.cover_url}
              alt="Book cover"
              sx={{ width: "100%", maxHeight: 350, objectFit: "contain", borderRadius: 2, mb: 2 }}
            />
          )}

          {book.category && (
            <Typography variant="body1" mb={1}>
              <strong>Category:</strong> {book.category.name}
            </Typography>
          )}
          {book.pages && (
            <Typography variant="body1" mb={1}>
              <strong>Pages:</strong> {book.pages}
            </Typography>
          )}

          {book.description && (
            <Box mt={2} mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {book.description}
              </Typography>
            </Box>
          )}

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="wishlist">To read</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="completed">Read</MenuItem>
            </Select>
          </FormControl>

          {status === "completed" && (
            <>
              <TextField
                label="Rating (1–10)"
                type="number"
                inputProps={{ min: 1, max: 10 }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                fullWidth
                sx={{ mt: 3 }}
              />

              <TextField
                label="Review"
                multiline
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
            </>
          )}

          <Box mt={4} display="flex" justifyContent="space-between" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              fullWidth
            >
              Save changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              fullWidth
            >
              ← Go back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetail;
