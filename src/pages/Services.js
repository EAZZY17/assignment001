import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {

  // Default services - based on skills and hackathon experience from resume
  const defaultServices = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      description: 'End-to-end web application development using React, Node.js, Express, and MongoDB. From responsive frontends to RESTful backends with authentication and database design.',
      icon: 'fas fa-code',
      features: [
        'React & Component-Based Architecture',
        'Node.js & Express Backends',
        'MongoDB & Database Design',
        'RESTful API Development',
        'JWT Authentication',
        'Responsive & Mobile-First Design'
      ]
    },
    {
      id: 2,
      title: 'AI & Conversational Integration',
      description: 'Integration of AI and natural language capabilities into applications. Experience building multi-agent pipelines, voice-to-text interfaces, and intelligent form automation from the ParaHelper hackathon project.',
      icon: 'fas fa-robot',
      features: [
        'LLM Integration (OpenRouter, Claude)',
        'Multi-Agent Pipeline Design',
        'Voice-to-Text Interfaces',
        'Vector Search & RAG (ChromaDB)',
        'Intent Detection & Data Extraction',
        'Context-Aware Conversational AI'
      ]
    },
    {
      id: 3,
      title: 'IoT & System Design',
      description: 'Conceptual design and architecture for smart systems. Experience from the Vending Kitchen System hackathon—covering subsystem integration, scan-to-cook workflows, and IoT dashboard design.',
      icon: 'fas fa-microchip',
      features: [
        'System Architecture Design',
        'Hardware-Software Integration',
        'IoT Dashboard UI/UX',
        'Workflow Design & Prototyping',
        'Subsystem Integration',
        'Cross-Platform Solutions'
      ]
    },
    {
      id: 4,
      title: 'REST API & Backend Development',
      description: 'Design and development of RESTful APIs with proper authentication, validation, and testing. Built ticketing systems with role-based access control using Node.js, Express, and MongoDB.',
      icon: 'fas fa-plug',
      features: [
        'RESTful API Design',
        'JWT & Role-Based Access Control',
        'Postman API Documentation',
        'Automated Testing (Jest)',
        'MongoDB & Data Modeling',
        'Agile Development Practices'
      ]
    },
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
              <Link to="/contact" className="btn btn-primary btn-large">
                <i className="fas fa-envelope"></i>
                Get Free Quote
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-large">
                <i className="fas fa-eye"></i>
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
