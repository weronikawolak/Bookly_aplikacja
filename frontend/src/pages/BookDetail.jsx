
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import bgImage from "../assets/manreading.png";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/books/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = res.data;
      setStatus(data.status);
      setRating(data.rating || "");
      setReview(data.review || "");
      return data;
    },
    onError: (err) => {
      console.error("Error loading book:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: async (updatedData) => {
      return axios.patch(`http://127.0.0.1:8000/api/v1/books/${id}/`, updatedData, {
        headers: { Authorization: `Token ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["book", id]);
      alert("Book updated!");
      navigate("/books");
    },
    onError: (err) => {
      console.error("Update error:", err.response?.data || err);
    },
  });

  const handleUpdate = () => {
    const updatedData = { status };
    if (status === "completed") {
      updatedData.rating = rating ? parseFloat(rating) : null;
      updatedData.review = review;
    }

    updateBookMutation.mutate(updatedData);
  };

  if (isLoading || !book) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }}>
        ⏳ Loading book details...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
            backgroundPosition: "center",
            py: 6,
            px: 2,
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            width: "100vw",
            overflowX: "hidden",
            m: 0,
            p: 0,
            top: 0,
            left: 0,

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
                label="Rating (0–5)"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={rating}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 && value <= 5) setRating(e.target.value);
                }}
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
            <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
              Save changes
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
              ← Go back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetail;
