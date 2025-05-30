// import "../styles.css";
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; 

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/login/",
//         { username, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.data.token && response.data.user_id) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("userId", response.data.user_id);
//         navigate(`/home/${response.data.user_id}`);
//       } else {
//         setError("Login failed. No token received.");
//       }
//     } catch (error) {
//       setError("Invalid username or password.");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2>Welcome back to your reading world</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <label>Login</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             placeholder="Value"
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Value"
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="forgot">Forgot password?</p>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 3,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: 6,
          backdropFilter: "blur(8px)",
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box
              sx={{
                bgcolor: "#e8eaf6",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockOpenIcon fontSize="large" sx={{ color: "#3f51b5" }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" color="primary">
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Login to access your library dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleLogin} mt={3} display="flex" flexDirection="column" gap={2}>
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
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button variant="contained" type="submit" fullWidth sx={{ mt: 1 }}>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
