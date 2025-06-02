// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   TextField,
//   Button,
//   Grid,
//   Paper,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import CategoryIcon from "@mui/icons-material/Category";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import StarIcon from "@mui/icons-material/Star";
// import PersonIcon from "@mui/icons-material/Person";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import bgImage from "../assets/manreading.png";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BE2"];

// const SectionHeader = ({ icon, title }) => (
//   <Box display="flex" alignItems="center" gap={2} mb={2}>
//     <Box
//       sx={{
//         bgcolor: "primary.main",
//         color: "white",
//         p: 1,
//         borderRadius: 2,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
        
//       }}
//     >
//       {icon}
//     </Box>
//     <Typography variant="h6" fontWeight="bold">
//       {title}
//     </Typography>
//   </Box>
// );

// const Statistics = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [goal, setGoal] = useState(null);
//   const [goalValue, setGoalValue] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [booksPerMonth, setBooksPerMonth] = useState([]);
//   const [genreStats, setGenreStats] = useState([]);
//   const [averagePages, setAveragePages] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);
//   const [topAuthor, setTopAuthor] = useState("");
//   const [editingGoal, setEditingGoal] = useState(false);
//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const headers = { Authorization: `Token ${token}` };
//       const year = new Date().getFullYear();

//       const [goalRes, booksRes] = await Promise.all([
//         axios.get(`http://127.0.0.1:8000/api/reading-goal/progress/?year=${year}`, { headers }),
//         axios.get(`http://127.0.0.1:8000/api/books/?status=completed`, { headers }),
//       ]);

//       setGoal(goalRes.data.goal);
//       setProgress(goalRes.data.completed);

//       const monthly = new Array(12).fill(0);
//       const genreMap = {};
//       let pageSum = 0,
//         ratingSum = 0,
//         ratingCount = 0,
//         authorMap = {};
        

//       booksRes.data.forEach((book) => {
//         const date = new Date(book.updated_at || book.created_at);
//         const month = date.getMonth();
//         monthly[month] += 1;

//         const cat = book.category?.name || "Uncategorized";
//         genreMap[cat] = (genreMap[cat] || 0) + 1;

//         pageSum += book.pages || 0;
//         if (typeof book.rating === "number") {
//           ratingSum += book.rating;
//           ratingCount += 1;
//         }

//         if (book.author) {
//           authorMap[book.author] = (authorMap[book.author] || 0) + 1;
//         }
//       });

//       setAveragePages((pageSum / booksRes.data.length || 0).toFixed(0));
//       setAverageRating((ratingCount > 0 ? (ratingSum / ratingCount) : 0).toFixed(1));

//       setBooksPerMonth(
//         monthly.map((val, idx) => ({
//           month: new Date(0, idx).toLocaleString("en", { month: "short" }),
//           count: val,
//         }))
//       );
//       setGenreStats(Object.entries(genreMap).map(([name, value]) => ({ name, value })));
//       //setAveragePages((pageSum / booksRes.data.length || 0).toFixed(0));
//       //setAverageRating((ratingSum / booksRes.data.length || 0).toFixed(1));
//       const sortedAuthors = Object.entries(authorMap).sort((a, b) => b[1] - a[1]);
//       setTopAuthor(sortedAuthors[0]?.[0] || "-");
//     } catch (err) {
//       console.error("❌ Error fetching stats", err);
//     }
//   };

// const handleGoalSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const year = new Date().getFullYear();
//     const headers = { Authorization: `Token ${token}` };

//     const parsedGoal = parseInt(goalValue);
//     if (isNaN(parsedGoal) || parsedGoal <= 0) return;

//     await axios.post(
//       `http://127.0.0.1:8000/api/reading-goal/`,
//       { year, goal: parsedGoal },
//       { headers }
//     );

//     setGoal(parsedGoal);        // <-- Upewnij się, że zapisujesz liczbę
//     setGoalValue("");
//     setEditingGoal(false);      // <-- Zamyka formularz
//     fetchStats();               // <-- Odświeża dane z backendu
//   } catch (err) {
//     console.error("❌ Error saving goal", err);
//   }
// };


//   return (
//     <Box
//       sx={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           minHeight: "100vh",
//           width: "100vw",
//           py: 6,
//           m: 0,
//           p: 0,
//           top: 0,
//           left: 0,
//           position: "absolute", // lub "fixed" jeśli chcesz, by był cały czas widoczny
//           display: "flex",
//           overflowX: "hidden",
//       }}
//     >
//       <Box
//         sx={{

//             width: "100%",
//             maxWidth: 1000,     // Zwiększona maksymalna szerokość
//             mx: "auto",
//             px: { xs: 2, sm: 4, md: 6 }, // Większy padding na większych ekranach
//             py: 4,
//             borderRadius: 4,
//         }}
//       >
//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate('/home/${userId}')}
//           sx={{ mb: 3 }}
//         >
//           Back to Home
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
//               color: "#1976d2",
//               boxShadow: 2,
//             }}
//           >
//             <EmojiEventsIcon fontSize="large" />
//           </Box>
//           <Box>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
//               📊 Reading Dashboard
//             </Typography>
//             <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//               Your personal reading statistics and insights
//             </Typography>
//           </Box>
//         </Box>

