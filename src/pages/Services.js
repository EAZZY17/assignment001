import React, { useState } from 'react';
import './Services.css';

const Services = () => {

  // Default services
  const defaultServices = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom website development using modern technologies like React, Node.js and JavaScript. From simple landing pages to complex web applications.',
      icon: 'fas fa-code',
      features: [
        'Responsive Design',
        'Custom Web Applications',
        'E-commerce Solutions',
        'CMS Integration',
        'API Development',
        'Performance Optimization'
      ],
      pricing: 'Starting at $100'
    },
    {
      id: 2,
      title: 'Full Stack Development',
      description: 'Complete end-to-end development solutions including frontend, backend, database design, and deployment.',
      icon: 'fas fa-server',
      features: [
        'Frontend Development',
        'Backend Development',
        'Database Design',
        'Cloud Deployment',
        'DevOps Setup',
        'Technical Consulting'
      ],
      pricing: 'Starting at $300'
    },
    
    {
      id: 3,
      title: 'Technical Consulting',
      description: 'Technical advice and guidance for technology decisions in web development strategy.',
      icon: 'fas fa-lightbulb',
      features: [
        'Technology Assessment',
        'Code Reviews',
        'Performance Audits',
        'Security Analysis',
      ],
      pricing: '$50/hour'
    }
  ];

  const services = defaultServices;

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We start by understanding your requirements, goals, and target audience to create a comprehensive project plan.',
      icon: 'fas fa-search'
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      description: 'Creating wireframes, mockups, and interactive prototypes to visualize the final product before development.',
      icon: 'fas fa-pencil-ruler'
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Building the solution with clean, maintainable code while continuously testing for quality and performance.',
      icon: 'fas fa-code'
    },
    {
      step: 4,
      title: 'Deployment & Launch',
      description: 'Deploying the solution to production and providing ongoing support and maintenance as needed.',
      icon: 'fas fa-rocket'
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>My Services</h1>
          <p>knowledge to help anyone in need of help in web development and technology. Whether it's learning how to create personal website or building complex applications, I'm here to assist.</p>
        </div>
      </section>

      <section className="services-overview">
        <div className="container">
          <div className="services-header">
            <h2>What I Offer</h2>
            <p>From concept to deployment, I provide end-to-end digital solutions that drive results and exceed expectations.</p>
          </div>

          <div className="services-grid">
            {services.map(service => (
              <div 
                key={service.id} 
                className="service-card"
                data-user-service={service.isUserService || false}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    <h4>What's Included:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-pricing">
                    <span className="price">{service.pricing}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <h2>My Process</h2>
            <p>How I bring your ideas to life with a structured, collaborative approach</p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div key={step.step} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <div className="step-icon">
                    <i className={step.icon}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < processSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why-choose-me">
        <div className="container">
          <div className="why-header">
            <h2>Why Choose Me?</h2>
            <p>What sets me apart in delivering exceptional digital solutions</p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Quality Assurance</h3>
              <p>Every project undergoes rigorous testing and quality checks to ensure flawless performance and user experience.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>On-Time Delivery</h3>
              <p>I respect deadlines and deliver projects on time, keeping you informed throughout the development process.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Collaborative Approach</h3>
              <p>I work closely with you at every step, ensuring your vision is perfectly translated into the final product.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Ongoing Support</h3>
              <p>My relationship with clients doesn't end at launch. I provide continued support and maintenance services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss your requirements and create something amazing together</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary btn-large">
                <i className="fas fa-envelope"></i>
                Get Free Quote
              </a>
              <a href="/projects" className="btn btn-secondary btn-large">
                <i className="fas fa-eye"></i>
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
