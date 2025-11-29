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
                  I am a Centennial College student studying software engineering - Artificial Intelligence. 
                  I have little experience, just the knowledge I have gained from the first year of my 
                  program; like Programming, JavaScript, HTML and CSS.
                </p>
              </div>

              <div className="skills-section">
                <h3>Technical Skills</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h4>Frontend</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">React</span>
                      <span className="skill-tag">JavaScript</span>
                      <span className="skill-tag">TypeScript</span>
                      <span className="skill-tag">HTML5</span>
                      <span className="skill-tag">CSS3</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h4>Backend</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">Node.js</span>
                      <span className="skill-tag">Python</span>
                      <span className="skill-tag">Express</span>
                      <span className="skill-tag">MongoDB</span>
                    </div>
                  </div>
                  <div className="skill-category">
                    <h4>Tools & Technologies</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">Git</span>
                      <span className="skill-tag">Docker</span>
                      <span className="skill-tag">AWS</span>
                      <span className="skill-tag">Figma</span>
                      <span className="skill-tag">VS Code</span>
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
                  <h4>Software Engineering Technology - Artificial Intelligence</h4>
                  <p className="timeline-company">Centennial College</p>
                  <p className="timeline-date">2024 - Present</p>
                  <p>Currently pursuing a degree in Software Engineering Technology - Artificial Intelligence at Centennial College.</p>
                </div>
              </div>
            </div>

            <div className="timeline-section">
              <h3>Experience</h3>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Backend Developer</h4>
                  <p className="timeline-company">College Student</p>
                  <p className="timeline-date">2024 - Present</p>
                  <p>Lead development of web applications using React and Node.js, managing a team of 3 developers.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Frontend Developer</h4>
                  <p className="timeline-company">College Student</p>
                  <p className="timeline-date">2024 - Present</p>
                  <p>Developed and maintained web applications, working with various JavaScript frameworks.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Web Designer</h4>
                  <p className="timeline-company">College Student</p>
                  <p className="timeline-date">2020 - 2021</p>
                  <p>Started my professional journey building responsive websites and learning modern development practices.</p>
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
