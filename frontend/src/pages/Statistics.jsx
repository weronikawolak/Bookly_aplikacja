import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import {
  buildCategoryMap,
  calculateGenreStats,
  calculateMonthlyStats,
  calculateAverages
} from "../helpers/statistics";

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
  const [goalValue, setGoalValue] = useState("");
  const [editingGoal, setEditingGoal] = useState(false);

  const headers = { Authorization: `Token ${token}` };
  const year = new Date().getFullYear();

  const {
    data: statsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const [goalRes, booksRes, categoriesRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/v1/reading-goal/progress/?year=${year}`, { headers }),
        axios.get(`http://127.0.0.1:8000/api/v1/books/`, { headers }),
        axios.get(`http://127.0.0.1:8000/api/v1/categories/`, { headers }),
      ]);

      const goal = goalRes.data.goal;
      const progress = goalRes.data.completed;

      const allBooks = Array.isArray(booksRes.data) ? booksRes.data : booksRes.data.results || [];
      const completedBooks = allBooks.filter((b) => b.status === "completed");

      const categoryMap = buildCategoryMap(categoriesRes.data);
      const genreStats = calculateGenreStats(allBooks, categoryMap);
      const booksPerMonth = calculateMonthlyStats(completedBooks);
      const { avgPages, avgRating, topAuthor } = calculateAverages(completedBooks);

      return { goal, progress, booksPerMonth, genreStats, avgPages, avgRating, topAuthor };
    },
  });

  const createGoalMutation = useMutation({
    mutationFn: async (goal) => {
      return axios.post(`http://127.0.0.1:8000/api/v1/reading-goal/`, { year, goal }, { headers });
    },
    onSuccess: () => {
      refetch();
      setEditingGoal(false);
      setGoalValue("");
    },
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

  if (isError || !statsData) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center", color: "error.main" }}>
        ❌ Failed to load statistics: {error?.message || "No data received"}
      </Typography>
    );
  }

  const {
    goal = 0,
    progress = 0,
    booksPerMonth = [],
    genreStats = [],
    avgPages = 0,
    avgRating = 0,
    topAuthor = "-"
  } = statsData;

  return (
    <Box sx={{
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
    }}>
  <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
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
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
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
          {[{
            label: "Avg. Pages", value: avgPages, icon: <MenuBookIcon color="primary" />, color: "#e3f2fd"
          }, {
            label: "Avg. Rating", value: avgRating, icon: <StarIcon sx={{ color: "#f9a825" }} />, color: "#fff3e0"
          }, {
            label: "Top Author", value: topAuthor, icon: <PersonIcon sx={{ color: "#673ab7" }} />, color: "#ede7f6"
          }].map((item, idx) => (
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
