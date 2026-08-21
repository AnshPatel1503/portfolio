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
              Full Stack Developer specializing in Laravel, React and Next.js.
              I build scalable web applications, REST APIs, admin dashboards
              and seamless digital experiences.
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

          <h2>Full Stack Developer building scalable web applications.</h2>

          <p className="section-text">
            I am a Full Stack Developer with professional experience in PHP,
            Laravel, React, Next.js, JavaScript and MySQL. I specialize in
            developing scalable backend systems, RESTful APIs, responsive
            frontend applications and database-driven platforms.
          </p>

          <p className="section-text about-second">
            I have worked on e-commerce platforms, payment gateway integrations,
            admin dashboards, authentication systems, API integrations and
            business-focused web applications.
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
              <strong>8+</strong>
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
                <h3>Freelance Full Stack Developer</h3>

                <h4><a href="https://ymcoders.in/" target="_blank" rel="noopener noreferrer">
                    YMCODERS Technologies Pvt. Ltd.
                  </a></h4>

                <p>
                  Worked as a Freelance Full Stack Developer, building and maintaining
                  modern web applications using Laravel, React, Next.js, PHP, and MySQL.
                  Delivered scalable frontend interfaces, backend APIs, database-driven
                  applications, and third-party service integrations.
                </p>

                <ul>
                  <li>
                    Developed responsive and reusable user interfaces using React and
                    Next.js for modern web applications.
                  </li>

                  <li>
                    Built scalable RESTful APIs, backend services, authentication systems,
                    and business logic using Laravel and PHP.
                  </li>

                  <li>
                    Designed and optimized MySQL databases, queries, relationships, and
                    data-driven application workflows.
                  </li>

                  <li>
                    Integrated third-party APIs, payment gateways, webhooks, and external
                    services into Laravel and React-based applications.
                  </li>

                  <li>
                    Worked across the complete development lifecycle, from frontend
                    development and API integration to backend development and deployment.
                  </li>
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
              <h3>Web Development</h3>

              <p>
                Custom, responsive and scalable web applications built with
                modern technologies, clean architecture and maintainable code.
              </p>
            </div>

            <div className="service-card">
              <h3>Laravel Development</h3>

              <p>
                Laravel applications, REST APIs, authentication systems,
                admin dashboards, CRUD modules, database integration and
                business logic development.
              </p>
            </div>

            <div className="service-card">
              <h3>React & Next.js Development</h3>

              <p>
                Modern and responsive frontend applications using React and
                Next.js with reusable components, API integration and
                optimized user experiences.
              </p>
            </div>

            <div className="service-card">
              <h3>Payment Integration</h3>

              <p>
                Integration of secure payment gateways such as Razorpay,
                PayPal and Stripe with checkout flows, webhooks, payment
                verification and transaction handling.
              </p>
            </div>

            <div className="service-card">
              <h3>REST API Development</h3>

              <p>
                Secure and scalable REST APIs with authentication,
                authorization, validation, database relationships and
                seamless frontend integration.
              </p>
            </div>

            <div className="service-card">
              <h3>Bug Fixing & Troubleshooting</h3>

              <p>
                Debugging and resolving frontend, backend, API, database,
                authentication and integration-related issues to improve
                application stability and performance.
              </p>
            </div>

            <div className="service-card">
              <h3>Database & Performance Optimization</h3>

              <p>
                MySQL database optimization, query improvements, relationships,
                indexing and backend performance tuning for faster applications.
              </p>
            </div>

            <div className="service-card">
              <h3>API & Third-Party Integration</h3>

              <p>
                Integration of third-party APIs, webhooks, external services,
                authentication providers and business automation into existing
                applications.
              </p>
            </div>

          </div>
        </section>
        <section id="projects" className="section">
  <p className="section-subtitle">MY WORK</p>

  <h2>Featured Projects</h2>

  <div className="projects-grid">
 
    {/* Project 1: Combiz Solutions (SaaS CRM Platform) */}
    <div className="project-card">
      <h3>Combiz Solutions (Enterprise SaaS CRM)</h3>
      <p>
        Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce. 
        Developed secure multi-tenant vendor panels, localized checkout engines with real-time tax mapping, 
        and automated PDF dynamic invoicing services for global procurement workflows.
      </p>

      <div className="project-tech">
        <span>Perfex CRM</span>
        <span>SaaS Architecture</span>
        <span>PHP & MySQL</span>
        <span>B2B E-Commerce</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://combizsolutions.co.in/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
      </div>
    </div>
    {/* Project 1: Samrit Food (Next.js Platform) */}
    <div className="project-card">
      <h3>Samrit Food Creation & Development</h3>
      <p>
        Engineered a high-performance food consultancy and product development platform. Implemented 
        an automated Nutrition Intelligence module for recipe micro-nutrient analysis and dynamic, 
        packaging-ready AI nutrition fact label generation.
      </p>

      <div className="project-tech">
        <span>Next.js</span>
        <span>React</span>
        <span>Tailwind CSS</span>
        <span>REST API</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://samritfood.in/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
      </div>
    </div>

    {/* Project 2: MPPL Life (Laravel MLM System) */}
    <div className="project-card">
      <h3>MPPL - Ayurvedic Wellness & MLM Platform</h3>
      <p>
        Developed an end-to-end Multi-Level Marketing (MLM) and Ayurvedic wellness application. Built secure 
        distributor registration portals, nested network tree structures, real-time commission tracking, 
        and high-concurrency wallet ledger systems.
      </p>

      <div className="project-tech">
        <span>Laravel</span>
        <span>MySQL</span>
        <span>HTML5 & Bootstrap</span>
        <span>jQuery & AJAX</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://www.mppl.life/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
      </div>
    </div>

    {/* Project 3: E-Commerce Platform */}
    <div className="project-card">
      <h3>E-Commerce Enterprise App</h3>
      <p>
        Modern e-commerce architecture featuring multi-tenant administrative dashboard panels, centralized inventory 
        management systems, multi-currency shopping cart operations, and encrypted checkout modules.
      </p>

      <div className="project-tech">
        <span>Laravel</span>
        <span>React</span>
        <span>Razorpay</span>
        <span>MySQL</span>
      </div>
    </div>
    {/* Project 3: Restro Genius (Laravel Customization & Bug Fixes) */}
    <div className="project-card">
      <h3>Restro Genius (SaaS Restaurant Wallet System)</h3>
      <p>
        Overhauled backend workflows by profiling query metrics and resolving architecture bottlenecks. 
        Customized multi-tenant admin control panels, refactored subscription modules, and fixed complex 
        bugs related to live restaurant wallet balances and transaction calculations.
      </p>

      <div className="project-tech">
        <span>Laravel</span>
        <span>Blade Engine</span>
        <span>MySQL</span>
        <span>Bug Fixing</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://restrogenius.co.in/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
      </div>
    </div>

    {/* Project 4: Tripgare (Laravel Flight Meta-Search System) */}
    <div className="project-card">
      <h3>Tripgare (Flight Booking & Travel Meta-Search)</h3>
      <p>
        Optimized and customized an online travel aggregator platform. Fixed major application routing, session 
        handling, and asynchronous filter bugs while customizing dynamic flight search result algorithms 
        to ensure zero-downtime performance.
      </p>

      <div className="project-tech">
        <span>Laravel</span>
        <span>Customization</span>
        <span>jQuery & AJAX</span>
        <span>API Debugging</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://tripgare.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
      </div>
    </div>
    {/* Project 3: StreetBuzz (Core PHP News Web App) */}
    <div className="project-card">
      <h3>StreetBuzz (Regional News & Media Portal)</h3>
      <p>
        Customized and scaled a native architecture real-time regional aggregator system. Optimized 
        state-wise dynamic news sorting modules, customized trending hashtag algorithms, and refactored state fallbacks 
        to track views and manage high-concurrency visitor traffic efficiently.
      </p>

      <div className="project-tech">
        <span>Core PHP</span>
        <span>Customization</span>
        <span>JavaScript</span>
        <span>MySQL</span>
      </div>

      <div className="project-links" style={{ marginTop: '15px' }}>
        <a href="https://streetbuzz.co.in/newsapp/home" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary-color, #0070f3)' }}>
          Live Project →
        </a>
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