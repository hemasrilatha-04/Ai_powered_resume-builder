import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <h2>AI Resume Builder</h2>
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link
            to="/"
            className={isActiveLink('/')}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/templates"
            className={isActiveLink('/templates')}
            onClick={() => setIsMenuOpen(false)}
          >
            Templates
          </Link>
          <Link 
            to="/examples" 
            className={isActiveLink('/examples')}
            onClick={() => setIsMenuOpen(false)}
          >
            Examples
          </Link>
          <Link 
            to="/pricing" 
            className={isActiveLink('/pricing')}
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          
          {currentUser ? (
            <div className="user-menu">
              <Link 
                to="/dashboard" 
                className={isActiveLink('/dashboard')}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link 
                to="/login" 
                className="btn btn-outline"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/login?tab=register" 
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;