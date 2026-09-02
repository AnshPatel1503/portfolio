// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger icons ke liye

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-900 border-b border-neutral-800 text-white z-50 px-[2%] py-3 flex justify-between items-center transition-all duration-300">
      {/* Logo Wrapper */}
      <div className="flex-shrink-0">
        <img 
          src="./logo-2.png" 
          alt="Ansh Patel" 
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button 
        className="text-2xl md:hidden text-neutral-200 focus:outline-none z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Backdrop Overlay (Mobile only) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 md:hidden z-30 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navigation Container (Desktop links & Mobile Slide-out Menu) */}
      <div className={`
        fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-neutral-950 p-8 pt-24 shadow-2xl flex flex-col gap-8 transition-transform duration-300 ease-in-out z-40
        md:static md:h-auto md:w-auto md:max-w-none md:bg-transparent md:p-0 md:shadow-none md:flex-row md:items-center md:justify-between md:flex-1 md:ml-12
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Nav Links */}
        <nav className="flex flex-col gap-6 font-semibold text-xl text-neutral-300 md:flex-row md:gap-8 md:text-base md:mx-auto">
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Home</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">About</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Skills</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Experience</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Services</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Projects</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition-colors duration-200">Contact</a>
        </nav>

        {/* Action Buttons */}
        <nav className="flex flex-col gap-4 w-full md:flex-row md:w-auto md:gap-3 text-center text-sm font-medium">
          <a 
            href="/Ansh-Patel-Resume.pdf" 
            target="_blank" 
            onClick={() => setIsMenuOpen(false)} 
            className="px-4 py-2.5 rounded-lg border border-neutral-700 hover:border-amber-500 text-neutral-200 hover:text-amber-500 transition-all duration-200"
          >
            Download Resume
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)} 
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md shadow-amber-500/10 transition-all duration-200"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
