import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Edwin's Portfolio</h1>
            <p className="hero-subtitle">Full Beginner Backend & Frontend Web Developer </p>
            <p className="hero-description">
              I create exceptional digital experiences through innovative web development, 
              combining cutting-edge technology with creative design to bring your vision to life.
            </p>
            
            <div className="mission-statement">
              <h2>Mission Statement</h2>
              <p>
                "To deliver high-quality, scalable web solutions that not only meet client 
                requirements but exceed expectations, while continuously learning and adapting 
                to emerging technologies in the ever-evolving digital landscape."
              </p>
            </div>

            <div className="hero-buttons">
              <Link to="/about" className="btn btn-primary">
                <i className="fas fa-user"></i>
                Learn About Me
              </Link>
              <Link to="/projects" className="btn btn-secondary">
                <i className="fas fa-code"></i>
                View My Projects
              </Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="floating-icons">
                <i className="fas fa-code icon-1"></i>
                <i className="fas fa-palette icon-2"></i>
                <i className="fas fa-rocket icon-3"></i>
                <i className="fas fa-mobile-alt icon-4"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>5+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>1+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Next Project?</h2>
            <p>Let's work together to create something amazing</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              <i className="fas fa-envelope"></i>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
