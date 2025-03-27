import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Footer from '../Footer/Footer';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const handleLogoff = () => {
    localStorage.removeItem('token'); // ✅ Remove JWT
    navigate('/'); // ✅ Redirect to Home
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <div>
    <nav className={`navbar ${menuActive ? 'active' : ''}`}>
      <Link to="/" className="nav-logo">TravelMate</Link>
      
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/profile">Profile</Link>
            <button className="logoff-btn" onClick={handleLogoff}>Logoff</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      
    </nav>

    </div>
  );
};

export default NavBar;
