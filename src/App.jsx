import "./App.css";

function App() {
  return (
    <div className="portfolio">
      <header className="navbar">
        <div className="logo">Ansh<span>.</span></div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="nav-btn">
          Hire Me
        </a>
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
          </div>

          <div className="hero-card">
            <div className="code-card">
              <div className="code-header">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <pre>
{`const developer = {
  name: "Ansh Patel",
  role: "Web Developer",
  skills: [
    "Laravel",
    "React",
    "PHP",
    "JavaScript"
  ]
};`}
              </pre>
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
            Have a project or job opportunity? Feel free to get in touch.
          </p>

          <a href="mailto:anantansh1503@gmail.com" className="primary-btn">
            Send Me an Email
          </a>
        </section>
      </main>

      <footer>
        <p>© 2026 Ansh Patel. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;