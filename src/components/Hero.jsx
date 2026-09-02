// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="min-h-[calc(100vh-80px)] px-[2%] py-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-[60px] pt-24">
      {/* Content Area */}
      <div className="max-w-[650px] w-full text-center lg:text-left">
        <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase">
          HELLO, I'M
        </p>

        <h1 className="text-[clamp(42px,6vw,76px)] font-black text-white leading-[1.05] mt-4 mb-6">
          Ansh Patel<br />
          <span className="text-emerald-400">Web Developer</span>
        </h1>

        <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-[600px] mx-auto lg:mx-0">
          Full Stack Developer specializing in Laravel, Codeigniter, React and Next.js.
          I build scalable web applications, REST APIs, admin dashboards
          and seamless digital experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-9">
          <a href="#projects" className="inline-block bg-emerald-400 text-neutral-950 px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-500 transition-colors duration-200">
            View Projects
          </a>
          <a href="#contact" className="inline-block border border-neutral-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-200">
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center lg:justify-start gap-6 mt-8 text-neutral-400 font-medium">
          <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors duration-200">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/anshpatel-dev/" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors duration-200">
            LinkedIn ↗
          </a>
        </div>
      </div>

       {/* Profile Card Layout Framework - 100% Exact Matching Your CSS */}
      <div className="w-full flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
        {/* .profile-wrapper (380x380px grid container) */}
        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
          
          {/* .profile-glow (Green neon ring layer behind image) */}
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-emerald-400/50 shadow-[0_0_80px_rgba(16,185,129,0.15)] animate-pulse"></div>
          
          {/* .profile-image (Perfect circle image with thick dark dark border) */}
          <img 
            src="./profile.png" 
            alt="Ansh Patel Portfolio - Full Stack Web Developer" 
            className="relative w-[230px] h-[230px] sm:w-[310px] sm:h-[310px] object-cover rounded-full border-4 sm:border-[5px] border-[#111] shadow-xl"
          />
          
        </div>
      </div>

    </section>
  );
};

export default Hero;
