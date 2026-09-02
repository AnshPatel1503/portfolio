// src/components/Skills.jsx
import React from 'react';
import { 
  SiPhp, 
  SiLaravel, 
  SiCodeigniter, 
  SiNextdotjs, 
  SiReact, 
  SiJavascript, 
  SiJquery, 
  SiMysql 
} from 'react-icons/si'; 
import { TbApi } from 'react-icons/tb';

const Skills = () => {
  const skillsData = [
    {
      id: 1,
      name: "PHP",
      description: "Developed dynamic web applications using core PHP and MVC structure with clean, modular code.",
      Icon: SiPhp,
    },
    {
      id: 2,
      name: "Laravel",
      description: "Built full-stack Laravel apps including APIs, authentication, database design, and blade templating.",
      Icon: SiLaravel,
    },
    {
      id: 3,
      name: "Codeigniter",
      description: "Created lightweight, high-performance applications using CodeIgniter with custom modules.",
      Icon: SiCodeigniter,
    },
    {
      id: 4,
      name: "Next.js",
      description: "Engineered SEO-optimized web apps using Server-Side Rendering (SSR), Static Site Generation (SSG), and optimized API routes.",
      Icon: SiNextdotjs,
    },
    {
      id: 5,
      name: "React",
      description: "Built responsive, high-performance Single Page Applications (SPAs) utilizing hooks, state management, and reusable UI components.",
      Icon: SiReact,
    },
    {
      id: 7,
      name: "JavaScript",
      description: "Implemented client-side logic, form validation, and event-driven programming.",
      Icon: SiJavascript,
    },
    {
      id: 8,
      name: "Jquery",
      description: "Used jQuery for DOM manipulation, animations, and AJAX requests to enhance UI interactivity.",
      Icon: SiJquery,
    },
    {
      id: 9,
      name: "MySQL",
      description: "Designed and optimized relational databases and complex queries for scalable web apps.",
      Icon: SiMysql,
    },
    {
      id: 10,
      name: "REST API",
      description: "Developed and consumed RESTful APIs for seamless integration between frontend and backend systems.",
      Icon: TbApi,
    },
  ];

  return (
    <section id="skills" className="px-[2%] py-12 border-t border-neutral-900 text-white justify-items-center text-center">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase text-center md:text-left">
        MY SKILLS
      </p>

      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-3 mb-8 text-center md:text-left">
        Technologies I Work With
      </h2>

      {/* Grid Layout Canvas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillsData.map(({ id, name, description, Icon }) => (
          <div 
            key={id} 
            className="group p-[30px] border border-[#292929] rounded-lg bg-neutral-950/20 transition-all duration-300 hover:border-emerald-400 hover:-translate-y-1.25 relative overflow-hidden block"
          >
            <div className="absolute right-[-30px] bottom-[-30px] text-neutral-800/15 group-hover:text-emerald-500/10 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 z-0">
              {/* Size w-32 h-32 se badhakar w-52 h-52 kar diya */}
              <Icon className="w-52 h-52" />
            </div>


            {/* FOREGROUND TEXT CONTENT: Explicit relative stacking index */}
            <div className="relative z-10 pointer-events-none">
              {/* Top Main Dynamic Small Icon */}
              
              
              {/* Heading Segment */}
              <h3 className="text-[22px] font-bold mb-2.5 text-white transition-colors duration-300 group-hover:text-emerald-400">
                {name}
              </h3>
              
              {/* Description Paragraph Block */}
              <p className="text-[#888] font-normal text-sm sm:text-base leading-[1.6]">
                {description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
