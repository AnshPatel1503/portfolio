import React from 'react';

const About = () => {
  return (
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
  );
};

export default About;