//         {/* Goal Section */}
//         <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
//           <CardContent>
//             <SectionHeader icon={<EmojiEventsIcon />} title="Reading Goal" />
//             {goal && !editingGoal ? (
//                 <>
//                   <Typography>Goal: {goal} books</Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={(progress / goal) * 100}
//                     sx={{ my: 2, height: 10, borderRadius: 5 }}
//                   />
//                   <Typography variant="body2" mb={2}>
//                     {progress} of {goal} books read ({Math.round((progress / goal) * 100)}%)
//                   </Typography>
//                   <Button variant="outlined" size="small" onClick={() => setEditingGoal(true)}>
//                     Edit Goal
//                   </Button>
//                 </>
//               ) : (
//                 <Box
//                   component="form"
//                   onSubmit={(e) => {
//                     handleGoalSubmit(e);
//                     setEditingGoal(false);
//                   }}
//                   sx={{ display: "flex", gap: 2, mt: 1 }}
//                 >
//                   <TextField
//                     type="number"
//                     label="Enter your goal"
//                     value={goalValue}
//                     onChange={(e) => setGoalValue(e.target.value)}
//                     size="small"
//                     required
//                   />
//                   <Button variant="contained" type="submit">
//                     {goal ? "Update" : "Set Goal"}
//                   </Button>
//                   {goal && (
//                     <Button variant="text" onClick={() => setEditingGoal(false)}>
//                       Cancel
//                     </Button>
//                   )}
//                 </Box>
//               )}
//           </CardContent>
//         </Card>

//         {/* Charts */}
//         <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
//           <CardContent>
//             <SectionHeader icon={<CalendarMonthIcon />} title="Books per Month" />
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={booksPerMonth}>
//                 <XAxis dataKey="month" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip formatter={(value) => [`${value} books`, "Read"]} />
//                 <Bar dataKey="count" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
//           <CardContent>
//             <SectionHeader icon={<CategoryIcon />} title="Favorite Genres" />
//             <ResponsiveContainer width="100%" height={240}>
//               <PieChart>
//                 <Pie
//                   data={genreStats}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label={({ name, value }) => `${name}: ${value}`}
//                   labelLine={false}
//                 >
//                   {genreStats.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Summary */}
//         <Grid container spacing={3}>
//   <Grid item xs={12} md={4}>
//     <Paper
//       sx={{
//         p: 3,
//         borderRadius: 4,
//         boxShadow: 3,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 1,
//         textAlign: "center",
//       }}
//     >
//       <Box
//         sx={{
//           bgcolor: "#e3f2fd",
//           p: 1.5,
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <MenuBookIcon color="primary" />
//       </Box>
//       <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
//         Avg. Pages
//       </Typography>
//       <Typography variant="h5" fontWeight="bold">
//         {averagePages}
//       </Typography>
//     </Paper>
//   </Grid>

//       <Grid item xs={12} md={4}>
//         <Paper
//           sx={{
//             p: 3,
//             borderRadius: 4,
//             boxShadow: 3,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 1,
//             textAlign: "center",
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "#fff3e0",
//               p: 1.5,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <StarIcon sx={{ color: "#f9a825" }} />
//           </Box>
//           <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
//             Avg. Rating
//           </Typography>
//           <Typography variant="h5" fontWeight="bold">
//             {averageRating}
//           </Typography>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} md={4}>
//         <Paper
//           sx={{
//             p: 3,
//             borderRadius: 4,
//             boxShadow: 3,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 1,
//             textAlign: "center",
//           }}
//         >
//           <Box
//             sx={{
//               bgcolor: "#ede7f6",
//               p: 1.5,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <PersonIcon sx={{ color: "#673ab7" }} />
//           </Box>
//           <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
//             Top Author
//           </Typography>
//           <Typography variant="h6" fontWeight="bold">
//             {topAuthor}
//           </Typography>
//         </Paper>
//       </Grid>
//     </Grid>

//       </Box>
//     </Box>
//   );
// };

// export default Statistics;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box, Card, CardContent, Typography, LinearProgress,
  TextField, Button, Grid, Paper
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import bgImage from "../assets/manreading.png";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BE2"];

const SectionHeader = ({ icon, title }) => (
  <Box display="flex" alignItems="center" gap={2} mb={2}>
    <Box sx={{ bgcolor: "primary.main", color: "white", p: 1, borderRadius: 2, display: "flex" }}>
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="bold">{title}</Typography>
  </Box>
);

