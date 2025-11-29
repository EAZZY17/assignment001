import React, { useState } from 'react';
import { servicesAPI } from '../services/api';
import './Services.css';

const Services = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [userServices, setUserServices] = useState(() => {
    const saved = localStorage.getItem('userServices');
    return saved ? JSON.parse(saved) : [];
  });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    pricing: '',
    icon: 'fas fa-code'
  });

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

  // Combine default and user services
  const services = [...defaultServices, ...userServices];

  const handleSubmitService = async (e) => {
    e.preventDefault();
    
    // Parse features from comma-separated string
    const features = formData.features
      ? formData.features.split(',').map(f => f.trim()).filter(f => f)
      : [];
    
    if (editingServiceId) {
      // Update existing service
      const serviceData = {
        title: formData.title,
        description: formData.description,
        features: features,
        pricing: formData.pricing,
        icon: formData.icon || 'fas fa-code'
      };
      
      // Try to update in backend
      try {
        await servicesAPI.update(editingServiceId, {
          title: formData.title,
          description: formData.description,
          pricing: formData.pricing,
          features: features,
          icon: formData.icon || 'fas fa-code'
        });
        console.log('✅ Service updated in backend');
      } catch (err) {
        console.log('⚠️ Could not update in backend, using localStorage:', err);
      }
      
      // Update in localStorage
      const updatedUserServices = userServices.map(s => 
        s.id === editingServiceId ? { ...s, ...serviceData } : s
      );
      setUserServices(updatedUserServices);
      localStorage.setItem('userServices', JSON.stringify(updatedUserServices));
      
      alert('Service updated successfully!');
    } else {
      // Create new service
      const newService = {
        id: `user-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        features: features,
        pricing: formData.pricing,
        icon: formData.icon || 'fas fa-code', // Default icon if not provided
        isUserService: true
      };
      
      // Try to save to backend first
      try {
        const backendResponse = await servicesAPI.create({
          title: formData.title,
          description: formData.description,
          pricing: formData.pricing,
          features: features,
          icon: formData.icon || 'fas fa-code'
        });
        // Use backend ID if available
        if (backendResponse && backendResponse._id) {
          newService.id = backendResponse._id;
        }
        console.log('✅ Service saved to backend');
      } catch (err) {
        console.log('⚠️ Could not save to backend, using localStorage:', err);
      }
      
      // Add to user services (localStorage)
      const updatedUserServices = [...userServices, newService];
      setUserServices(updatedUserServices);
      localStorage.setItem('userServices', JSON.stringify(updatedUserServices));
      
      alert('Service added successfully! It will appear in the services list.');
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      features: '',
      pricing: '',
      icon: 'fas fa-code'
    });
    setShowAddForm(false);
    setEditingServiceId(null);
  };

  const handleEditService = (service) => {
    setFormData({
      title: service.title || '',
      description: service.description || '',
      features: service.features ? service.features.join(', ') : '',
      pricing: service.pricing || '',
      icon: service.icon || 'fas fa-code'
    });
    setEditingServiceId(service.id);
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: document.querySelector('.add-service-section').offsetTop - 100, behavior: 'smooth' });
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }
    
    // Try to delete from backend
    try {
      await servicesAPI.delete(serviceId);
      console.log('✅ Service deleted from backend');
    } catch (err) {
      console.log('⚠️ Could not delete from backend, removing from localStorage:', err);
    }
    
    // Remove from localStorage
    const updatedUserServices = userServices.filter(s => s.id !== serviceId);
    setUserServices(updatedUserServices);
    localStorage.setItem('userServices', JSON.stringify(updatedUserServices));
    
    alert('Service deleted successfully!');
  };

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

                  {service.isUserService && (
                    <div className="service-actions">
                      <button 
                        className="service-action-btn edit-btn"
                        onClick={() => handleEditService(service)}
                        title="Edit Service"
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button 
                        className="service-action-btn delete-btn"
                        onClick={() => handleDeleteService(service.id)}
                        title="Delete Service"
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Your Own Service Section */}
          <div className="add-service-section">
            <div className="add-service-header">
              <h2>{editingServiceId ? 'Edit Service' : 'Add Your Own Service'}</h2>
              <p>{editingServiceId ? 'Update your service details' : 'Add new services you can offer'}</p>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setEditingServiceId(null);
                    setFormData({
                      title: '',
                      description: '',
                      features: '',
                      pricing: '',
                      icon: 'fas fa-code'
                    });
                  }
                }}
              >
                <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'}`}></i>
                {showAddForm ? 'Cancel' : 'Add Service'}
              </button>
            </div>

            {showAddForm && (
              <div className="add-service-form">
                <form onSubmit={handleSubmitService}>
                  <div className="form-group">
                    <label htmlFor="service-title">Service Title *</label>
                    <input
                      type="text"
                      id="service-title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Mobile App Development"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service-description">Description *</label>
                    <textarea
                      id="service-description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe your service, what it includes, and what problems it solves..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="service-features">Features</label>
                      <input
                        type="text"
                        id="service-features"
                        value={formData.features}
                        onChange={(e) => setFormData({...formData, features: e.target.value})}
                        placeholder="e.g., Feature 1, Feature 2, Feature 3 (comma separated)"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service-pricing">Pricing *</label>
                      <input
                        type="text"
                        id="service-pricing"
                        value={formData.pricing}
                        onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                        placeholder="e.g., Starting at $100 or $50/hour"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className={`fas ${editingServiceId ? 'fa-save' : 'fa-plus'}`}></i>
                      {editingServiceId ? 'Update Service' : 'Add Service'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setFormData({
                          title: '',
                          description: '',
                          features: '',
                          pricing: '',
                          icon: 'fas fa-code'
                        });
                        setShowAddForm(false);
                        setEditingServiceId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
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
