import React, { useState, useEffect, useMemo } from 'react';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [userProjects, setUserProjects] = useState(() => {
    // Load user projects from localStorage
    const saved = localStorage.getItem('userProjects');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    role: '',
    outcome: '',
    category: 'web'
  });

  // Fallback data - your original projects with all fields
  // Moved outside component to avoid dependency warning
  const fallbackProjects = [
    {
      _id: '1',
      title: 'Pixar Movie Gallery',
      description: 'An interactive movie gallery showcasing Pixar films with filtering and search capabilities. The gallery automatically loads movie data from a JSON file when the page loads, displaying all Pixar movies with their posters, titles, directors, and release years. Users can filter movies by year using a dropdown menu, filter by director, sort movies by release date in ascending or descending order, and search for specific movies by title. All filters and search work together dynamically - when you search, the filters reset, and when you use filters, the search resets. The gallery uses DOM manipulation to dynamically update the displayed movies based on user interactions.',
      completion: new Date('2024-01-15'),
      technologies: ['HTML', 'CSS', 'JavaScript', 'JSON'],
      role: 'Web Developer',
      outcome: 'Created a fully functional interactive gallery demonstrating DOM manipulation, JSON data handling, filtering, and search functionality.',
      github: '#',
      demo: '/pixar-gallery.html',
      category: 'web',
      image: '/images/01_ts.jpg' // Using a Pixar movie poster as preview
    },
    {
      _id: '2',
      title: 'Word Guessing Game',
      description: 'An interactive word guessing game featuring two game modes. In Classic Mode, players have 6 lives to guess a randomly selected word by clicking keyboard buttons or typing letters. In Time Mode, players have 30 seconds to guess the word before time runs out. The game displays the word with underscores for unguessed letters, reveals correct letters when guessed, and tracks lives remaining. Players can interact via on-screen keyboard buttons or physical keyboard input. The game includes win/lose detection, disables keys after they are used, and provides visual feedback throughout gameplay. The game randomly selects from a word bank including words like PIZZA, UNICORN, ROBOT, BANANA, SPACESHIP, and NINJA.',
      completion: new Date('2024-02-20'),
      technologies: ['HTML', 'CSS', 'JavaScript'],
      role: 'Web Developer',
      outcome: 'Created an engaging interactive game demonstrating event handling, DOM manipulation, timer functionality, and game logic implementation.',
      github: '#',
      demo: '/word-game.html',
      category: 'web',
      image: '/images/word-game.jpg' // Screenshot of the Word Guessing Game interface
    },
    {
      _id: '3',
      title: 'Pokédex Application',
      description: 'An interactive Pokédex web application that allows users to search for Pokémon by name or ID using the PokeAPI. The application features a clean, user-friendly interface with search functionality, detailed Pokémon information cards, and a favorites system. Users can view comprehensive Pokémon details including types, abilities, height, weight, and base stats in a modal view. The app includes a favorites feature that allows users to save up to 6 favorite Pokémon using localStorage, with the ability to view, manage, and remove favorites. The application demonstrates API integration, async/await patterns, DOM manipulation, and local storage management.',
      completion: new Date('2024-03-15'),
      technologies: ['HTML', 'CSS', 'JavaScript', 'PokeAPI', 'LocalStorage'],
      role: 'Web Developer',
      outcome: 'Created a fully functional Pokédex application demonstrating API integration, asynchronous JavaScript, DOM manipulation, and client-side data persistence using localStorage.',
      github: '#',
      demo: '/pokedex.html',
      category: 'web',
      image: '/pokedex-img/logo.png'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsAPI.getAll();
        
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Projects fetched from backend:', data);
          console.log(`📊 Total projects: ${data?.length || 0}`);
        }
        
        // Always prioritize fallback projects from public folder
        // These are your main projects that should always be displayed
        let allProjects = [...fallbackProjects];
        
        // Projects to exclude (like "Portfolio Website")
        const excludedTitles = ['Portfolio Website', 'portfolio website', 'Portfolio website'];
        
        // If backend has data, add any additional projects that aren't in fallback
        // Filter out empty or incomplete projects and excluded titles
        if (data && Array.isArray(data) && data.length > 0) {
          data.forEach(backendProject => {
            // Only add backend projects that have title and description (not empty)
            // and are not in the excluded list
            if (backendProject.title && 
                backendProject.description && 
                !excludedTitles.includes(backendProject.title)) {
              const existsInFallback = fallbackProjects.some(fp => fp.title === backendProject.title);
              if (!existsInFallback) {
                // Add backend project that's not in fallback and has proper data
                allProjects.push(backendProject);
              } else {
                // If backend has same project, merge data (keep fallback image, but use backend image if provided)
                const index = allProjects.findIndex(p => p.title === backendProject.title);
                if (index !== -1) {
                  allProjects[index] = { 
                    ...allProjects[index], 
                    _id: backendProject._id,
                    // Use backend image if provided, otherwise keep fallback image
                    image: backendProject.image || allProjects[index].image
                  };
                }
              }
            }
          });
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ Loaded ${allProjects.length} projects (${fallbackProjects.length} from public folder)`);
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ Using ${fallbackProjects.length} projects from public folder (backend empty or unavailable)`);
          }
        }
        
        // Filter out any projects without title or description, and excluded titles
        const validProjects = allProjects.filter(p => 
          p.title && 
          p.description && 
          !excludedTitles.includes(p.title)
        );
        
        // Combine with user-added projects
        const allProjectsWithUser = [...validProjects, ...userProjects];
        setProjects(allProjectsWithUser);
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Always show fallback projects even if backend fails
        setProjects(fallbackProjects);
        setError('Note: Using local data. Backend connection unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProjects]);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    
    // Parse technologies from comma-separated string
    const technologies = formData.technologies
      ? formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      : [];
    
    if (editingProjectId) {
      // Update existing project
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: technologies,
        github: formData.github,
        demo: formData.demo || null,
        role: formData.role || null,
        outcome: formData.outcome || null,
        category: formData.category
      };
      
      // Try to update in backend
      try {
        await projectsAPI.update(editingProjectId, {
          title: formData.title,
          description: formData.description,
          completion: new Date(),
          technologies: technologies,
          github: formData.github || null,
          demo: formData.demo || null,
          role: formData.role || null,
          outcome: formData.outcome || null,
          category: formData.category,
          image: null
        });
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Project updated in backend');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Could not update in backend, using localStorage:', err);
        }
      }
      
      // Update in localStorage
      const updatedUserProjects = userProjects.map(p => 
        p._id === editingProjectId ? { ...p, ...projectData } : p
      );
      setUserProjects(updatedUserProjects);
      localStorage.setItem('userProjects', JSON.stringify(updatedUserProjects));
      
      alert('Project updated successfully!');
    } else {
      // Create new project
      const newProject = {
        _id: `user-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        technologies: technologies,
        github: formData.github || null,
        demo: formData.demo || null,
        role: formData.role || null,
        outcome: formData.outcome || null,
        category: formData.category,
        completion: new Date(),
        image: null,
        isUserProject: true
      };
      
      // Try to save to backend first
      try {
        const backendResponse = await projectsAPI.create({
          title: formData.title,
          description: formData.description,
          completion: new Date(),
          technologies: technologies,
          github: formData.github || null,
          demo: formData.demo || null,
          role: formData.role || null,
          outcome: formData.outcome || null,
          category: formData.category,
          image: null
        });
        // Use backend ID if available
        if (backendResponse && backendResponse._id) {
          newProject._id = backendResponse._id;
        }
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Project saved to backend');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Could not save to backend, using localStorage:', err);
        }
      }
      
      // Add to user projects (localStorage)
      const updatedUserProjects = [...userProjects, newProject];
      setUserProjects(updatedUserProjects);
      localStorage.setItem('userProjects', JSON.stringify(updatedUserProjects));
      
      alert('Project added successfully! It will appear in the projects list.');
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github: '',
      demo: '',
      role: '',
      outcome: '',
      category: 'web'
    });
    setShowAddForm(false);
    setEditingProjectId(null);
  };

  const handleEditProject = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      github: project.github || '',
      demo: project.demo || '',
      role: project.role || '',
      outcome: project.outcome || '',
      category: project.category || 'web'
    });
    setEditingProjectId(project._id);
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: document.querySelector('.add-project-section').offsetTop - 100, behavior: 'smooth' });
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    // Try to delete from backend
    try {
      await projectsAPI.delete(projectId);
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Project deleted from backend');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Could not delete from backend, removing from localStorage:', err);
        }
    }
    
    // Remove from localStorage
    const updatedUserProjects = userProjects.filter(p => p._id !== projectId);
    setUserProjects(updatedUserProjects);
    localStorage.setItem('userProjects', JSON.stringify(updatedUserProjects));
    
    alert('Project deleted successfully!');
  };

  // Memoize filtered projects to avoid recalculating on every render
  const filteredProjects = useMemo(() => {
    return projects;
  }, [projects]);

  // Note: calling the underlying handlers directly keeps lints simple

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <h1>My Projects</h1>
          <p>Showcasing previously completed work and technical expertise</p>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          <div className="projects-header">
            <h2>Featured Work</h2>
            <p>Explore my portfolio of web applications, mobile apps, and innovative solutions</p>
          </div>

          {loading && (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="info-notification">
              <i className="fas fa-info-circle"></i>
              <p>{error}</p>
          </div>
          )}


          {!loading && filteredProjects.length > 0 && (
          <div className="projects-grid">
              {filteredProjects.map(project => (
                <div 
                  key={project._id || project.id} 
                  className="project-card"
                  data-user-project={project.isUserProject || false}
                >
                <div className="project-image">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-screenshot"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                        style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="image-placeholder" style={{ display: project.image ? 'none' : 'flex' }}>
                    <i className="fas fa-code"></i>
                    <p>Project Screenshot</p>
                  </div>
                    {project.demo && (
                  <div className="project-overlay">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-external-link-alt"></i>
                          View Demo
                      </a>
                    </div>
                    )}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                      <div className="project-header-right">
                        {project.category && (
                    <span className="project-category">{project.category}</span>
                        )}
                        {project.completion && (
                          <span className="project-date">
                            {new Date(project.completion).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })}
                          </span>
                        )}
                      </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                    {project.role && (
                  <div className="project-role">
                    <h4>My Role</h4>
                    <p>{project.role}</p>
                  </div>
                    )}

                    {project.outcome && (
                  <div className="project-outcome">
                    <h4>Outcome</h4>
                    <p>{project.outcome}</p>
                  </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                      </div>
                    )}

                    {(project.github || project.demo) && (
                      <div className="project-links-section">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <i className="fab fa-github"></i>
                            View on GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <i className="fas fa-external-link-alt"></i>
                            View Demo
                          </a>
                        )}
                      </div>
                    )}

                    {project.isUserProject && (
                      <div className="project-actions">
                        <button 
                          className="project-action-btn edit-btn"
                          onClick={() => handleEditProject(project)}
                          title="Edit Project"
                        >
                          <i className="fas fa-edit"></i>
                          Edit
                        </button>
                        <button 
                          className="project-action-btn delete-btn"
                          onClick={() => handleDeleteProject(project._id)}
                          title="Delete Project"
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
          )}

          {/* Add Your Own Project Section */}
          <div className="add-project-section">
            <div className="add-project-header">
              <h2>{editingProjectId ? 'Edit Project' : 'Add Your Own Project'}</h2>
              <p>{editingProjectId ? 'Update your project details' : 'Share your projects with the community'}</p>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setEditingProjectId(null);
                    setFormData({
                      title: '',
                      description: '',
                      technologies: '',
                      github: '',
                      demo: '',
                      role: '',
                      outcome: '',
                      category: 'web'
                    });
                  }
                }}
              >
                <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'}`}></i>
                {showAddForm ? 'Cancel' : 'Add Project'}
              </button>
            </div>

            {showAddForm && (
              <div className="add-project-form">
                <form onSubmit={handleSubmitProject}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Project Title *</label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe your project, its features, and what it does..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="technologies">Technologies Used</label>
                      <input
                        type="text"
                        id="technologies"
                        value={formData.technologies}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                        placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Your Role</label>
                      <input
                        type="text"
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        placeholder="e.g., Full Stack Developer"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="github">GitHub Repository Link</label>
                      <input
                        type="url"
                        id="github"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        placeholder="https://github.com/username/repository"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="demo">Demo Link</label>
                      <input
                        type="url"
                        id="demo"
                        value={formData.demo}
                        onChange={(e) => setFormData({...formData, demo: e.target.value})}
                        placeholder="https://your-demo-url.com or /your-demo.html"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="outcome">Outcome / Results</label>
                    <textarea
                      id="outcome"
                      value={formData.outcome}
                      onChange={(e) => setFormData({...formData, outcome: e.target.value})}
                      placeholder="What was the outcome or result of this project?"
                      rows="3"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className={`fas ${editingProjectId ? 'fa-save' : 'fa-plus'}`}></i>
                      {editingProjectId ? 'Update Project' : 'Add Project'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setFormData({
                          title: '',
                          description: '',
                          technologies: '',
                          github: '',
                          demo: '',
                          role: '',
                          outcome: '',
                          category: 'web'
                        });
                        setShowAddForm(false);
                        setEditingProjectId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {!loading && (
          <div className="projects-cta">
            <h2>Interested in Working Together?</h2>
            <p>Let's discuss how we can bring your next project to life</p>
            <a href="/contact" className="btn btn-primary btn-large">
              <i className="fas fa-envelope"></i>
              Get In Touch
            </a>
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
