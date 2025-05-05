import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../css/Navbar.css";

function NavBar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isDarkMode ? "dark" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">MovieApp</span>
          </Link>
        </div>

        <div className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaHeart className="nav-icon" />
            <span>Favorites</span>
          </Link>
          <Link 
            to="/search" 
            className={`nav-link ${isActive("/search") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaSearch className="nav-icon" />
            <span>Search</span>
          </Link>
        </div>

        <div className="navbar-actions">
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
