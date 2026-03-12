import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Me</h1>
          <p>Get to know the person behind the code</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="profile-image">
                <img 
                  src="/9deacb94-3376-40a9-90c7-57a9d1e40290.JPG" 
                  alt="Edwin Makolo" 
                  className="profile-photo"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  <i className="fas fa-user"></i>
                  <p>Profile Photo</p>
                </div>
              </div>
            </div>

            <div className="about-text">
              <div className="personal-info">
                <h2>Edwin Makolo</h2>
                <p className="title">Software Engineer</p>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>edwinmakolo5@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>+1 (647) 803-1720</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Toronto, Canada</span>
                  </div>
                </div>
              </div>

              <div className="bio-section">
                <h3>About Me</h3>
                <p>
                  I'm a highly motivated Software Engineering Technology student specializing in Artificial Intelligence at Centennial College. 
                  I have a strong foundation in full-stack web development, focusing on modern frontend programming with React and backend 
                  integration with Node.js and MongoDB. I'm passionate about building scalable web solutions and currently advancing my 
                  knowledge in AI systems design, AI ethics, and algorithms. I've built full-stack applications, won 1st place in a design 
                  hackathon, and developed an AI-powered paramedic assistant at a WIMTACH hackathon.
                </p>
              </div>

              <div className="skills-section">
                <h3>Technical Skills</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h4>Programming Languages</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">JavaScript</span>
                      <span className="skill-tag">Java</span>
                      <span className="skill-tag">C#</span>
                      <span className="skill-tag">SQL</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h4>Web Technologies</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">React</span>
                      <span className="skill-tag">React Router</span>
                      <span className="skill-tag">HTML</span>
                      <span className="skill-tag">CSS</span>
                      <span className="skill-tag">Node.js</span>
                      <span className="skill-tag">Express</span>
                      <span className="skill-tag">MongoDB</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h4>Tools & Concepts</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">GitHub</span>
                      <span className="skill-tag">VS Code</span>
                      <span className="skill-tag">JWT</span>
                      <span className="skill-tag">REST APIs</span>
                      <span className="skill-tag">Component-Based Design</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <h3>Resume</h3>
                <p>Download my resume to learn more about my professional experience and qualifications.</p>
                <a href="/EDWIN_MAKOLO_RESUME.pdf" className="btn btn-primary" download>
                  <i className="fas fa-download"></i>
                  Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="education-experience">
        <div className="container">
          <div className="timeline-grid">
            <div className="timeline-section">
              <h3>Education</h3>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Software Engineering Technology (Co-op) - Artificial Intelligence</h4>
                  <p className="timeline-company">Centennial College, Toronto</p>
                  <p className="timeline-date">Sept 2024 - Present</p>
                  <p>Advanced Diploma with key courses in Web Application Development, Java Programming, Web Interface Design, C# Programming, AI System Design, and Software Requirements Engineering.</p>
                </div>
              </div>
            </div>

            <div className="timeline-section">
              <h3>Experience</h3>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Poll Worker - Deputy Return Office</h4>
                  <p className="timeline-company">Elections Canada, Toronto</p>
                  <p className="timeline-date">April 2025</p>
                  <p>Oversaw voting process to ensure fair, accurate and efficient election. Distributed ballots, helped voters with questions, maintained order, and performed balance counts for accuracy.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Buffet Attendant</h4>
                  <p className="timeline-company">Pinnacle Caterers, Toronto</p>
                  <p className="timeline-date">March - Oct 2023</p>
                  <p>Assisted with kitchen operations at a high-volume restaurant. Processed orders, monitored food preparation and presentation, and maintained health, safety, and sanitation policies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
