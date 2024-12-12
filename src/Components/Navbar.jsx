import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../Styles/navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/signin");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">AirBnb</div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search-listings">Search</Link></li>

        {isLoggedIn && userRole === "Host" && (
          <>
            <li><Link to="/hostdashboard">Host Dashboard</Link></li>
            <li><Link to="/host/bookings">View Your Bookings</Link></li>
          </>
        )}

        {isLoggedIn && userRole === "Guest" && (
          <li><Link to="/bookinglist">Booking List</Link></li>
        )}

        {isLoggedIn ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
