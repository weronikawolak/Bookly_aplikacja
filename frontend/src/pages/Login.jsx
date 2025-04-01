import "../styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

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
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome back to your reading world</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Login</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Value"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Value"
          />
          <button type="submit">Login</button>
        </form>
        <p className="forgot">Forgot password?</p>
      </div>
    </div>
  );
};

export default Login;
