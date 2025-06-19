import { useState, useEffect, useRef } from 'react'
import TypeWriter from './components/TypeWriter'
import emailjs from '@emailjs/browser'
import "./PersonalWebsite.css"

function PersonalWebsite() {
    
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  })

  // Create refs for each section
  const sections = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    Object.values(sections).forEach(section => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      // Cleanup observer
      Object.values(sections).forEach(section => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    scrollToSection(sectionId)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: ''
    })

    try {
      await emailjs.send(
        'service_7bxbsx4',
        'template_3r1zmak',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'David Aviles',
        },
        'UqnYxg8Q_no7i-ynh'
      )

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: 'Message sent successfully!'
      })

      // Clear the form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      })
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">David Aviles</div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home') }} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about') }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects') }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home" className="hero" ref={sections.home}>
          <div className="hero-content">
            <h1 className="animated-heading">Hi, I'm David Aviles.</h1>
            <h2>Frontend Developer</h2>
            <TypeWriter text="I create beautiful, responsive, and user-friendly web experiences." />
            <br/>
            <br/>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }} className="cta-button">Get in Touch</a>
          </div>
        </section>

        <section id="about" className="about" ref={sections.about}>
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Front-end Web Developer with experience in building responsive and dynamic web applications. I can build you a website from scratch or help you redesign your current one and help your business grow.</p>
              <p>My approach combines technical expertise with creative problem-solving to deliver high-quality solutions that make a difference.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="skills" ref={sections.skills}>
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>HTML5 & CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React.js</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>Cursor AI</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="projects" ref={sections.projects}>
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image"></div>
              <h3>Project 1</h3>
              <p>A brief description of the project and the technologies used.</p>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image"></div>
              <h3>Project 2</h3>
              <p>A brief description of the project and the technologies used.</p>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" ref={sections.contact}>
          <h2>Get in Touch</h2>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus.message && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 David Aviles. All rights reserved.</p>
      </footer>
    </div>
    )
}
export default PersonalWebsite