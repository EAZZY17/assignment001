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
            <h1 className="hero-title">
              Hi, I&apos;m <span className="hero-name">Edwin</span>
            </h1>
            <p className="hero-subtitle">I build reliable, scalable software — front end to back end.</p>
            <p className="hero-description">
              Software Engineering Technology student specializing in AI. I ship full-stack apps
              with React, Node.js, and MongoDB — focused on clean code, scalable systems, and
              continuous learning.
            </p>

            <div className="mission-statement">
              <h2>What Drives Me</h2>
              <p>
                "I like understanding how things work end to end — from the interface someone 
                actually touches, down to the backend logic and data that make it function. 
                I'm still early in my career, and I'm using every project and hackathon as a 
                chance to get better at building things that hold up in the real world."
              </p>
            </div>

            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
                <i className="fas fa-arrow-right"></i>
              </Link>
              <a href="/EDWIN_MAKOLO_RESUME.pdf" className="btn btn-secondary" download>
                <i className="fas fa-download"></i>
                Download Resume
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="code-snippet-card" aria-hidden="true">
              <div className="code-snippet-chrome">
                <span className="code-dot"></span>
                <span className="code-dot"></span>
                <span className="code-dot"></span>
                <span className="code-filename">edwin.js</span>
              </div>
              <pre className="code-snippet">
                <code>
                  <span className="code-kw">const</span> <span className="code-id">engineer</span> <span className="code-op">=</span> {'{'}
                  {'\n'}{'  '}<span className="code-key">name</span>: <span className="code-str">&apos;Edwin Makolo&apos;</span>,
                  {'\n'}{'  '}<span className="code-key">role</span>: <span className="code-str">&apos;Software Engineer&apos;</span>,
                  {'\n'}{'  '}<span className="code-key">location</span>: <span className="code-str">&apos;Toronto&apos;</span>,
                  {'\n'}{'  '}<span className="code-key">skills</span>: [
                  {'\n'}{'    '}<span className="code-str">&apos;React&apos;</span>, <span className="code-str">&apos;Node.js&apos;</span>, <span className="code-str">&apos;MongoDB&apos;</span>,
                  {'\n'}{'    '}<span className="code-str">&apos;Express&apos;</span>, <span className="code-str">&apos;AI / LLMs&apos;</span>
                  {'\n'}{'  '}],
                  {'\n'}{'  '}<span className="code-key">available</span>: <span className="code-bool">true</span>
                  {'\n'}{'}'}{';'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>2+</h3>
              <p>Years Coding</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>5+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>3rd Year</h3>
              <p>Co-op Student</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <span className="eyebrow eyebrow-center on-dark">Let&apos;s connect</span>
            <h2>Ready to start your next project?</h2>
            <p>Open to co-op roles, freelance work, and building with a team.</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Get In Touch
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
