// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import openBook from "../assets/reading.png";
// import statsIcon from "../assets/statictics.png";
// import listIcon from "../assets/lists.png";
// import "./Home.css";

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
//     <div className="home-container">
//       <h1 className="home-title">My library</h1>

//       <div className="card-grid">
//         <div className="card" onClick={() => navigate((`/currently-reading/${userData.id}`))}>
//           <img src={openBook} alt="Currently reading" className="card-icon" />
//           <h2 className="card-title">Currently reading</h2>
//           <p className="card-desc">
//             Keep track of the books you're currently reading and monitor your progress.
//           </p>
//         </div>

//           <div
//             className="card"
//             onClick={() => userData && navigate(`/statistics/${userData.id}`)}
//           >
//           <img src={statsIcon} alt="Statistics" className="card-icon" />
//           <h2 className="card-title">Statistics</h2>
//           <p className="card-desc">
//             View your reading statistics, favorite genres, and the number of books you've completed.
//           </p>
//         </div>

//         {/* Box 3 - Book lists */}
//         <div className="card" onClick={() => navigate("/books")}>
//             <img src={listIcon} alt="Book lists" className="card-icon" />
//             <h2 className="card-title">Book lists</h2>
//             <p className="card-desc">
//                 Browse and manage your book lists, including those you want to read or have already finished.
//             </p>
//             </div>


//       </div>

//       <div className="logout">
//         <button
//           onClick={handleLogout}
//           className="logout-btn"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // 📚 Material UI Icons
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// import bgImage from "../assets/books.png"; // tło

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
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "2rem",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.8)",
//           backdropFilter: "blur(6px)",
//           borderRadius: "20px",
//           padding: "3rem",
//           maxWidth: "900px",
//           width: "100%",
//           boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
//           textAlign: "center",
//         }}
//       >
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <h1
//             style={{
//               fontSize: "2.5rem",
//               fontWeight: 700,
//               color: "#5e60ce",
//               marginBottom: "0.5rem",
//             }}
//           >
//             Welcome to Your Library
//           </h1>
//           <p style={{ fontSize: "1rem", color: "#444" }}>
//             Choose where you'd like to go today.
//           </p>
//         </div>

//         <div style={{ display: "grid", gap: "1.5rem" }}>
//           <div style={cardStyle} onClick={() => navigate(`/currently-reading/${userData?.id}`)}>
//             <MenuBookIcon style={iconStyle} />
//             <h2 style={cardTitle}>Currently Reading</h2>
//             <p style={cardDesc}>
//               Keep track of the books you're currently reading and monitor your progress.
//             </p>
//           </div>

//           <div style={cardStyle} onClick={() => userData && navigate(`/statistics/${userData.id}`)}>
//             <BarChartIcon style={iconStyle} />
//             <h2 style={cardTitle}>Statistics</h2>
//             <p style={cardDesc}>
//               View your reading statistics, favorite genres, and the number of books you've completed.
//             </p>
//           </div>

//           <div style={cardStyle} onClick={() => navigate("/books")}>
//             <LibraryBooksIcon style={iconStyle} />
//             <h2 style={cardTitle}>Book Lists</h2>
//             <p style={cardDesc}>
//               Browse and manage your book lists, including those you want to read or have already finished.
//             </p>
//           </div>
//         </div>

//         <div style={{ marginTop: "2rem" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "0.6rem 1.5rem",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#5e60ce",
//               color: "white",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🎨 Styl karty
// const cardStyle = {
//   cursor: "pointer",
//   backgroundColor: "white",
//   padding: "1.5rem",
//   borderRadius: "16px",
//   boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//   transition: "transform 0.2s ease",
//   textAlign: "center",
// };

// // 🖼️ Styl ikon
// const iconStyle = {
//   fontSize: "40px",
//   color: "#5e60ce",
//   marginBottom: "0.75rem",
// };

// // 🖋️ Styl tytułu
// const cardTitle = {
//   fontSize: "1.25rem",
//   fontWeight: "600",
//   marginBottom: "0.5rem",
// };

// // 📄 Styl opisu
// const cardDesc = {
//   fontSize: "0.95rem",
//   color: "#555",
// };

// export default Home;







// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Paper,
// } from "@mui/material";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

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
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         py: 6,
//         px: 2,
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           borderRadius: 4,
//           px: 4,
//           py: 5,
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" textAlign="center" color="#1976d2" mb={1}>
//           Welcome to Your Library
//         </Typography>
//         <Typography textAlign="center" color="text.secondary" mb={4}>
//           Select a section to manage your reading journey
//         </Typography>

//         <Grid container spacing={3} justifyContent="center" alignItems="stretch">
//           <Grid item xs={12} sm={6} md={4}>
//             <FeatureCard
//               title="Currently Reading"
//               description="Keep track of the books you're currently reading and monitor your progress."
//               icon={<MenuBookIcon sx={iconStyle} />}
//               onClick={() => navigate(`/currently-reading/${userData?.id}`)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <FeatureCard
//               title="Statistics"
//               description="View your reading stats, favorite genres and progress for this year."
//               icon={<BarChartIcon sx={iconStyle} />}
//               onClick={() => navigate(`/statistics/${userData?.id}`)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <FeatureCard
//               title="Book Lists"
//               description="Browse and manage your to-read, reading and completed lists."
//               icon={<LibraryBooksIcon sx={iconStyle} />}
//               onClick={() => navigate("/books")}
//             />
//           </Grid>
//         </Grid>

//         <Box mt={5} textAlign="center">
//           <Button
//             onClick={handleLogout}
//             variant="contained"
//             size="medium"
//             sx={{ backgroundColor: "#5e60ce", textTransform: "uppercase", fontWeight: "bold" }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const FeatureCard = ({ title, description, icon, onClick }) => (
//   <Paper
//     onClick={onClick}
//     elevation={3}
//     sx={{
//       p: 3,
//       borderRadius: 3,
//       height: "100%",
//       textAlign: "center",
//       transition: "transform 0.2s ease",
//       cursor: "pointer",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//       '&:hover': {
//         transform: "translateY(-4px)",
//         boxShadow: 6,
//       },
//     }}
//   >
//     <Box>{icon}</Box>
//     <Typography variant="h6" fontWeight={600} mt={1}>
//       {title}
//     </Typography>
//     <Typography variant="body2" color="text.secondary" mt={1}>
//       {description}
//     </Typography>
//   </Paper>
// );

// const iconStyle = {
//   fontSize: 40,
//   color: "#5e60ce",
// };

// export default Home;








import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 📚 MUI icons
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Typography } from "@mui/material"; // dodaj na górze

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
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "3rem 2rem",
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



