import emailjs from "@emailjs/browser";
import { useState } from "react";
import { SiPhp, SiLaravel, SiCodeigniter, SiNextdotjs, SiReact, SiJavascript, SiJquery, SiMysql } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
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

            <h1>Ansh Patel<br /><span>Web Developer</span></h1>

            <p className="hero-description">
              I build modern, responsive and user-friendly web applications
              using Laravel, React and modern web technologies.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">View Projects</a>

              <a href="#contact" className="secondary-btn">Contact Me</a>
            </div>

            <div className="social-links">
              <a href="https://github.com/testerme888" target="_blank" rel="noreferrer">GitHub ↗</a>

              <a href="https://www.linkedin.com/in/ansh-patel-070692216/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="profile-wrapper">
              <div className="profile-glow"></div>
              <img src="./profile.png" alt="Ansh Patel" className="profile-image"/>
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

          <p className="section-text">
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
              <SiPhp className="skill-bg-icon" />
              <h3>PHP</h3>
              <p>Developed dynamic web applications using core PHP and MVC structure with clean, modular code.</p>
            </div>

            <div className="skill">
              <SiLaravel className="skill-bg-icon" />
              <h3>Laravel</h3>
              <p>Built full-stack Laravel apps including APIs, authentication, database design, and blade templating.</p>
            </div>
            <div className="skill">
              <SiCodeigniter className="skill-bg-icon" />
              <h3>Codeigniter</h3>
              <p>Created lightweight, high-performance applications using CodeIgniter with custom modules.</p>
            </div>

            <div className="skill">
              <SiNextdotjs className="skill-bg-icon" />
              <h3>Next.js</h3>
              <p>Engineered SEO-optimized SEO web apps using Server-Side Rendering (SSR), Static Site Generation (SSG), and optimized API routes.</p>
            </div>

            <div className="skill">
            <SiReact className="skill-bg-icon" />
              <h3>React</h3>
              <p>Built responsive, high-performance Single Page Applications (SPAs) utilizing hooks, state management, and reusable UI components.</p>
            </div>

            <div className="skill">
              <SiJavascript className="skill-bg-icon" />
              <h3>JavaScript</h3>
              <p>Implemented client-side logic, form validation, and event-driven programming.</p>
            </div>

            <div className="skill">
              <SiJquery className="skill-bg-icon" />
              <h3>Jquery</h3>
              <p>Used jQuery for DOM manipulation, animations, and AJAX requests to enhance UI interactivity.</p>
            </div>
            
            <div className="skill">
              <SiMysql className="skill-bg-icon" />
              <h3>MySQL</h3>
              <p>Designed and optimized relational databases and complex queries for scalable web apps.</p>
            </div>

            <div className="skill">
            <TbApi className="skill-bg-icon" />
              <h3>REST API</h3>
              <p>Developed and consumed RESTful APIs for seamless integration between frontend and backend systems.</p>
            </div>
          </div>
        </section>
        <section id="experience" className="section">
          <p className="section-subtitle">EXPERIENCE</p>

          <h2>My Professional Journey</h2>

          <div className="experience-list">
            {/* Current Role */}
            <div className="experience-item">
              <div className="experience-year">
                March 2026 — Present
              </div>

              <div className="experience-content">
                <h3>Full Stack Developer</h3>
                <h4>
                  <a href="https://ymcoders.in/" target="_blank" rel="noopener noreferrer">
                    YMCODERS Technologies Pvt. Ltd.
                  </a>
                </h4>

                <p>
                  Architecting dynamic web ecosystems and end-to-end applications using the modern PHP stack, React, and robust relational databases.
                </p>

                <ul>
                  <li>Engineered reusable React component libraries for sleek, client-facing interfaces.</li>
                  <li>Designed and documented scalable, secure RESTful APIs leveraging Laravel frameworks.</li>
                  <li>Optimized MySQL query performance to handle complex data aggregation workflows efficiently.</li>
                  <li>Integrated complex third-party payment gateways and webhook notification microservices.</li>
                </ul>
              </div>
            </div>

            {/* Mid Level Role */}
            <div className="experience-item">
              <div className="experience-year">
                Aug 2025 — Feb 2026
              </div>

              <div className="experience-content">
                <h3>Laravel Developer</h3>
                <h4>
                  <a href="https://swasoftech.com/" target="_blank" rel="noopener noreferrer">
                    Swa Softech Pvt. Ltd.
                  </a>
                </h4>

                <p>
                  Focused on backend performance tuning, secure database design, and modular MVC application structure development.
                </p>

                <ul>
                  <li>Developed granular role-based access control (RBAC) modules for multi-tenant admin dashboards.</li>
                  <li>Utilized Laravel Eloquent ORM to construct intricate database migrations and seed profiles.</li>
                  <li>Collaborated on frontend modernization projects by introducing AJAX and jQuery dynamic loading.</li>
                  <li>Integrated PayPal SDK into e-commerce checkout flows for secure international user transactions.**</li>        
                  <li>Implemented Razorpay Payment Gateway API for secure UPI, net banking, and instant domestic payment processing.</li>
                  <li>Implemented system-wide automated data sanitization and strict input verification middleware.</li>
                </ul>
              </div>
            </div>

            {/* Early Career Role */}
            <div className="experience-item">
              <div className="experience-year">
                Aug 2023 — Aug 2025
              </div>

              <div className="experience-content">
                <h3>PHP Developer</h3>
                <h4>
                  <a href="https://webvire.com/" target="_blank" rel="noopener noreferrer">
                    WebVire Software Solutions
                  </a>
                </h4>

                <p>
                  Maintained, debugged, and optimized legacy PHP systems while assisting in early-stage CodeIgniter development.
                </p>

                <ul>
                  <li>Maintained custom web platforms built natively on core PHP and CodeIgniter architectures.</li>
                  <li>Translated manual workflows into automated dashboard analytics using jQuery UI engines.</li>
                  <li>Integrated Stripe Payment Gateway with webhooks for handling recurring subscriptions, automatic billing, and multi-currency transactions.</li>
                  <li>Debugged persistent database deadlocks and resolved application security vulnerabilities.</li>
                  <li>Authored technical documentation detailing code updates, architecture maps, and schemas.</li>
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
            <a href="https://www.linkedin.com/in/ansh-patel-070692216/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
          </div>
        </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>

              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>

            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required/>

            <textarea name="message" rows="7" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>

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