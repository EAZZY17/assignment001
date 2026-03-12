import React, { useState } from 'react';
import { contactsAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const contactData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim()
      };

      await contactsAPI.create(contactData);
      setSubmitSuccess(true);
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (err) {
      console.error('❌ Error submitting contact form:', err);
      let errorMessage = 'Failed to submit contact form. Please try again.';
      
      // Handle specific error cases
      if (err.message) {
        if (err.message.includes('unique') || err.message.includes('duplicate')) {
          errorMessage = 'This email address has already been submitted. Please use a different email.';
        } else if (err.message.includes('network') || err.message.includes('fetch') || err.message.includes('Cannot connect')) {
          errorMessage = 'Cannot connect to the server. Please make sure the backend API is deployed and accessible.';
        } else if (err.message.includes('not found') || err.message.includes('endpoint not found')) {
          errorMessage = 'The contact form API is not available. Please contact the site administrator.';
        } else if (err.message.includes('backend') || err.message.includes('API')) {
          errorMessage = err.message;
        } else {
          errorMessage = err.message;
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: 'Email',
      details: 'edwinmakolo5@gmail.com',
      description: 'Send me an email anytime',
      icon: 'fas fa-envelope'
    },
    {
      title: 'Phone',
      details: '+1 (647) 803-1720',
      description: 'Mon-Fri from 9am to 5pm',
      icon: 'fas fa-phone'
    },
    {
      title: 'Location',
      details: 'Toronto, Canada',
      description: 'Available for remote work',
      icon: 'fas fa-map-marker-alt'
    },
    {
      title: 'Response Time',
      details: '< 24 hours',
      description: 'I typically respond within 24 hours',
      icon: 'fas fa-clock'
    }
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Let's discuss your next project</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p>Feel free to reach out through any of these channels. I'm always excited to discuss new opportunities and interesting projects.</p>

              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-card">
                    <div className="contact-info-icon">
                      <i className={info.icon}></i>
                    </div>
                    <div className="contact-info-details">
                      <h3>{info.title}</h3>
                      <p className="contact-detail">{info.details}</p>
                      <p className="contact-description">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links">
                <h3>Follow Me</h3>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/in/edwin-makolo-2175902a3/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/edwin-rodriguez" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://twitter.com/edwin_dev" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com/edwin_dev" target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="contact-form-header">
                <div>
                  <h2>Send Me a Message</h2>
                  <p>Fill out the form below and I'll get back to you as soon as possible. You can also email me directly at edwinmakolo5@gmail.com</p>
                </div>
              </div>

              {submitSuccess && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your message! Your contact information has been saved. I'll get back to you soon.</p>
                </div>
              )}

              {submitError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Your first name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Your last name"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows="5"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's create something amazing together. I'm always excited to work on new challenges and innovative solutions.</p>
            <div className="cta-buttons">
              <a href="/projects" className="btn btn-secondary">
                <i className="fas fa-eye"></i>
                View My Work
              </a>
              <a href="/services" className="btn btn-primary">
                <i className="fas fa-cogs"></i>
                See My Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
