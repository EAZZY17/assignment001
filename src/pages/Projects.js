import React, { useState, useEffect, useMemo } from 'react';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProjects, setUserProjects] = useState(() => {
    // Load user projects from localStorage
    const saved = localStorage.getItem('userProjects');
    return saved ? JSON.parse(saved) : [];
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
    },
    {
      _id: '4',
      title: 'ParaHelper - AI Paramedic Assistant',
      description: 'Full-stack AI-powered paramedic assistant that automates form completion through natural language and voice input. Built for the WIMTACH x EffectiveAI Hackathon (March 2026). Features a Node.js/Express backend with a multi-agent pipeline (8 agents) handling transcription correction, intent detection, data extraction, guardrail validation, and PDF export. Integrated OpenRouter (Claude Sonnet) and ChromaDB vector search for intelligent, context-aware responses. React frontend with real-time form panels, confidence scoring indicators, and voice-to-text support.',
      completion: new Date('2026-03-01'),
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'ChromaDB', 'OpenRouter', 'Claude'],
      role: 'Full Stack Developer',
      outcome: 'Built end-to-end AI application demonstrating multi-agent orchestration, RAG with vector search, and voice interface integration.',
      github: '#',
      demo: '#',
      category: 'web',
      image: null
    },
    {
      _id: '5',
      title: 'Vending Kitchen System (VKS)',
      description: 'Led team to 1st place in design challenge hosted by Centennial College and Cenith Energy Corp. (Feb 2025). Directed conceptual design of an automated smart kitchen module for schools, offices, and transit hubs. Covered subsystem integration, scan-to-cook workflow, hardware architecture, and a three-layer IoT dashboard UI.',
      completion: new Date('2025-02-01'),
      technologies: ['IoT', 'System Design', 'UI/UX'],
      role: 'Team Lead & Design Lead',
      outcome: '1st Place - Design Hackathon. Demonstrated systems thinking and cross-functional design skills.',
      github: '#',
      demo: '#',
      category: 'other',
      image: null
    },
    {
      _id: '6',
      title: 'Agile Ticketing & Workflow System',
      description: 'Full-stack ticketing system with user authentication, role-based access control, and ticket management. Designed backend framework with structured Postman collections for RESTful API endpoints. Implemented Jest for automated testing of routes, validation, and authorization logic. Used Jira for sprint planning, backlog management, and iterative delivery.',
      completion: new Date('2024-01-01'),
      technologies: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Postman', 'JWT', 'Jest', 'Jira'],
      role: 'Full Stack Developer',
      outcome: 'Demonstrated backend architecture, API design, automated testing, and agile methodology.',
      github: '#',
      demo: '#',
      category: 'web',
      image: null
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

                    {((project.github && project.github !== '#') || (project.demo && project.demo !== '#')) && (
                      <div className="project-links-section">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <i className="fab fa-github"></i>
                            View on GitHub
                          </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                            <i className="fas fa-external-link-alt"></i>
                            View Demo
                          </a>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}

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
