import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/signin'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">My AirBnb</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>

        {/* Show Host Dashboard link only for users with the "Host" role */}

        {isLoggedIn && userRole === 'Host' && (<>
        
          <li><Link to="/hostdashboard">Host Dashboard</Link></li>
          <li><Link to="/host/bookings">View Your Bookings</Link></li>
          </>
        )}

        {isLoggedIn && userRole === 'Guest' && (
          <li><Link to="/bookinglist">booking list</Link></li>
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
