// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { Paper } from "@mui/material";

// import bgImage from "../assets/manreading.png";

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
//       fetchBooks();
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

//   const renderList = (label, status, booksArray, icon) => (
//     <Grid item xs={12} md={4} key={status}>
//       <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
//         <CardContent>
//           <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//             <Box
//               sx={{
//                 bgcolor: "grey.100",
//                 color: "grey.700",
//                 p: 1,
//                 borderRadius: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: 1,
//               }}
//             >
//               {icon}
//             </Box>
//             <Typography variant="subtitle1" fontWeight={600}>
//               {label}
//             </Typography>
//           </Box>

//          {booksArray.length > 0 ? (
//             booksArray.map((book) => (
//               <Box
//                 key={book.id}
//                 sx={{
//                   mb: 1.2,
//                   px: 1,
//                   py: 0.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   borderRadius: 1,
//                   cursor: "pointer",
//                   transition: "0.2s",
//                   "&:hover": {
//                     backgroundColor: "grey.100",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   onClick={() => navigate(`/books/${book.id}`)}
//                   sx={{
//                     flexGrow: 1,
//                     color: "text.primary",
//                     fontWeight: 500,
//                     "&:hover": { color: "primary.main" },
//                   }}
//                 >
//                   {book.title}
//                 </Typography>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(book.id);
//                   }}
//                   sx={{ color: "grey.600", "&:hover": { color: "error.main" } }}
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               No books in this list.
//             </Typography>
//           )}


//           <Button
//             startIcon={<AddIcon />}
//             variant="outlined"
//             fullWidth
//             sx={{
//               mt: 2,
//               borderColor: "grey.300",
//               color: "text.primary",
//               "&:hover": {
//                 borderColor: "grey.400",
//                 backgroundColor: "grey.100",
//               },
//             }}
//             onClick={() => toggleForm(status)}
//           >
//             Add Book
//           </Button>

//           {showForm[status] && (
//             <Box mt={2}>
//               <AddBook
//                 initialStatus={status}
//                 onBookAdded={() => {
//                   fetchBooks();
//                   toggleForm(status);
//                 }}
//               />
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         width: "100vw",
//         py: 6,
//         m: 0,
//         p: 0,
//         top: 0,
//         left: 0,
//         position: "absolute",
//         // display: "flex",
//         overflowX: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           borderRadius: 4,
//           p: 3,
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={() => navigate(`/home/${userId}`)}
//           sx={{ mb: 3 }}
//         >
//           <ArrowBackIcon sx={{ mr: 1 }} /> Back to Home
//         </Button>

//         <Box
//           sx={{
//             background: "linear-gradient(to right, #5e60ce, #5390d9)",
//             color: "white",
//             borderRadius: 3,
//             p: 3,
//             mb: 4,
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "white",
//               borderRadius: "50%",
//               width: 56,
//               height: 56,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#5e60ce",
//               boxShadow: 2,
//             }}
//           >
//             <MenuBookIcon fontSize="large" />
//           </Box>
//           <Box>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
//               My Library
//             </Typography>
//             <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//               Organize, track, and plan your reading
//             </Typography>
//           </Box>
//         </Box>

//         {loading ? (
//           <Typography variant="body1">⏳ Loading...</Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {renderList("To Read", "wishlist", groupedBooks.wishlist, <BookmarkBorderIcon />)}
//             {renderList("Reading", "reading", groupedBooks.reading, <MenuBookIcon />)}
//             {renderList("Read", "completed", groupedBooks.completed, <CheckCircleOutlineIcon />)}
//           </Grid>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BookList;










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBook from "./AddBook";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
//   TextField,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import bgImage from "../assets/manreading.png";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [customLists, setCustomLists] = useState([]);
//   const [newListName, setNewListName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState({});

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

//   const fetchCustomLists = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/custom-lists/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setCustomLists(res.data);
//     } catch (err) {
//       console.error("Error fetching custom lists:", err);
//     }
//   };

//   const handleDelete = async (bookId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this book?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       fetchBooks();
//     } catch (err) {
//       console.error("Error deleting book:", err);
//     }
//   };

//   const handleCreateList = async () => {
//     if (!newListName.trim()) return;
//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/custom-lists/",
//         { name: newListName },
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       setNewListName("");
//       fetchCustomLists();
//     } catch (err) {
//       console.error("Error creating list:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//     fetchCustomLists();
//   }, []);

//   const groupedBooks = {
//     wishlist: books.filter((b) => b.status === "wishlist"),
//     reading: books.filter((b) => b.status === "reading"),
//     completed: books.filter((b) => b.status === "completed"),
//   };

//   const toggleForm = (key) => {
//     setShowForm((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const renderList = (label, key, booksArray, icon, customListId = null) => (
//     <Grid item xs={12} md={4} key={key}>
//       <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
//         <CardContent>
//           <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//             <Box
//               sx={{
//                 bgcolor: "grey.100",
//                 color: "grey.700",
//                 p: 1,
//                 borderRadius: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: 1,
//               }}
//             >
//               {icon}
//             </Box>
//             <Typography variant="subtitle1" fontWeight={600}>
//               {label}
//             </Typography>
//           </Box>

