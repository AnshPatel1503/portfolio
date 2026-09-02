
// src/components/Projects.jsx
import React, { useState } from 'react';
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {  
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Screenshots Assets Map Matrix
  const projectScreenshots = {
    aurra: ["aurra1.png","aurra2.png", "aurra3.png","aurra4.png","aurra5.png","aurra6.png"],
    combiz: ["immiforms1.png","immiforms2.png","immiforms3.png","immiforms5.png","immiforms4.png"],
    samrit: ["samrit1.png","samrit2.png","samrit3.png","samrit4.png","samrit5.png","samrit6.png","samrit7.png"],
    perfex: ["perfexcrm1.png","perfexcrm2.png","perfexcrm3.png","perfexcrm4.png","perfexcrm5.png","perfexcrm6.png","perfexcrm7.png","perfexcrm8.png"],
    mppl: ["mppl0.png","mppl1.png","mppl2.png","mppl3.png","mppl4.png"],
    streetbuzz: ["sb1.png","sb2.png","sb3.png","sb4.png","sb5.png","sb6.png"],
    restro: ["Restro1.png","Restro2.png","Restro3.png","Restro4.png","Restro5.png","Restro6.png"],
    tripgare: ["Tripgare1.png","Tripgare2.png","Tripgare3.png","Tripgare4.png"],
    immiforms: ["immiforms1.png","immiforms2.png","immiforms3.png","immiforms4.png","immiforms5.png"]
  };

  // 2. Loop Array Data Architecture
  const projectsData = [
    {
      id: 'mppl',
      title: 'MPPL - Ayurvedic Wellness & MLM Platform',
      description: 'Developed an end-to-end Multi-Level Marketing (MLM) application. Built secure distributor registration portals, nested network tree structures, real-time commission tracking, and wallet systems.',
      tech: ['Laravel', 'MySQL', 'Bootstrap & jQuery'],
      link: 'https://mppl.life',
      linkLabel: 'Live Project'
    },
    {
      id: 'samrit',
      title: 'Samrit Food Creation & Development',
      description: 'Engineered a high-performance food consultancy platform. Implemented an automated Nutrition Intelligence module for recipe micro-nutrient analysis and dynamic packaging-ready AI nutrition fact labels.',
      tech: ['Next.js', 'Json', 'Tailwind CSS'],
      link: 'https://samritfood.in',
      linkLabel: 'Live Project'
    },
    {
      id: 'perfex',
      title: 'Perfex CRM - Custom Module Development',
      description: 'Successfully customized and deployed 3 core modules within the CodeIgniter 3 architecture. Refactored backend business workflows, automated invoice generation PDF engines, and granular RBAC tasks.',
      tech: ['CodeIgniter 3', 'Perfex CRM', 'PHP & MySQL', 'Jquery'],
      link: 'https://perfexcrm.com',
      linkLabel: 'Platform Link'
    },
    {
      id: 'combiz',
      title: 'Combiz Solutions (Enterprise SaaS CRM)',
      description: 'Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce.Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.',
      tech: ['Perfex CRM', 'SaaS Architecture', 'Codeigniter 3 & PHP & MySQL'],
      link: 'https://combizsolutions.co.in',
      linkLabel: 'Live Project'
    },
    {
      id: 'aurra',
      title: 'Aurra Health Kart (E-Commerce Platform)',
      description: 'Developed an industry-grade wellness e-commerce ecosystem. Engineered hybrid dual-payment routing channels by fully integrating Razorpay API for seamless domestic UPI/Net-banking workflows and Stripe SDK to authorize secure international multi-currency transactions.',
      tech: ['Laravel', 'Razorpay & Stripe', 'MySQL'],
      link: 'https://aurved.in',
      linkLabel: 'Live Project'
    },
    {
      id: 'streetbuzz',
      title: 'StreetBuzz (Regional News & Media Portal)',
      description: 'Customized and scaled a native architecture real-time regional aggregator system. Optimized state-wise dynamic news sorting modules and customized trending hashtag tracking filters.',
      tech: ['Core PHP', 'JavaScript', 'Customization'],
      link: 'https://streetbuzz.co.in',
      linkLabel: 'Live Project'
    },
    {
      id: 'restro',
      title: 'Restro Genius (SaaS Restaurant Wallet)',
      description: 'Overhauled backend workflows by profiling query metrics. Customized multi-tenant admin control panels,refactored subscription modules, and fixed live restaurant wallet balance bugs.',
      tech: ['Laravel', 'Blade Engine', 'Customization', 'Bug Fixing'],
      link: 'https://restrogenius.co.in',
      linkLabel: 'Live Project'
    },
    {
      id: 'tripgare',
      title: 'Tripgare (Flight Booking & Meta-Search)',
      description: 'Optimized and customized an online travel aggregator platform. Fixed major application routing, session handling, and dynamic flight search result algorithms to ensure zero-downtime.',
      tech: ['Laravel', 'jQuery & AJAX', 'Customization'],
      link: 'https://tripgare.com',
      linkLabel: 'Live Project'
    },
    {
      id: 'immiforms',
      title: 'IMMIMATE AI (Enterprise SaaS CRM)',
      description: 'Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce.Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.',
      tech: ['Perfex CRM', 'SaaS Architecture', 'Codeigniter 3 & PHP & MySQL', 'Customization'],
      link: 'https://immiforms.ai/',
      linkLabel: 'Live Project'
    }
  ];

  const openSlider = (projectKey) => {
    setCurrentImages(projectScreenshots[projectKey] || []);
    setCurrentIndex(0);
    setIsOpen(true);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  return (
    <section id="projects" className="px-[2%] py-12 border-t border-neutral-900 text-white justify-items-center text-center">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase">MY WORK</p>
      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-3 mb-8">Featured Projects</h2>      
      
     
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[25px]">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="group relative p-30 bg-[#111] border border-[#292929] rounded-[10px] transition-all duration-300 hover:border-emerald-400 hover:-translate-y-2 flex flex-col justify-between"
            style={{ padding: '30px' }}
          >
            <div>
              <h3 className="text-[22px] font-bold text-white mb-[15px] group-hover:text-emerald-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-[#999] font-normal text-sm sm:text-base leading-[1.7] mb-5">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-auto">
              {project.tech.map((t, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-[5px] bg-[#1a1a1a] text-[#aaa] rounded-[4px] text-[12px] font-medium leading-none"
                >
                  {t}
                </span>
              ))}
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-3 py-[5px] bg-[#0070f3] text-white rounded-[6px] text-[12px] font-medium text-decoration-none transition-colors duration-200 hover:bg-[#0056b3] leading-none"
              >
                {project.linkLabel}
              </a>
              
              <button 
                onClick={() => openSlider(project.id)} 
                className="inline-flex items-center justify-center px-2.5 py-[5px] bg-[#e2e8f0] text-[#1e293b] rounded-[6px] text-[14px] cursor-pointer transition-all duration-200 hover:bg-[#0f172a] hover:text-white hover:scale-105"
                title="View Screenshots"
              >
                <FaEye />
              </button>
            </div> 
          </div>
        ))}
      </div>

      
            {/* Lightbox Modal Slider Subsystem Overlay */}
      {isOpen && currentImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/85 z-[9999] flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* .slider-modal-content frame box overlay wrapper layer */}
          <div 
            className="relative w-[90%] max-w-[850px] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          > 
            {/* Close button */}
            <button 
              className="absolute right-2.5 md:right-0 top-[-35px] md:top-[-45px] bg-none border-none text-white hover:text-emerald-400 text-2xl cursor-pointer p-1" 
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
            
            {/* Left arrow */}
            <button 
              className="absolute left-2.5 md:left-[-60px] bg-white/15 hover:bg-white/40 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer text-lg transition-colors z-10" 
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </button>

            {/* .slider-image-container */}
            <div className="w-full rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
              {/* FIXED STRING INTERPOLATION HERE */}
              <img 
                src={`./${currentImages[currentIndex]}`} 
                alt={`Screenshot ${currentIndex + 1}`} 
                className="w-full h-auto max-h-[75vh] block object-contain" 
              />
              {/* Counter status label */}
              <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-[20px] text-[13px]">
                {currentIndex + 1} / {currentImages.length}
              </div>
            </div>

            {/* Right arrow */}
            <button 
              className="absolute right-2.5 md:right-[-60px] bg-white/15 hover:bg-white/40 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer text-lg transition-colors z-10" 
              onClick={nextSlide}
            >
              <FaChevronRight />
            </button> 
          </div>
        </div> 
      )}  
    </section>
  );
};

export default Projects;


