import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import AddBook from "./AddBook";

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import bgImage from "../assets/manreading.png";

const BookList = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newListName, setNewListName] = useState("");
  const [showForm, setShowForm] = useState({});
  const [filterListKeys, setFilterListKeys] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: books = [],
    isLoading: loadingBooks,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/user/books/", {
        headers: { Authorization: `Token ${token}` },
      });
      return res.data;
    },
  });

  const {
    data: customListsData = { results: [] },
  } = useQuery({
    queryKey: ["customLists"],
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/custom-lists/", {
        headers: { Authorization: `Token ${token}` },
      });
      return res.data;
    },
  });

  const customLists = customListsData.results || [];

  const deleteBookMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://127.0.0.1:8000/api/v1/books/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBookMutation.mutate(id);
    }
  };

  const createListMutation = useMutation({
    mutationFn: (name) =>
      axios.post(
        "http://127.0.0.1:8000/api/v1/custom-lists/",
        { name },
        { headers: { Authorization: `Token ${token}` } }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["customLists"]);
      setNewListName("");
    },
  });

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    createListMutation.mutate(newListName);
  };

  const deleteListMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://127.0.0.1:8000/api/v1/custom-lists/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["customLists"]);
      queryClient.invalidateQueries(["books"]);
    },
  });

  const handleDeleteCustomList = (id) => {
    if (window.confirm("Are you sure you want to delete this list and its books?")) {
      deleteListMutation.mutate(id);
    }
  };

  const filteredSortedBooks = books
    .filter((book) => {
      if (filterListKeys.length === 0) return true;

      const inCustom = book.custom_lists?.some((id) =>
        filterListKeys.includes(`custom_${id}`)
      );
      const inStatus = filterListKeys.includes(book.status);

      return inCustom || inStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      if (sortOrder === "desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const groupedBooks = {
    wishlist: filteredSortedBooks.filter((b) => b.status === "wishlist"),
    reading: filteredSortedBooks.filter((b) => b.status === "reading"),
    completed: filteredSortedBooks.filter((b) => b.status === "completed"),
  };

  const toggleForm = (key) => {
    setShowForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderList = (label, key, booksArray, icon, customListId = null) => {
    if (filterListKeys.length > 0) {
      if (customListId && !filterListKeys.includes(`custom_${customListId}`)) {
        return null;
      }
      if (!customListId && !filterListKeys.includes(key)) {
        return null;
      }
    }

    return (
      <Grid item xs={12} md={4} key={key}>
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Box display="flex" alignItems="center" gap={1.5}>
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
              {customListId && (
                <IconButton
                  size="small"
                  onClick={() => handleDeleteCustomList(customListId)}
                  sx={{ color: "error.main" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {booksArray.length > 0 ? (
              booksArray.map((book) => (
                <Box
                  key={book.id}
                  sx={{
                    mb: 1.2,
                    px: 1,
                    py: 0.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  <Typography
                    variant="body2"
                    onClick={() => navigate(`/books/${book.id}`)}
                    sx={{
                      flexGrow: 1,
                      color: "text.primary",
                      fontWeight: 500,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {book.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(book.id);
                    }}
                    sx={{ color: "grey.600", "&:hover": { color: "error.main" } }}
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
              onClick={() => toggleForm(key)}
            >
              Add Book
            </Button>

            {showForm[key] && (
              <Box mt={2}>
                <AddBook
                  initialStatus={!customListId ? key : null}
                  customListId={customListId}
                  onBookAdded={() => {
                    queryClient.invalidateQueries(["books"]);
                    toggleForm(key);
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
    <Box sx={{ position: "absolute",
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
          }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", borderRadius: 4, p: 3 }}>
        <Button variant="outlined" onClick={() => navigate(`/home/${userId}`)} sx={{ mb: 3 }}>
          <ArrowBackIcon sx={{ mr: 1 }} /> Back to Home
        </Button>

        <Box sx={{ background: "linear-gradient(to right, #5e60ce, #5390d9)", color: "white", borderRadius: 3, p: 3, mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ bgcolor: "white", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", color: "#5e60ce" }}>
              <MenuBookIcon fontSize="large" />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
                My Library
              </Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Organize, track, and plan your reading
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={4}>
          <TextField
            label="New List Name"
            variant="outlined"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleCreateList}>
            Create List
          </Button>
        </Box>

        <Box display="flex" gap={2} mb={4}>
          <TextField
            select
            label="Filter by Lists"
            value={filterListKeys}
            onChange={(e) =>
              setFilterListKeys(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value
              )
            }
            SelectProps={{ multiple: true }}
            fullWidth
          >
            <MenuItem value="wishlist">Wishlist</MenuItem>
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            {customLists.map((list) => (
              <MenuItem key={list.id} value={`custom_${list.id}`}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Sort by Title"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            fullWidth
          >
            <MenuItem value="asc">A–Z</MenuItem>
            <MenuItem value="desc">Z–A</MenuItem>
          </TextField>
        </Box>

        {loadingBooks ? (
          <Typography variant="body1">⏳ Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {renderList("To Read", "wishlist", groupedBooks.wishlist, <BookmarkBorderIcon />)}
            {renderList("Reading", "reading", groupedBooks.reading, <MenuBookIcon />)}
            {renderList("Read", "completed", groupedBooks.completed, <CheckCircleOutlineIcon />)}
            {customLists.map((list) =>
              renderList(
                list.name,
                `custom_${list.id}`,
                filteredSortedBooks.filter((b) =>
                  b.custom_lists?.includes(list.id)
                ),
                <BookmarkBorderIcon />,
                list.id
              )
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default BookList;
