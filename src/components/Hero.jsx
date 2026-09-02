import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">HELLO, I'M</p>

        <h1>
          Ansh Patel<br />
          <span>Web Developer</span>
        </h1>

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
          <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/anshpatel-dev/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="profile-wrapper">
          <div className="profile-glow"></div>
          <img 
            src="./profile.png" 
            alt="Ansh Patel Portfolio - Full Stack Web Developer" 
            className="profile-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
