import emailjs from "@emailjs/browser";
import { useState } from "react";
import { SiPhp, SiLaravel, SiCodeigniter, SiNextdotjs, SiReact, SiJavascript, SiJquery, SiMysql } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaEye, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import "./App.css";
import PokemonGame from './components/PokemonGame';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  // Slider States
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Real-world project screenshots mapping
  const projectScreenshots = {
    aurra: [
      "aurra1.png",
      "aurra2.png",
      "aurra3.png",
      "aurra4.png",
      "aurra5.png",
      "aurra6.png",
      
    ],
    combiz: [
      "https://placehold.co",
      "https://placehold.co",
      "https://placehold.co"
    ],
    samrit: [
      "samrit1.png",
      "samrit2.png",
      "samrit3.png",
      "samrit4.png",
      "samrit5.png",
      "samrit6.png",
      "samrit7.png"      
    ],
    perfex: [
      "https://placehold.co",
      "https://placehold.co"
    ],
    mppl: [
      "mppl0.png",
      "mppl1.png",
      "mppl2.png",
      "mppl3.png",
      "mppl4.png",
    ],
    streetbuzz: [
      "sb1.png",
      "sb2.png",
      "sb3.png",
      "sb4.png",
      "sb5.png",
      "sb6.png"
    ],
    restro: [
      "Restro1.png",
      "Restro2.png",
      "Restro3.png",
      "Restro4.png",
      "Restro5.png",
      "Restro6.png",
    ],
    tripgare: [
      "Tripgare1.png",
      "Tripgare2.png",
      "Tripgare3.png",
      "Tripgare4.png"
    ]
  };

  const openSlider = (projectKey) => {
    setCurrentImages(projectScreenshots[projectKey]);
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };
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
              Full Stack Developer specializing in Laravel, Codeigniter, React and Next.js.
              I build scalable web applications, REST APIs, admin dashboards
              and seamless digital experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">View Projects</a>

              <a href="#contact" className="secondary-btn">Contact Me</a>
            </div>

            <div className="social-links">
              <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer">GitHub ↗</a>

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
            
           

            {/* Project 4: MPPL Life */}
            <div className="project-card">
              <h3>MPPL - Ayurvedic Wellness & MLM Platform</h3>
              <p>
                Developed an end-to-end Multi-Level Marketing (MLM) application. Built secure distributor registration 
                portals, nested network tree structures, real-time commission tracking, and wallet systems.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>MySQL</span>
                <span>Bootstrap & jQuery</span>
                <a href="https://mppl.life" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('mppl')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
            {/* Project 2: Samrit Food */}
            <div className="project-card">
              <h3>Samrit Food Creation & Development</h3>
              <p>
                Engineered a high-performance food consultancy platform. Implemented an automated Nutrition Intelligence 
                module for recipe micro-nutrient analysis and dynamic packaging-ready AI nutrition fact labels.
              </p>
              <div className="project-tech">
                <span>Next.js</span>
                <span>Json</span>
                <span>Tailwind CSS</span>
                <a href="https://samritfood.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('samrit')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
               {/* Project 3: Perfex CRM */}
            <div className="project-card">
              <h3>Perfex CRM - Custom Module Development</h3>
              <p>
                Successfully customized and deployed 3 core modules within the CodeIgniter 3 architecture. Refactored 
                backend business workflows, automated invoice generation PDF engines, and granular RBAC tasks.
              </p>
              <div className="project-tech">
                <span>CodeIgniter 3</span>
                <span>Perfex CRM</span>
                <span>PHP & MySQL</span>
                <span>Jquery</span>
                <a href="https://perfexcrm.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Platform Link</a>
                <button onClick={() => openSlider('perfex')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
             {/* Project 1: Combiz Solutions */}
            <div className="project-card">
              <h3>Combiz Solutions (Enterprise SaaS CRM)</h3>
              <p>
                Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce. 
                Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.
              </p>
              <div className="project-tech">
                <span>Perfex CRM</span>
                <span>SaaS Architecture</span>
                <span>PHP & MySQL</span>
                <a href="https://combizsolutions.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('combiz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
             {/* Project 1: Aurra Health Kart (New Dual-Gateway E-Commerce) */}
            <div className="project-card">
              <h3>Aurra Health Kart (E-Commerce Platform)</h3>
              <p>
                Developed an industry-grade wellness e-commerce ecosystem. Engineered hybrid dual-payment routing channels by 
                fully integrating Razorpay API for seamless domestic UPI/Net-banking workflows and Stripe SDK to authorize secure international multi-currency transactions.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>Razorpay & Stripe</span>
                <span>MySQL</span>
                <a href="https://aurved.in/" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('aurra')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
            {/* Project 5: StreetBuzz */}
            <div className="project-card">
              <h3>StreetBuzz (Regional News & Media Portal)</h3>
              <p>
                Customized and scaled a native architecture real-time regional aggregator system. Optimized state-wise 
                dynamic news sorting modules and customized trending hashtag tracking filters.
              </p>
              <div className="project-tech">
                <span>Core PHP</span>
                <span>JavaScript</span>
                <span>Customization</span>
                <a href="https://streetbuzz.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('streetbuzz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
           

            {/* Project 6: Restro Genius */}
            <div className="project-card">
              <h3>Restro Genius (SaaS Restaurant Wallet)</h3>
              <p>
                Overhauled backend workflows by profiling query metrics. Customized multi-tenant admin control panels, 
                refactored subscription modules, and fixed live restaurant wallet balance bugs.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>Blade Engine</span>
                <span>Customization</span>
                <span>Bug Fixing</span>
                <a href="https://restrogenius.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('restro')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>

            {/* Project 7: Tripgare */}
            <div className="project-card">
              <h3>Tripgare (Flight Booking & Meta-Search)</h3>
              <p>
                Optimized and customized an online travel aggregator platform. Fixed major application routing, session 
                handling, and dynamic flight search result algorithms to ensure zero-downtime.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>jQuery & AJAX</span>
                <span>Customization</span>
                <a href="https://tripgare.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('tripgare')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
            
          </div>

          {/* Lightbox / Slider Modal */}
          {isOpen && (
            <div className="slider-modal-overlay" onClick={() => setIsOpen(false)}>
              <div className="slider-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="slider-close-btn" onClick={() => setIsOpen(false)}><FaTimes /></button>
                
                <button className="slider-arrow prev" onClick={prevSlide}><FaChevronLeft /></button>
                <div className="slider-image-container">
                  <img src={currentImages[currentIndex]} alt={`Screenshot ${currentIndex + 1}`} className="slider-main-img" />
                  <div className="slider-counter">{currentIndex + 1} / {currentImages.length}</div>
                </div>
                <button className="slider-arrow next" onClick={nextSlide}><FaChevronRight /></button>
              </div>
            </div>
          )}
        </section>
        <section id="game-project" className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-extrabold text-center mb-8">Featured Core Project</h2>
          
          {/* Game Component Injection Hook */}
          <PokemonGame />
          
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