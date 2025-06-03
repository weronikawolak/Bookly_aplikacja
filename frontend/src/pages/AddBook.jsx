import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchBooksFromGoogle = async (title, author) => {
  const query = `intitle:${title}+inauthor:${author}`;
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.items?.map((item) => {
    const info = item.volumeInfo;
    return {
      id: item.id,
      title: info.title,
      author: info.authors?.[0] || "Unknown",
      pages: info.pageCount,
      description: info.description,
      coverUrl: info.imageLinks?.thumbnail?.replace("http:", "https:"),
      publishedDate: info.publishedDate,
      categories: info.categories || [],
    };
  }) || [];
};

const AddBook = ({ onBookAdded, initialStatus, customListId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [status, setStatus] = useState(initialStatus || "wishlist");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/categories/", {
        headers: { Authorization: `Token ${token}` },
      });
      // Obsługa paginacji — zwróć tablicę kategorii
      if (Array.isArray(res.data)) return res.data;
      if (res.data.results) return res.data.results;
      return [];
    },
  });

  const categories = data || [];

  const mutation = useMutation({
    mutationFn: async (bookData) => {
      await axios.post("http://127.0.0.1:8000/api/v1/books/", bookData, {
        headers: { Authorization: `Token ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      if (onBookAdded) onBookAdded();
    },
  });

  const handleTitleSearch = async () => {
    if (!title && !author) return alert("Please enter a title or author.");
    setSearching(true);
    setSearchResults([]);
    try {
      const results = await fetchBooksFromGoogle(title, author);
      setSearchResults(results);
      if (results.length === 0) alert("No results found.");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryId) return alert("Please select a category.");

    const bookData = {
      title,
      author,
      pages: pages ? parseInt(pages) : null,
      category_id: categoryId,
      cover_url: coverUrl,
      description,
    };

    if (customListId) bookData.custom_lists = [customListId];
    else bookData.status = status;

    if ((status === "completed" || !status) && review) bookData.review = review;
    if ((status === "completed" || !status) && rating) bookData.rating = parseFloat(rating);

    mutation.mutate(bookData);

    setTitle("");
    setAuthor("");
    setPages("");
    setReview("");
    setRating("");
    setCategoryId("");
    setCoverUrl("");
    setDescription("");
    setSearchResults([]);
  };

  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }} elevation={3}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Add a Book
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="dense"
          size="small"
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="dense"
          size="small"
          required
        />

        <Box display="flex" gap={2} alignItems="center" my={2}>
          <Button
            variant="outlined"
            onClick={handleTitleSearch}
            disabled={searching}
            startIcon={!searching && "🔍"}
            size="small"
          >
            {searching ? <CircularProgress size={18} /> : "Search"}
          </Button>
          <Button type="submit" variant="contained" size="small">
            Add Book
          </Button>
        </Box>

        {searchResults.length > 0 && (
          <Box mb={2}>
            <Typography variant="body2" fontWeight={600}>
              Choose a book:
            </Typography>
            {searchResults.map((book) => (
              <Paper
                key={book.id}
                onClick={() => {
                  setTitle(book.title);
                  setAuthor(book.author);
                  setPages(book.pages || "");
                  setCoverUrl(book.coverUrl || "");
                  setDescription(book.description || "");
                  setSearchResults([]);
                }}
                sx={{
                  p: 1.5,
                  mb: 1,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "grey.100" },
                }}
              >
                {book.coverUrl && (
                  <img src={book.coverUrl} alt="cover" style={{ width: 45 }} />
                )}
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {book.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {book.author}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}

        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          fullWidth
          margin="dense"
          size="small"
        >
          <MenuItem value="">-- Select Category --</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {coverUrl && (
          <Box mb={2}>
            <img src={coverUrl} alt="cover" style={{ width: 90 }} />
          </Box>
        )}
        {description && (
          <Typography variant="caption">
            <strong>Description:</strong> {description}
          </Typography>
        )}
        {pages && (
          <Typography variant="caption">
            <strong>Pages:</strong> {pages}
          </Typography>
        )}

        {!customListId && status === "completed" && (
          <Box mt={2}>
            <TextField
              type="number"
              label="Rating (0–5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              placeholder="Review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              multiline
              rows={3}
              margin="dense"
              size="small"
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AddBook;
