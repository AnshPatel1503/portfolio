import React, { useState } from 'react';
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectScreenshots = {
    aurra: [
      "aurra1.png",
      "aurra2.png",
      "aurra3.png",
      "aurra4.png",
      "aurra5.png",
      "aurra6.png",
      
    ],
    combiz: [
       "immiforms1.png",
      "immiforms2.png",
      "immiforms3.png",
      "immiforms5.png",
      "immiforms4.png"
    ],
    samrit: [
      "samrit1.png",
      "samrit2.png",
      "samrit3.png",
      "samrit4.png",
      "samrit5.png",
      "samrit6.png",
      "samrit7.png"      
    ],
    perfex: [
      "perfexcrm1.png",
      "perfexcrm2.png",
      "perfexcrm3.png",
      "perfexcrm4.png",
      "perfexcrm5.png",
      "perfexcrm6.png",
      "perfexcrm7.png",
      "perfexcrm8.png"
    ],
    mppl: [
      "mppl0.png",
      "mppl1.png",
      "mppl2.png",
      "mppl3.png",
      "mppl4.png",
    ],
    streetbuzz: [
      "sb1.png",
      "sb2.png",
      "sb3.png",
      "sb4.png",
      "sb5.png",
      "sb6.png"
    ],
    restro: [
      "Restro1.png",
      "Restro2.png",
      "Restro3.png",
      "Restro4.png",
      "Restro5.png",
      "Restro6.png",
    ],
    tripgare: [
      "Tripgare1.png",
      "Tripgare2.png",
      "Tripgare3.png",
      "Tripgare4.png"
    ],
    immiforms: [
      "immiforms1.png",
      "immiforms2.png",
      "immiforms3.png",
      "immiforms4.png",
      "immiforms5.png"
    ]
  };

  const openSlider = (projectKey) => {
    setCurrentImages(projectScreenshots[projectKey]);
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
    <section id="projects" className="section">
      <p className="section-subtitle">MY WORK</p>
      <h2>Featured Projects</h2>
      
      <div className="projects-grid"> 
        {/* Project 1: MPPL */}
        <div className="project-card">
          <h3>MPPL - Ayurvedic Wellness & MLM Platform</h3>
          <p>Developed an end-to-end Multi-Level Marketing (MLM) application. Built secure distributor registration portals, nested network tree structures, real-time commission tracking, and wallet systems.</p>
          <div className="project-tech">
            <span>Laravel</span>
            <span>MySQL</span>
            <span>Bootstrap & jQuery</span>
            <a href="https://mppl.life" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('mppl')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div> 
        </div>           

        {/* Project 2: Samrit Food */}
        <div className="project-card">
          <h3>Samrit Food Creation & Development</h3>
          <p>Engineered a high-performance food consultancy platform. Implemented an automated Nutrition Intelligence module for recipe micro-nutrient analysis and dynamic packaging-ready AI nutrition fact labels.</p>
          <div className="project-tech">
            <span>Next.js</span>
            <span>Json</span>
            <span>Tailwind CSS</span>
            <a href="https://samritfood.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('samrit')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>              

        {/* Project 3: Perfex CRM Custom */}
        <div className="project-card">
          <h3>Perfex CRM - Custom Module Development</h3>
          <p>Successfully customized and deployed 3 core modules within the CodeIgniter 3 architecture. Refactored backend business workflows, automated invoice generation PDF engines, and granular RBAC tasks.</p>
          <div className="project-tech">
            <span>CodeIgniter 3</span>
            <span>Perfex CRM</span>
            <span>PHP & MySQL</span>
            <span>Jquery</span>
            <a href="https://perfexcrm.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Platform Link</a>
            <button onClick={() => openSlider('perfex')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 4: Combiz Solutions */}
        <div className="project-card">
          <h3>Combiz Solutions (Enterprise SaaS CRM)</h3>
          <p>Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce.Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.</p>
          <div className="project-tech">
            <span>Perfex CRM</span>
            <span>SaaS Architecture</span>
            <span>Codeigniter 3 & PHP & MySQL</span>
            <a href="https://combizsolutions.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('combiz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 5: Aurra Health Kart */}
        <div className="project-card">
          <h3>Aurra Health Kart (E-Commerce Platform)</h3>
          <p>Developed an industry-grade wellness e-commerce ecosystem. Engineered hybrid dual-payment routing channels by fully integrating Razorpay API for seamless domestic UPI/Net-banking workflows and Stripe SDK to authorize secure international multi-currency transactions.</p>
          <div className="project-tech">
            <span>Laravel</span>
            <span>Razorpay & Stripe</span>
            <span>MySQL</span>
            <a href="https://aurved.in/" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('aurra')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 6: StreetBuzz */}
        <div className="project-card">
          <h3>StreetBuzz (Regional News & Media Portal)</h3>
          <p>Customized and scaled a native architecture real-time regional aggregator system. Optimized state-wise dynamic news sorting modules and customized trending hashtag tracking filters.</p>
          <div className="project-tech">
            <span>Core PHP</span>
            <span>JavaScript</span>
            <span>Customization</span>
            <a href="https://streetbuzz.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('streetbuzz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 7: Restro Genius */}
        <div className="project-card">
          <h3>Restro Genius (SaaS Restaurant Wallet)</h3>
          <p>Overhauled backend workflows by profiling query metrics. Customized multi-tenant admin control panels,refactored subscription modules, and fixed live restaurant wallet balance bugs.</p>
          <div className="project-tech">
            <span>Laravel</span>
            <span>Blade Engine</span>
            <span>Customization</span>
            <span>Bug Fixing</span>
            <a href="https://restrogenius.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('restro')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 8: Tripgare */}
        <div className="project-card">
          <h3>Tripgare (Flight Booking & Meta-Search)</h3>
          <p>Optimized and customized an online travel aggregator platform. Fixed major application routing, session handling, and dynamic flight search result algorithms to ensure zero-downtime.</p>
          <div className="project-tech">
            <span>Laravel</span>
            <span>jQuery & AJAX</span>
            <span>Customization</span>
            <a href="https://tripgare.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('tripgare')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
          </div>
        </div>

        {/* Project 9: IMMIMATE AI */}
        <div className="project-card">
          <h3>IMMIMATE AI (Enterprise SaaS CRM)</h3>
          <p>Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce.Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.</p>
          <div className="project-tech"> 
            <span>Perfex CRM</span>
            <span>SaaS Architecture</span> 
            <span>Codeigniter 3 & PHP & MySQL</span> 
            <span>Customization</span>
            <a href="https://immiforms.ai/" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
            <button onClick={() => openSlider('immiforms')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button> 
          </div>
        </div>
      </div>

      {/* Slider Modal */}
      {isOpen && (
        <div className="slider-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="slider-modal-content" onClick={(e) => e.stopPropagation()}> 
            <button className="slider-close-btn" onClick={() => setIsOpen(false)}><FaTimes /></button>
            <button className="slider-arrow prev" onClick={prevSlide}><FaChevronLeft /></button>
            <div className="slider-image-container">
              <img src={currentImages[currentIndex]} alt={`Screenshot ${currentIndex + 1}`} className="slider-main-img" />
              <div className="slider-counter">{currentIndex + 1} / {currentImages.length}</div>
            </div>
            <button className="slider-arrow next" onClick={nextSlide}><FaChevronRight /></button> 
          </div>
        </div> 
      )}  
    </section>
  );
};

export default Projects;
