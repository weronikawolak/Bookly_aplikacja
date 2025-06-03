import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import bgImage from "../assets/books.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Zapobiega przewijaniu
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/register/", {
        username,
        email,
        password,
      });

      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setError(error.response?.data?.error || "Error registering user");
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
          backgroundColor: "rgba(255, 255, 255, 0.92)",
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
              <PersonAddIcon fontSize="large" sx={{ color: "#673ab7" }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" sx={{ color: "#673ab7" }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Sign up to start your reading journey
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleRegister}
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
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                backgroundColor: "#673ab7",
                "&:hover": {
                  backgroundColor: "#5e35b1",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
