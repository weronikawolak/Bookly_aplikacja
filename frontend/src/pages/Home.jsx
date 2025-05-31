import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Typography } from "@mui/material"; 

import bgImage from "../assets/books.png";

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
    <div
      style={{

          position: "fixed", // DODANE
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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(6px)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Header */}


      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#5e60ce",
            fontSize: "2rem",
            fontFamily: '"Roboto", sans-serif',
            textAlign: "center",
            mb: 1,
          }}
        >
          Welcome to Your Library
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#555", fontFamily: '"Roboto", sans-serif' }}
        >
          Select a section to manage your reading journey
        </Typography>
      </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Card
            title="Currently Reading"
            description="Keep track of the books you're currently reading and monitor your progress."
            icon={<MenuBookIcon style={iconStyle} />}
            onClick={() => navigate(`/currently-reading/${userData?.id}`)}
          />
          <Card
            title="Statistics"
            description="View your reading stats, favorite genres and progress for this year."
            icon={<BarChartIcon style={iconStyle} />}
            onClick={() => navigate(`/statistics/${userData?.id}`)}
          />
          <Card
            title="Book Lists"
            description="Browse and manage your to-read, reading and completed lists."
            icon={<LibraryBooksIcon style={iconStyle} />}
            onClick={() => navigate("/books")}
          />
        </div>

        {/* Logout */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#5e60ce",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// 🧩 Card Component
const Card = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: "pointer",
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "2rem",
      width: "300px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      textAlign: "center",
      transition: "transform 0.2s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <div>{icon}</div>
    <h2 style={cardTitle}>{title}</h2>
    <p style={cardDesc}>{description}</p>
  </div>
);

// 🎨 Styles
const iconStyle = {
  fontSize: "42px",
  color: "#5e60ce",
  marginBottom: "0.75rem",
};

const cardTitle = {
  fontSize: "1.3rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#333",
  fontFamily: '"Roboto", sans-serif',
};

const cardDesc = {
  fontSize: "1rem",
  color: "#555",
  fontFamily: '"Roboto", sans-serif',
};

export default Home;







// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// import bgImage from "../assets/books.png";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:8000/api/user/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setUserData(res.data);
//       } catch (error) {
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [navigate, token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         padding: "3rem 2rem",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           backgroundColor: "rgba(255, 255, 255, 0.8)",
//           backdropFilter: "blur(6px)",
//           borderRadius: "24px",
//           padding: "2.5rem",
//           boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
//         }}
//       >
//         {/* Nagłówek jak w Statistics */}
//         <div
//           style={{
//             background: "linear-gradient(to right, #1976d2, #42a5f5)",
//             color: "white",
//             borderRadius: "16px",
//             padding: "1.5rem 2rem",
//             marginBottom: "2.5rem",
//             display: "flex",
//             alignItems: "center",
//             gap: "1.2rem",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               color: "#1976d2",
//               borderRadius: "50%",
//               width: 56,
//               height: 56,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//             }}
//           >
//             <EmojiEventsIcon fontSize="large" />
//           </div>
//           <div>
//             <h1 style={{ fontSize: "1.8rem", fontWeight: "700", margin: 0 }}>
//               Welcome to Your Library
//             </h1>
//             <p style={{ fontSize: "0.95rem", margin: 0, opacity: 0.9 }}>
//               Select a section to manage your reading journey
//             </p>
//           </div>
//         </div>

//         {/* Siatka kart */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             gap: "2rem",
//           }}
//         >
//           <Card
//             title="Currently Reading"
//             description="Keep track of the books you're currently reading and monitor your progress."
//             icon={<MenuBookIcon style={iconStyle} />}
//             onClick={() => navigate(`/currently-reading/${userData?.id}`)}
//           />
//           <Card
//             title="Statistics"
//             description="View your reading stats, favorite genres and progress for this year."
//             icon={<BarChartIcon style={iconStyle} />}
//             onClick={() => navigate(`/statistics/${userData?.id}`)}
//           />
//           <Card
//             title="Book Lists"
//             description="Browse and manage your to-read, reading and completed lists."
//             icon={<LibraryBooksIcon style={iconStyle} />}
//             onClick={() => navigate("/books")}
//           />
//         </div>

//         {/* Logout */}
//         <div style={{ marginTop: "3rem", textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "0.6rem 1.5rem",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#5e60ce",
//               color: "white",
//               cursor: "pointer",
//               fontSize: "1rem",
//               fontWeight: "600",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Komponent karty
// const Card = ({ title, description, icon, onClick }) => (
//   <div
//     onClick={onClick}
//     style={{
//       cursor: "pointer",
//       backgroundColor: "#fff",
//       borderRadius: "20px",
//       padding: "2rem",
//       width: "300px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//       textAlign: "center",
//       transition: "transform 0.2s ease",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//     onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//   >
//     <div>{icon}</div>
//     <h2 style={cardTitle}>{title}</h2>
//     <p style={cardDesc}>{description}</p>
//   </div>
// );

// // Ikony i tekst
// const iconStyle = {
//   fontSize: "42px",
//   color: "#5e60ce",
//   marginBottom: "0.75rem",
// };

// const cardTitle = {
//   fontSize: "1.3rem",
//   fontWeight: "600",
//   marginBottom: "0.5rem",
//   color: "#333",
//   fontFamily: '"Roboto", sans-serif',
// };

// const cardDesc = {
//   fontSize: "1rem",
//   color: "#555",
//   fontFamily: '"Roboto", sans-serif',
// };

// export default Home;



