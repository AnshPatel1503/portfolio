import React from 'react';

const Navbar = () => {
  return (
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
          Download Resume
        </a>
        <a href="#contact" className="nav-btn">
          Hire Me
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
