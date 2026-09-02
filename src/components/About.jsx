// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="px-[2%] py-12 border-t border-neutral-900 text-white">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase justify-items-center text-center">
        ABOUT ME
      </p>

      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-3 mb-6 leading-tight justify-items-center text-center">
        Full Stack Developer building scalable web applications.
      </h2>

      <div className="space-y-4 justify-items-center text-center">
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
          I am a Full Stack Developer with professional experience in PHP,
          Laravel, React, Next.js, JavaScript and MySQL. I specialize in
          developing scalable backend systems, RESTful APIs, responsive
          frontend applications and database-driven platforms.
        </p>

        <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
          I have worked on e-commerce platforms, payment gateway integrations,
          admin dashboards, authentication systems, API integrations and
          business-focused web applications.
        </p>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 pt-8 justify-items-center text-center mx-auto max-w-2xl">
        <div className="flex flex-col gap-1">
          <strong className="text-3xl md:text-4xl font-extrabold text-emerald-400">2+</strong>
          <span className="text-neutral-400 text-sm font-medium">Years Experience</span>
        </div>

        <div className="flex flex-col gap-1">
          <strong className="text-3xl md:text-4xl font-extrabold text-emerald-400">10+</strong>
          <span className="text-neutral-400 text-sm font-medium">Projects</span>
        </div>

        <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
          <strong className="text-3xl md:text-4xl font-extrabold text-emerald-400">8+</strong>
          <span className="text-neutral-400 text-sm font-medium">Technologies</span>
        </div>  
      </div>
    </section>
  );
};

export default About;