//           {booksArray.length > 0 ? (
//             booksArray.map((book) => (
//               <Box
//                 key={book.id}
//                 sx={{
//                   mb: 1.2,
//                   px: 1,
//                   py: 0.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   borderRadius: 1,
//                   cursor: "pointer",
//                   transition: "0.2s",
//                   "&:hover": {
//                     backgroundColor: "grey.100",
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   onClick={() => navigate(`/books/${book.id}`)}
//                   sx={{
//                     flexGrow: 1,
//                     color: "text.primary",
//                     fontWeight: 500,
//                     "&:hover": { color: "primary.main" },
//                   }}
//                 >
//                   {book.title}
//                 </Typography>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(book.id);
//                   }}
//                   sx={{ color: "grey.600", "&:hover": { color: "error.main" } }}
//                 >
//                   <DeleteIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               No books in this list.
//             </Typography>
//           )}

//           <Button
//             startIcon={<AddIcon />}
//             variant="outlined"
//             fullWidth
//             sx={{
//               mt: 2,
//               borderColor: "grey.300",
//               color: "text.primary",
//               "&:hover": {
//                 borderColor: "grey.400",
//                 backgroundColor: "grey.100",
//               },
//             }}
//             onClick={() => toggleForm(key)}
//           >
//             Add Book
//           </Button>

//           {showForm[key] && (
//             <Box mt={2}>
//               <AddBook
//                 initialStatus={!customListId ? key : null}
//                 customListId={customListId}
//                 onBookAdded={() => {
//                   fetchBooks();
//                   toggleForm(key);
//                 }}
//               />
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         width: "100vw",
//         py: 6,
//         m: 0,
//         p: 0,
//         top: 0,
//         left: 0,
//         position: "absolute",
//         overflowX: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           borderRadius: 4,
//           p: 3,
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={() => navigate(`/home/${userId}`)}
//           sx={{ mb: 3 }}
//         >
//           <ArrowBackIcon sx={{ mr: 1 }} /> Back to Home
//         </Button>

//         <Box
//           sx={{
//             background: "linear-gradient(to right, #5e60ce, #5390d9)",
//             color: "white",
//             borderRadius: 3,
//             p: 3,
//             mb: 4,
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             boxShadow: 3,
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "white",
//               borderRadius: "50%",
//               width: 56,
//               height: 56,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#5e60ce",
//               boxShadow: 2,
//             }}
//           >
//             <MenuBookIcon fontSize="large" />
//           </Box>
//           <Box>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
//               My Library
//             </Typography>
//             <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//               Organize, track, and plan your reading
//             </Typography>
//           </Box>
//         </Box>

//         <Box display="flex" gap={2} mb={4}>
//           <TextField
//             label="New List Name"
//             variant="outlined"
//             value={newListName}
//             onChange={(e) => setNewListName(e.target.value)}
//             fullWidth
//           />
//           <Button variant="contained" onClick={handleCreateList}>
//             Create List
//           </Button>
//         </Box>

//         {loading ? (
//           <Typography variant="body1">⏳ Loading...</Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {renderList("To Read", "wishlist", groupedBooks.wishlist, <BookmarkBorderIcon />)}
//             {renderList("Reading", "reading", groupedBooks.reading, <MenuBookIcon />)}
//             {renderList("Read", "completed", groupedBooks.completed, <CheckCircleOutlineIcon />)}

//             {customLists.map((list) =>
//               renderList(list.name, `custom_${list.id}`, books.filter((b) => b.custom_list === list.id), <BookmarkBorderIcon />, list.id)
//             )}
//           </Grid>
//         )}
//       </Box>
//     </Box>
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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import bgImage from "../assets/manreading.png";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [customLists, setCustomLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({});

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

  const fetchCustomLists = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/custom-lists/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCustomLists(res.data);
    } catch (err) {
      console.error("Error fetching custom lists:", err);
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

  const handleDeleteCustomList = async (listId) => {
    const confirm = window.confirm("Are you sure you want to delete this list and its books?");
    if (!confirm) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/custom-lists/${listId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchCustomLists();
      fetchBooks();
    } catch (err) {
      console.error("Error deleting custom list:", err);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/custom-lists/",
        { name: newListName },
        { headers: { Authorization: `Token ${token}` } }
      );
      setNewListName("");
      fetchCustomLists();
    } catch (err) {
      console.error("Error creating list:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCustomLists();
  }, []);

  const groupedBooks = {
    wishlist: books.filter((b) => b.status === "wishlist"),
    reading: books.filter((b) => b.status === "reading"),
    completed: books.filter((b) => b.status === "completed"),
  };

  const toggleForm = (key) => {
    setShowForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderList = (label, key, booksArray, icon, customListId = null) => (
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
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
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
                  fetchBooks();
                  toggleForm(key);
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        py: 6,
        m: 0,
        p: 0,
        top: 0,
        left: 0,
        position: "absolute",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: 4,
          p: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(`/home/${userId}`)}
          sx={{ mb: 3 }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} /> Back to Home
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

        {loading ? (
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
                books.filter((b) => b.custom_list === list.id),
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
