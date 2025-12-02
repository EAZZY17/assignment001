import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isAuthDropdownOpen && !event.target.closest('.auth-dropdown-container')) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
  };

  const closeAuthDropdown = () => {
    setIsAuthDropdownOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
    closeMenu();
    closeAuthDropdown();
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Logo size="small" />
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <a
              href="/EDWIN_MAKOLO_RESUME.pdf"
              download
              className={`nav-link`}
              onClick={closeMenu}
            >
              Resume
            </a>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <div className="user-display">
                  <div className="user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="user-name">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
              </li>
              <li className="nav-item">
                <button
                  className="nav-button nav-button-signout"
                  onClick={handleSignOut}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item auth-dropdown-container">
              <button
                className="nav-button nav-button-account"
                onClick={toggleAuthDropdown}
                aria-expanded={isAuthDropdownOpen}
                aria-haspopup="true"
              >
                <i className="fas fa-user-circle"></i>
                Account
                <i className={`fas fa-chevron-${isAuthDropdownOpen ? 'up' : 'down'} dropdown-arrow`}></i>
              </button>
              {isAuthDropdownOpen && (
                <div className="auth-dropdown">
                  <Link
                    to="/signin"
                    className="auth-dropdown-item"
                    onClick={() => {
                      closeMenu();
                      closeAuthDropdown();
                    }}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="auth-dropdown-item"
                    onClick={() => {
                      closeMenu();
                      closeAuthDropdown();
                    }}
                  >
                    <i className="fas fa-user-plus"></i>
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          )}
        </ul>

        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