const Statistics = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [goalValue, setGoalValue] = useState("");
  const [editingGoal, setEditingGoal] = useState(false);

  const headers = { Authorization: `Token ${token}` };
  const year = new Date().getFullYear();

  const {
    data: statsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const [goalRes, booksRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/reading-goal/progress/?year=${year}`, { headers }),
        axios.get(`http://127.0.0.1:8000/api/books/?status=completed`, { headers }),
      ]);

      const goal = goalRes.data.goal;
      const progress = goalRes.data.completed;

      const books = booksRes.data;
      const monthly = new Array(12).fill(0);
      const genreMap = {};
      let pageSum = 0, ratingSum = 0, ratingCount = 0, authorMap = {};

      books.forEach((book) => {
        const date = new Date(book.updated_at || book.created_at);
        monthly[date.getMonth()] += 1;
        const genre = book.category?.name || "Uncategorized";
        genreMap[genre] = (genreMap[genre] || 0) + 1;
        pageSum += book.pages || 0;
        if (typeof book.rating === "number") {
          ratingSum += book.rating;
          ratingCount++;
        }
        if (book.author) authorMap[book.author] = (authorMap[book.author] || 0) + 1;
      });

      const booksPerMonth = monthly.map((val, idx) => ({
        month: new Date(0, idx).toLocaleString("en", { month: "short" }),
        count: val,
      }));

      const genreStats = Object.entries(genreMap).map(([name, value]) => ({ name, value }));
      const avgPages = (pageSum / books.length || 0).toFixed(0);
      const avgRating = (ratingCount > 0 ? ratingSum / ratingCount : 0).toFixed(1);
      const topAuthor = Object.entries(authorMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

      return { goal, progress, booksPerMonth, genreStats, avgPages, avgRating, topAuthor };
    },
  });

  const createGoalMutation = useMutation({
    mutationFn: async (goal) => {
      return axios.post(`http://127.0.0.1:8000/api/reading-goal/`, { year, goal }, { headers });
    },
    onSuccess: () => {
      refetch();
      setEditingGoal(false);
      setGoalValue("");
    },
    onError: (err) => console.error("❌ Error saving goal", err),
  });

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(goalValue);
    if (!parsed || parsed <= 0) return;
    createGoalMutation.mutate(parsed);
  };

  if (isLoading) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>⏳ Loading statistics...</Typography>;
  }

  const { goal, progress, booksPerMonth, genreStats, avgPages, avgRating, topAuthor } = statsData;

  return (
    <Box sx={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh", width: "100vw", py: 6, position: "absolute", overflowX: "hidden",
    }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: 4, borderRadius: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          Back to Home
        </Button>

        <Box sx={{
          background: "linear-gradient(to right, #5e60ce, #5390d9)",
          color: "white", borderRadius: 3, p: 3, mb: 4, display: "flex", alignItems: "center", gap: 2,
        }}>
          <Box sx={{
            bgcolor: "white", borderRadius: "50%", width: 56, height: 56,
            display: "flex", alignItems: "center", justifyContent: "center", color: "#1976d2"
          }}>
            <EmojiEventsIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
              📊 Reading Dashboard
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              Your personal reading statistics and insights
            </Typography>
          </Box>
        </Box>

        {/* Goal section */}
        <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <SectionHeader icon={<EmojiEventsIcon />} title="Reading Goal" />
            {goal && !editingGoal ? (
              <>
                <Typography>Goal: {goal} books</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(progress / goal) * 100}
                  sx={{ my: 2, height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" mb={2}>
                  {progress} of {goal} books read ({Math.round((progress / goal) * 100)}%)
                </Typography>
                <Button variant="outlined" size="small" onClick={() => setEditingGoal(true)}>
                  Edit Goal
                </Button>
              </>
            ) : (
              <Box component="form" onSubmit={handleGoalSubmit} sx={{ display: "flex", gap: 2, mt: 1 }}>
                <TextField
                  type="number"
                  label="Enter your goal"
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  size="small"
                  required
                />
                <Button variant="contained" type="submit">
                  {goal ? "Update" : "Set Goal"}
                </Button>
                {goal && (
                  <Button variant="text" onClick={() => setEditingGoal(false)}>
                    Cancel
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Charts */}
        <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <SectionHeader icon={<CalendarMonthIcon />} title="Books per Month" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={booksPerMonth}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [`${value} books`, "Read"]} />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <SectionHeader icon={<CategoryIcon />} title="Favorite Genres" />
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={genreStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" cy="50%" outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`} labelLine={false}
                >
                  {genreStats.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary */}
        <Grid container spacing={3}>
          {[
            { label: "Avg. Pages", value: avgPages, icon: <MenuBookIcon color="primary" />, color: "#e3f2fd" },
            { label: "Avg. Rating", value: avgRating, icon: <StarIcon sx={{ color: "#f9a825" }} />, color: "#fff3e0" },
            { label: "Top Author", value: topAuthor, icon: <PersonIcon sx={{ color: "#673ab7" }} />, color: "#ede7f6" }
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper sx={{
                p: 3, borderRadius: 4, boxShadow: 3,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 1, textAlign: "center"
              }}>
                <Box sx={{
                  bgcolor: item.color, p: 1.5, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {item.icon}
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistics;
