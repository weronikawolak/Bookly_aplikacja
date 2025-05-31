import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import bgImage from "../assets/books.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token && response.data.user_id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user_id);
        navigate(`/home/${response.data.user_id}`);
      } else {
        setError("Login failed. No token received.");
      }
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
          }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: 8,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box
              sx={{
                bgcolor: "#ede7f6",
                borderRadius: "50%",
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockOpenIcon fontSize="large" sx={{ color: "#673ab7" }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" sx={{ color: "#673ab7" }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Log in to access your library dashboard
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleLogin}
            mt={4}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: -1 }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "#673ab7",
                "&:hover": {
                  backgroundColor: "#5e35b1",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
