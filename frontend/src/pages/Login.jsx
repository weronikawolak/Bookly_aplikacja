import "../styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

            console.log("Server response:", response.data);

            if (response.data.token && response.data.user_id) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user_id);

                console.log("Token zapisany:", localStorage.getItem("token"));

                navigate(`/home/${response.data.user_id}`);
            } else {
                setError("Błąd logowania. Brak tokena.");
            }
        } catch (error) {
            setError("Invalid username or password");
            console.error("Login error:", error.response?.data);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
