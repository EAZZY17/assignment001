import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      title: 'Email',
      details: 'edwinmakolo5@gmail.com',
      description: 'Send me an email anytime',
      icon: 'fas fa-envelope',
      link: 'mailto:edwinmakolo5@gmail.com'
    },
    {
      title: 'Phone',
      details: '+1 (647) 803-1720',
      description: 'Mon-Fri from 9am to 5pm',
      icon: 'fas fa-phone',
      link: 'tel:+16478031720'
    },
    {
      title: 'Location',
      details: 'Toronto, Canada',
      description: 'Available for remote work',
      icon: 'fas fa-map-marker-alt',
      link: null
    }
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Open to co-op opportunities and connecting with recruiters</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <p>Reach out via email or LinkedIn—I'd love to connect and discuss opportunities.</p>

            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="contact-info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="contact-info-details">
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="contact-detail-link">{info.details}</a>
                    ) : (
                      <p className="contact-detail">{info.details}</p>
                    )}
                    <p className="contact-description">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h3>Connect With Me</h3>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/edwin-makolo-2175902a3/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/EAZZY17" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>

            <div className="contact-cta-buttons">
              <a href="mailto:edwinmakolo5@gmail.com" className="btn btn-primary btn-large">
                <i className="fas fa-envelope"></i>
                Email Me
              </a>
              <a href="/EDWIN_MAKOLO_RESUME.pdf" className="btn btn-secondary btn-large" download>
                <i className="fas fa-download"></i>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Let's Connect</h2>
            <p>Interested in my work? Check out my projects and services.</p>
            <div className="cta-buttons">
              <Link to="/projects" className="btn btn-secondary">
                <i className="fas fa-eye"></i>
                View My Work
              </Link>
              <Link to="/services" className="btn btn-primary">
                <i className="fas fa-cogs"></i>
                See My Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
