// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const fetchBookFromOpenLibrary = async (title) => {
//   try {
//     const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
//     const data = await res.json();
//     const book = data.docs[0];
//     if (!book) return null;

//     return {
//       title: book.title,
//       author: book.author_name?.[0] || "Unknown",
//       pages: book.number_of_pages_median || null,
//       coverId: book.cover_i,
//     };
//   } catch (err) {
//     console.error("Error fetching from OpenLibrary", err);
//     return null;
//   }
// };


// const AddBook = ({ onBookAdded, initialStatus }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [status, setStatus] = useState(initialStatus || "wishlist");
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setCategories(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const bookData = {
//       title,
//       author,
//       status,
//       category_id: categoryId,
//     };

//     if (status === "completed") {
//       bookData.review = review;
//       bookData.rating = rating;
//     }

//     try {
//       await axios.post("http://127.0.0.1:8000/api/books/", bookData, {
//         headers: { Authorization: `Token ${token}` },
//       });

//       // Reset form
//       setTitle("");
//       setAuthor("");
//       setStatus(initialStatus || "wishlist");
//       setReview("");
//       setRating("");
//       setCategoryId("");

//       if (onBookAdded) onBookAdded();
//     } catch (error) {
//       console.error("❌ Error adding book:", error.response?.data || error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">

//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//         className="block w-full mb-2 p-2 border rounded"
//       />

//       <input
//         type="text"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Author"
//         required
//         className="block w-full mb-2 p-2 border rounded"
//       />

//       <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(e.target.value)}
//         className="block w-full mb-2 p-2 border rounded"
//         required
//       >
//         <option value="">-- Choose a category --</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {status === "completed" && (
//         <>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             placeholder="Rating (1–5)"
//             className="block w-full mb-2 p-2 border rounded"
//           />

//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Review (optional)"
//             className="block w-full mb-2 p-2 border rounded"
//           />
//         </>
//       )}

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add book
//       </button>
//     </form>
//   );
// };

// // export default AddBook;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // 🔎 Pobieranie danych z Open Library
// const fetchBookFromOpenLibrary = async (title) => {
//   try {
//     const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
//     const data = await res.json();
//     const book = data.docs[0];
//     if (!book) return null;

//     const editionKey = book.edition_key?.[0];
//     const workKey = book.key;
//     const bookTitle = book.title;
//     const author = book.author_name?.[0] || "Unknown";
//     const coverId = book.cover_i;
//     const coverUrl = coverId
//       ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
//       : null;

//     let pages = null;
//     let description = null;

//     if (editionKey) {
//       try {
//         const editionRes = await fetch(`https://openlibrary.org/books/${editionKey}.json`);
//         const edition = await editionRes.json();
//         if (edition.number_of_pages) pages = edition.number_of_pages;
//         if (edition.description) {
//           description =
//             typeof edition.description === "string"
//               ? edition.description
//               : edition.description.value;
//         }
//       } catch (err) {
//         console.warn("Nie udało się pobrać z /books/");
//       }
//     }

//     if (!pages && workKey) {
//       try {
//         const workRes = await fetch(`https://openlibrary.org${workKey}.json`);
//         const work = await workRes.json();
//         if (work.number_of_pages) pages = work.number_of_pages;
//       } catch (err) {
//         console.warn("Nie udało się pobrać z /works/");
//       }
//     }

//     return {
//       title: bookTitle,
//       author,
//       pages,
//       description,
//       coverUrl,
//     };
//   } catch (err) {
//     console.error("Błąd podczas pobierania z OpenLibrary", err);
//     return null;
//   }
// };

// const AddBook = ({ onBookAdded, initialStatus }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [pages, setPages] = useState("");
//   const [status, setStatus] = useState(initialStatus || "wishlist");
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [coverUrl, setCoverUrl] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setCategories(response.data);
//       } catch (error) {
//         console.error("❌ Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   const handleTitleSearch = async () => {
//     if (!title) return;
//     setSearching(true);

//     try {
//       const bookData = await fetchBookFromOpenLibrary(title);
//       if (bookData) {
//         setTitle(bookData.title);
//         setAuthor(bookData.author);
//         if (bookData.pages) setPages(bookData.pages);
//         if (bookData.coverUrl) setCoverUrl(bookData.coverUrl);
//       } else {
//         alert("Book not found.");
//       }
//     } catch (error) {
//       console.error("Error during book search:", error);
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const bookData = {
//       title,
//       author,
//       pages,
//       status,
//       category_id: categoryId,
//       cover_url: coverUrl,
//       description,
//     };

//     if (status === "completed") {
//       bookData.review = review;
//       bookData.rating = rating;
//     }

//     console.log("Sending book data:", bookData);


//     try {
//       await axios.post("http://127.0.0.1:8000/api/books/", bookData, {
//         headers: { Authorization: `Token ${token}` },
//       });

//       // Reset form
//       setTitle("");
//       setAuthor("");
//       setPages("");
//       setStatus(initialStatus || "wishlist");
//       setReview("");
//       setRating("");
//       setCategoryId("");
//       setCoverUrl("");

//       if (onBookAdded) onBookAdded();
//     } catch (error) {
//       console.error("❌ Error adding book:", error.response?.data || error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">
//       <div className="flex gap-2 mb-2">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//           className="flex-1 p-2 border rounded"
//         />
//         <button
//           type="button"
//           onClick={handleTitleSearch}
//           disabled={searching}
//           className="px-3 py-2 bg-gray-200 border rounded hover:bg-gray-300"
//         >
//           {searching ? "Searching..." : "🔍 Search"}
//         </button>
//       </div>

//       {coverUrl && (
//         <div className="mb-2">
//           <img src={coverUrl} alt="Book cover" className="w-32 h-auto rounded shadow" />
//         </div>
//       )}

//       <input
//         type="text"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Author"
//         required
//         className="block w-full mb-2 p-2 border rounded"
//       />

//       <input
//         type="number"
//         value={pages}
//         onChange={(e) => setPages(e.target.value)}
//         placeholder="Pages (optional)"
//         className="block w-full mb-2 p-2 border rounded"
//       />

//       <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(e.target.value)}
//         className="block w-full mb-2 p-2 border rounded"
//         required
//       >
//         <option value="">-- Choose a category --</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {status === "completed" && (
//         <>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             placeholder="Rating (1–5)"
//             className="block w-full mb-2 p-2 border rounded"
//           />

//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Review (optional)"
//             className="block w-full mb-2 p-2 border rounded"
//           />
//         </>
//       )}

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add book
//       </button>
//     </form>
//   );
// };

// export default AddBook;
















// import React, { useEffect, useState } from "react";
// import axios from "axios";


// const fetchBooksFromGoogle = async (title, author) => {
//   try {
//     const query = `intitle:${title}+inauthor:${author}`;
//     const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
//     const data = await res.json();
//     return data.items?.map((item) => {
//       const info = item.volumeInfo;
//       return {
//         id: item.id,
//         title: info.title,
//         author: info.authors?.[0] || "Unknown",
//         pages: info.pageCount,
//         description: info.description,
//         coverUrl: info.imageLinks?.thumbnail?.replace("http:", "https:"),
//         publishedDate: info.publishedDate,
//         categories: info.categories || [],
//       };
//     }) || [];
//   } catch (err) {
//     console.error("❌ Błąd przy pobieraniu z Google Books:", err);
//     return [];
//   }
// };



// const AddBook = ({ onBookAdded, initialStatus }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [pages, setPages] = useState("");
//   const [status, setStatus] = useState(initialStatus || "wishlist");
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState("");
//   const [category, setCategory] = useState("");
//   //const [categories, setCategories] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [coverUrl, setCoverUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [searchResults, setSearchResults] = useState([]);



//   const token = localStorage.getItem("token");

// const handleTitleSearch = async () => {
//   if (!title && !author) {
//     alert("Please enter a title or author.");
//     return;
//   }

//   setSearching(true);
//   setSearchResults([]);

//   try {
//     const results = await fetchBooksFromGoogle(title, author);
//     setSearchResults(results);
//     if (results.length === 0) alert("No results found.");
//   } catch (err) {
//     console.error("❌ Search error:", err);
//   } finally {
//     setSearching(false);
//   }
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     const bookData = {
//       title,
//       author,
//       pages: pages ? parseInt(pages) : null,
//       status,
//       category,
//       cover_url: coverUrl,
//       description,
//     };

//     if (status === "completed") {
//       bookData.review = review;
//       bookData.rating = rating ? parseInt(rating) : null;
//     }

//     console.log("Sending book data:", bookData);

//     try {
//       await axios.post("http://127.0.0.1:8000/api/books/", bookData, {
//         headers: { Authorization: `Token ${token}` },
//       });

//       // Reset form
//       setTitle("");
//       setAuthor("");
//       setPages("");
//       setStatus(initialStatus || "wishlist");
//       setReview("");
//       setRating("");
//       setCategoryId("");
//       setCoverUrl("");
//       setDescription("");

//       if (onBookAdded) onBookAdded();
//     } catch (error) {
//       if (error.response) {
//         console.error("❌ Error adding book:", error.response.data);
//       } else {
//         console.error("❌ Unknown error:", error);
//       }    }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-6 bg-white">

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Book title"
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           placeholder="Author"
//           className="p-2 border rounded"
//         />
//       </div>

//       <div className="mb-3">
//         <button
//           type="button"
//           onClick={handleTitleSearch}
//           disabled={searching}
//           className="px-4 py-2 bg-gray-200 border rounded hover:bg-gray-300"
//         >
//           {searching ? "Searching..." : "🔍 Search"}
//         </button>
//       </div>


//         {searchResults.length > 0 && (
//       <div className="mb-3 border p-2 rounded bg-gray-50">
//         <p className="font-semibold">Choose a book:</p>
//         {searchResults.map((book) => (
//           <div
//             key={book.id}
//             className="flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-gray-100"
//             onClick={() => {
//               setTitle(book.title);
//               setAuthor(book.author);
//               setPages(book.pages || "");
//               setCoverUrl(book.coverUrl || "");
//               setDescription(book.description || "");
//               setCategory(book.categories?.[0] || "");  // tu pobierasz kategorię z Google
//               setSearchResults([]); // usuwa listę po wybraniu
//               if (book.categories?.length) {
//                 const matchedCategory = categories.find(cat =>
//                   book.categories.some(apiCat =>
//                     apiCat.toLowerCase().includes(cat.name.toLowerCase())
//                   )
//                 );
//                 if (matchedCategory) {
//                   setCategoryId(matchedCategory.id);
//                 }
//             }
            
//             }}
//           >
//             {book.coverUrl && <img src={book.coverUrl} alt="cover" className="w-12 h-auto" />}
//             <div>
//               <p className="font-medium">{book.title}</p>
//               <p className="text-sm text-gray-600">{book.author}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}


//       {coverUrl && (
//         <div className="mb-2">
//           <img src={coverUrl} alt="Book cover" className="w-32 h-auto rounded shadow" />
//         </div>
//       )}


//       {pages && (
//         <p className="mb-2 text-sm text-gray-700"><strong>Pages:</strong> {pages}</p>
//       )}

//       {description && (
//         <p className="mb-2 text-sm text-gray-700 whitespace-pre-line">
//           <strong>Description:</strong> {description}
//         </p>
//       )}

//       {category && (
//         <p className="mb-2 text-sm text-gray-700">
//           <strong>Category:</strong> {category}
//         </p>
//       )}

//       {/* <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(e.target.value)}
//         className="block w-full mb-2 p-2 border rounded"
//         required
//       >
//         <option value="">-- Choose a category --</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select> */}

//       {status === "completed" && (
//         <>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             placeholder="Rating (1–5)"
//             className="block w-full mb-2 p-2 border rounded"
//           />

//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Review (optional)"
//             className="block w-full mb-2 p-2 border rounded"
//           />
//         </>
//       )}

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add book
//       </button>
//     </form>
//   );
// };

// export default AddBook;





import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

// Wyszukiwanie książek z Google Books API
const fetchBooksFromGoogle = async (title, author) => {
  try {
    const query = `intitle:${title}+inauthor:${author}`;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return (
      data.items?.map((item) => {
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
      }) || []
    );
  } catch (err) {
    console.error("❌ Błąd przy pobieraniu z Google Books:", err);
    return [];
  }
};

const AddBook = ({ onBookAdded, initialStatus }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [status, setStatus] = useState(initialStatus || "wishlist");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem("token");

  const handleTitleSearch = async () => {
    if (!title && !author) {
      alert("Please enter a title or author.");
      return;
    }

    setSearching(true);
    setSearchResults([]);

    try {
      const results = await fetchBooksFromGoogle(title, author);
      setSearchResults(results);
      if (results.length === 0) alert("No results found.");
    } catch (err) {
      console.error("❌ Search error:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      pages: pages ? parseInt(pages) : null,
      status,
      category,
      cover_url: coverUrl,
      description,
    };

    if (status === "completed") {
      bookData.review = review;
      bookData.rating = rating ? parseInt(rating) : null;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/books/", bookData, {
        headers: { Authorization: `Token ${token}` },
      });

      // Reset formularza
      setTitle("");
      setAuthor("");
      setPages("");
      setStatus(initialStatus || "wishlist");
      setReview("");
      setRating("");
      setCategory("");
      setCoverUrl("");
      setDescription("");
      setSearchResults([]);

      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("❌ Error adding book:", error.response?.data || error);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }} elevation={3}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Add a Book
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="dense"
            size="small"
            variant="outlined"
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
        />

        <TextField
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="dense"
          size="small"
          variant="outlined"
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
    
        />

        <Box display="flex" gap={2} alignItems="center" my={2}>
          <Button
            variant="outlined"
            onClick={handleTitleSearch}
            disabled={searching}
            startIcon={!searching && <span role="img" aria-label="search">🔍</span>}
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
            <Typography variant="body2" fontWeight={600} gutterBottom>
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
                  setCategory(book.categories?.[0] || "");
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
                  <img
                    src={book.coverUrl}
                    alt="cover"
                    style={{ width: 45, height: "auto" }}
                  />
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

        {coverUrl && (
          <Box mb={2}>
            <img src={coverUrl} alt="cover" style={{ width: 90 }} />
          </Box>
        )}
        {pages && (
          <Typography variant="caption" display="block" mb={1}>
            <strong>Pages:</strong> {pages}
          </Typography>
        )}
        {description && (
          <Typography variant="caption" display="block" mb={1}>
            <strong>Description:</strong> {description}
          </Typography>
        )}
        {category && (
          <Typography variant="caption" display="block" mb={1}>
            <strong>Category:</strong> {category}
          </Typography>
        )}

        {status === "completed" && (
          <Box mt={2}>
            <TextField
                type="number"
                placeholder="Rating (1–5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                inputProps={{ min: 1, max: 5 }}
                fullWidth
                margin="dense"
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
              },
            }}
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
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AddBook;
