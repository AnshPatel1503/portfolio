import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_e3wo4zm",
        "template_vszbwpp",
        formData,
        "ydEzxlrQi8ncxla9R"
      );

      setStatus("Message sent successfully! I'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }

    setSending(false);
  };
  return (
    <div className="portfolio">
      <header className="navbar">
        <div className="logo">
        <img src="./logo-2.png" alt="Ansh Patel" className="logo-image"/>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          
        </nav>
        <nav>
        <a href="/Ansh-Patel-Resume.pdf" target="_blank" className="secondary-btn">
            Download Resume</a>
        <a href="#contact" className="nav-btn">
          Hire Me
        </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">HELLO, I'M</p>

            <h1>
              Ansh Patel
              <br />
              <span>Web Developer</span>
            </h1>

            <p className="hero-description">
              I build modern, responsive and user-friendly web applications
              using Laravel, React and modern web technologies.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">
                View Projects
              </a>

              <a href="#contact" className="secondary-btn">
                Contact Me
              </a>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/YOUR_USERNAME/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="profile-wrapper">
              <div className="profile-glow"></div>

              <img
                src="./profile.png"
                alt="Ansh Patel"
                className="profile-image"
              />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <p className="section-subtitle">ABOUT ME</p>

          <h2>I'm a Web Developer focused on building real-world applications.</h2>

          <p className="section-text">
            I am a Web Developer with experience in building modern and scalable
            web applications. I work mainly with Laravel, PHP, React, JavaScript
            and MySQL.
          </p>

          <p className="section-text about-second">
            I enjoy developing REST APIs, admin panels, authentication systems,
            payment integrations and responsive user interfaces. My goal is to
            create applications that are clean, secure, maintainable and easy to use.
          </p>

          <div className="about-stats">
            <div>
              <strong>2+</strong>
              <span>Years Experience</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>5+</strong>
              <span>Technologies</span>
            </div>  
          </div>
        </section>

        <section id="skills" className="section">
          <p className="section-subtitle">MY SKILLS</p>

          <h2>Technologies I Work With</h2>

          <div className="skills-grid">
            <div className="skill">
              <h3>Laravel</h3>
              <p>Backend & REST API Development</p>
            </div>

            <div className="skill">
              <h3>PHP</h3>
              <p>Object-Oriented & Server-side Development</p>
            </div>

            <div className="skill">
              <h3>React</h3>
              <p>Modern Frontend Applications</p>
            </div>

            <div className="skill">
              <h3>JavaScript</h3>
              <p>Interactive Web Applications</p>
            </div>

            <div className="skill">
              <h3>MySQL</h3>
              <p>Database Design & Optimization</p>
            </div>

            <div className="skill">
              <h3>REST API</h3>
              <p>API Development & Integration</p>
            </div>
          </div>
        </section>
        <section id="experience" className="section">
          <p className="section-subtitle">EXPERIENCE</p>

          <h2>My Professional Journey</h2>

          <div className="experience-list">

            <div className="experience-item">
              <div className="experience-year">
                2023 — Present
              </div>

              <div className="experience-content">
                <h3>Web Developer</h3>
                <h4>Web Perfection Technology</h4>

                <p>
                  Developing and maintaining modern web applications using
                  Laravel, PHP, React, JavaScript and MySQL.
                </p>

                <ul>
                  <li>Developed Laravel-based web applications and REST APIs</li>
                  <li>Built responsive React frontend applications</li>
                  <li>Worked with MySQL databases and API integrations</li>
                  <li>Implemented authentication and admin dashboards</li>
                </ul>
              </div>
            </div>

          </div>
        </section>
        <section id="services" className="section">
          <p className="section-subtitle">WHAT I DO</p>

          <h2>Services I Can Provide</h2>

          <div className="services-grid">

            <div className="service-card">
              <div className="service-number">01</div>

              <h3>Web Development</h3>

              <p>
                Custom and responsive websites built with modern technologies
                and clean development practices.
              </p>
            </div>

            <div className="service-card">
              <div className="service-number">02</div>

              <h3>Laravel Development</h3>

              <p>
                Scalable Laravel applications, REST APIs, authentication,
                admin panels and database-driven systems.
              </p>
            </div>

            <div className="service-card">
              <div className="service-number">03</div>

              <h3>React Development</h3>

              <p>
                Modern React interfaces with reusable components, API
                integration and responsive layouts.
              </p>
            </div>

            <div className="service-card">
              <div className="service-number">04</div>

              <h3>API Integration</h3>

              <p>
                REST API development and integration with frontend applications,
                payment gateways and third-party services.
              </p>
            </div>

          </div>
        </section>
        <section id="projects" className="section">
          <p className="section-subtitle">MY WORK</p>

          <h2>Featured Projects</h2>

          <div className="projects-grid">

            <div className="project-card">
              <div className="project-number">01</div>

              <h3>NGO Management System</h3>

              <p>
                Full-stack NGO management platform with admin dashboard,
                project management, gallery, events, volunteers, donations
                and contact management.
              </p>

              <div className="project-tech">
                <span>Laravel</span>
                <span>React</span>
                <span>MySQL</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-number">02</div>

              <h3>E-Commerce Platform</h3>

              <p>
                Modern e-commerce application with authentication, product
                management, shopping cart, orders and online payment integration.
              </p>

              <div className="project-tech">
                <span>Laravel</span>
                <span>React</span>
                <span>Razorpay</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-number">03</div>

              <h3>REST API Application</h3>

              <p>
                Secure REST API application with authentication, protected
                routes, database relationships and frontend API integration.
              </p>

              <div className="project-tech">
                <span>Laravel</span>
                <span>Sanctum</span>
                <span>REST API</span>
              </div>
            </div>

          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="section-subtitle">CONTACT</p>

          <h2>Let's Work Together</h2>

          <p className="section-text">
            Have a project, job opportunity or collaboration in mind?
            Send me a message.
          </p>
          <div className="contact-details">
          <div>
            <span>Email</span>
            <a href="mailto:anantansh1503@gmail.com">anantansh1503@gmail.com</a>
          </div>

          <div>
            <span>GitHub</span>
            <a href="https://github.com/testerme888" target="_blank" rel="noreferrer">github.com/testerme888</a>
          </div>

          <div>
            <span>LinkedIn</span>
            <a
              href="linkedin.com/in/ansh-patel-070692216/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="7"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="primary-btn" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
            {status && (<p className="form-status">{status}</p>)}
          </form>
        </section>
      </main>

      <footer>
        <p>© 2026 Ansh Patel. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;