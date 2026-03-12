import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-backdrop">
        <div className="welcome-gradient"></div>
        <div className="welcome-grid"></div>
      </div>
      <div className="welcome-content">
        <p className="welcome-greeting">Welcome to</p>
        <h1 className="welcome-title">Edwin Makolo's</h1>
        <h2 className="welcome-subtitle">Portfolio</h2>
        <p className="welcome-tagline">Software Engineering Student | AI & Web Development</p>
        <Link to="/home" className="welcome-cta">
          <span>Open Portfolio</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
      <div className="welcome-scroll-hint">
        <span>Enter</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default Welcome;
