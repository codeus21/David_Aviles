import { useState, useEffect, useRef } from 'react'
import TypeWriter from './components/TypeWriter'
import emailjs from '@emailjs/browser'
import "./PersonalWebsite.css"

function PersonalWebsite() {
    
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Create refs for each section
  const sections = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  }

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

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

  // Add event listeners for mobile menu auto-hide
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])

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
    setIsMobileMenuOpen(false) // Close mobile menu when clicking a link
  }

  // Close mobile menu when clicking outside
  const handleClickOutside = (e) => {
    if (isMobileMenuOpen && !e.target.closest('.mobile-nav') && !e.target.closest('.mobile-menu-toggle')) {
      setIsMobileMenuOpen(false)
    }
  }

  // Close mobile menu when scrolling
  const handleScroll = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
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
           
                       {/* Mobile menu button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger"></span>
            </button>
           
           {/* Desktop navigation */}
           <ul className="nav-links desktop-nav">
             <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home') }} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
             <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about') }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
             <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
             <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects') }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
             <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
           </ul>
           
           {/* Mobile navigation */}
           <ul className={`nav-links mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
             <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home') }} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
             <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about') }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
             <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
             <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects') }} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
             <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact') }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
           </ul>
           
           <button className="theme-toggle" onClick={toggleDarkMode}>
             {isDarkMode ? '☀️' : '🌙'}
           </button>
         </div>
       </nav>

      <main>
        <section id="home" className="hero" ref={sections.home}>
          <div className="hero-content">
            <h1 className="animated-heading">Hi, I'm David Aviles.</h1>
            <h2>Frontend Developer</h2>
            <TypeWriter texts={[
              "I create beautiful, responsive, and user-friendly web experiences.",
              "Passionate about turning ideas into interactive digital solutions.",
              "Building the future of web development, one project at a time.",
              "Crafting seamless user experiences with modern technologies."
            ]} />
            <br/>
            <br/>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }} className="cta-button">Get in Touch</a>
          </div>
        </section>

        <section id="about" className="about" ref={sections.about}>
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Hi, I'm David, a passionate full-stack developer with 6 months of hands-on experience building modern web applications. I specialize in creating responsive, user-friendly interfaces and robust backend systems.<br/><br/>
                My journey began with frontend development using HTML, CSS, JavaScript, and React. I've since expanded into full-stack development, working with C# .NET for backend APIs, PostgreSQL for database management, and modern deployment practices using Docker, Vercel, and Railway.<br/><br/>
                I bring a detail-oriented, problem-solving approach to every project, from concept to deployment. I'm always eager to learn new technologies and take on challenging projects that push my skills forward.</p>
            </div>
            <div className="about-image">
              <span role="img" aria-label="developer">💻</span>
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
               <h3>Backend & Database</h3>
               <ul>
                 <li>C# (.NET)</li>
                 <li>PostgreSQL</li>
                 <li>RESTful APIs</li>
                 <li>Database Design</li>
               </ul>
             </div>
             <div className="skill-category">
               <h3>DevOps & Tools</h3>
               <ul>
                 <li>Git & GitHub</li>
                 <li>Docker</li>
                 <li>Vercel Deployment</li>
                 <li>Railway Cloud Platform</li>
               </ul>
             </div>
          </div>
        </section>

        <section id="projects" className="projects" ref={sections.projects}>
          <h2>Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <img 
                  src="/BarberBook-screenshot.png" 
                  alt="The Barber Book - Appointment Booking System"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="project-image-fallback">
                  <span>📋</span>
                </div>
              </div>
              <h3>The Barber Book</h3>
              <p>
                A full-stack appointment booking system for barber shops. 
                Features include user authentication, appointment scheduling, admin dashboard, and real-time notifications. 
                Built with modern web technologies and deployed using cloud services.
              </p>
                             <div className="project-links">
                 <a href="https://the-barber-book.vercel.app" target="_blank" rel="noopener noreferrer">Client Demo</a>
                 <a href="https://the-barber-book.vercel.app/admin/login" target="_blank" rel="noopener noreferrer">Admin Demo</a>
                 <div className="code-links">
                   <a href="https://github.com/codeus21/TheBarberBook" target="_blank" rel="noopener noreferrer">Frontend Github</a>
                   <a href="https://github.com/codeus21/BarberShopAPI" target="_blank" rel="noopener noreferrer">Backend Github</a>
                 </div>
               </div>
            </div>
            <div className="project-card">
              <div className="project-image"></div>
              <h3>Project 2</h3>
              <p>Coming Soon!</p>
              <div className="project-links">
                {/* <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a> */}
                {/* <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a> */}
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
        <p>&copy; 2025 David Aviles. All rights reserved.</p>
      </footer>
    </div>
    )
}
export default PersonalWebsite