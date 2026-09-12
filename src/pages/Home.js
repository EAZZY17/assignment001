import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="eyebrow on-dark">Software Engineer · AI &amp; Web</span>
            <h1 className="hero-title">Edwin Makolo</h1>
            <p className="hero-subtitle">Building reliable, scalable software from front end to back end</p>
            <p className="hero-description">
              A motivated Software Engineering Technology student specializing in AI, with a strong foundation in full-stack web development. 
              I build modern applications using React, Node.js, and MongoDB—focused on clean code, scalable solutions, and continuous learning.
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
            <div className="hero-card">
              <div className="hero-card-top">
                <div className="hero-monogram">EM</div>
                <div>
                  <p className="hero-card-name">Edwin Makolo</p>
                  <p className="hero-card-role">Software Engineer</p>
                </div>
                <span className="hero-card-status">
                  <span className="status-dot"></span>
                  Available
                </span>
              </div>
              <div className="hero-card-divider"></div>
              <ul className="hero-card-facts">
                <li>
                  <i className="fas fa-location-dot"></i>
                  <span>Toronto, Canada</span>
                </li>
                <li>
                  <i className="fas fa-graduation-cap"></i>
                  <span>Software Engineering &amp; AI — Centennial College</span>
                </li>
                <li>
                  <i className="fas fa-trophy"></i>
                  <span>1st Place — Design Hackathon</span>
                </li>
              </ul>
              <div className="hero-card-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>AI / LLMs</span>
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
                <i className="fas fa-trophy"></i>
              </div>
              <h3>1st</h3>
              <p>Place Hackathon Winner</p>
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
            <span className="eyebrow eyebrow-center on-dark">Let's connect</span>
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
