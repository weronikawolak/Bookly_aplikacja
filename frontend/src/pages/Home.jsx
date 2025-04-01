import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import openBook from "../assets/reading.png";
import statsIcon from "../assets/statictics.png";
import listIcon from "../assets/lists.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">My library</h1>

      <div className="card-grid">
        <div className="card" onClick={() => navigate("/reading")}>
          <img src={openBook} alt="Currently reading" className="card-icon" />
          <h2 className="card-title">Currently reading</h2>
          <p className="card-desc">
            Keep track of the books you're currently reading and monitor your progress.
          </p>
        </div>

        <div className="card" onClick={() => navigate("/statistics")}>
          <img src={statsIcon} alt="Statistics" className="card-icon" />
          <h2 className="card-title">Statistics</h2>
          <p className="card-desc">
            View your reading statistics, favorite genres, and the number of books you've completed.
          </p>
        </div>

        {/* Box 3 - Book lists */}
        <div className="card" onClick={() => navigate("/books")}>
            <img src={listIcon} alt="Book lists" className="card-icon" />
            <h2 className="card-title">Book lists</h2>
            <p className="card-desc">
                Browse and manage your book lists, including those you want to read or have already finished.
            </p>
            </div>


      </div>

      <div className="logout">
        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
