import React from 'react';
import { SiPhp, SiLaravel, SiCodeigniter, SiNextdotjs, SiReact, SiJavascript, SiJquery, SiMysql } from 'react-icons/si'; 
import { TbApi } from 'react-icons/tb';
const Skills = () => {
  return (
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
          <p>Engineered SEO-optimized web apps using Server-Side Rendering (SSR), Static Site Generation (SSG), and optimized API routes.</p>
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
  );
};

export default Skills;
