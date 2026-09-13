import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(formState.subject || 'Portfolio inquiry');
    const body = encodeURIComponent(
      `${formState.message}\n\n— ${formState.name}\n${formState.email}`
    );
    window.location.href = `mailto:edwinmakolo5@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow-center on-dark">Contact</span>
          <h1>Get In Touch</h1>
          <p>Open to co-op opportunities and connecting with recruiters</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p>Reach out via email or LinkedIn—I&apos;d love to connect and discuss opportunities.</p>

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
            </div>

            <div className="contact-form-section">
              <h2>Send a Message</h2>
              <p>Fill out the form and I&apos;ll get back to you as soon as I can.</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can I help?"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell me about the role or project..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-large">
                  Send Message
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Let&apos;s Connect</h2>
            <p>Interested in my work? Check out my projects and services.</p>
            <div className="cta-buttons">
              <Link to="/projects" className="btn btn-secondary">
                View My Work
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/services" className="btn btn-primary">
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
