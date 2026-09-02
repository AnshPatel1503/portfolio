import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="section">
      <p className="section-subtitle">EXPERIENCE</p>

      <h2>My Professional Journey</h2>

      <div className="experience-list">
        {/* Current Role */}
        <div className="experience-item">
          <div className="experience-year">
            March 2026 — Present
          </div>

          <div className="experience-content">
            <h3>Freelance Full Stack Developer</h3>

            <h4>
              <a href="https://ymcoders.in/" target="_blank" rel="noopener noreferrer">
                YMCODERS Technologies Pvt. Ltd.
              </a>
            </h4>

            <p>
              Worked as a Freelance Full Stack Developer, building and maintaining
              modern web applications using Laravel, React, Next.js, PHP, and MySQL.
              Delivered scalable frontend interfaces, backend APIs, database-driven
              applications, and third-party service integrations.
            </p>

            <ul>
              <li>
                Developed responsive and reusable user interfaces using React and
                Next.js for modern web applications.
              </li>
              <li>
                Built scalable RESTful APIs, backend services, authentication systems,
                and business logic using Laravel and PHP.
              </li>
              <li>
                Designed and optimized MySQL databases, queries, relationships, and
                data-driven application workflows.
              </li>
              <li>
                Integrated third-party APIs, payment gateways, webhooks, and external
                services into Laravel and React-based applications.
              </li>
              <li>
                Worked across the complete development lifecycle, from frontend
                development and API integration to backend development and deployment.
              </li>
            </ul>
          </div>
        </div>

        {/* Mid Level Role */}
        <div className="experience-item">
          <div className="experience-year">
            Aug 2025 — Feb 2026
          </div>

          <div className="experience-content">
            <h3>Laravel Developer</h3>
            <h4>
              <a href="https://swasoftech.com/" target="_blank" rel="noopener noreferrer">
                Swa Softech Pvt. Ltd.
              </a>
            </h4>

            <p>
              Focused on backend performance tuning, secure database design, and modular MVC application structure development.
            </p>

            <ul>
              <li>Developed granular role-based access control (RBAC) modules for multi-tenant admin dashboards.</li>
              <li>Utilized Laravel Eloquent ORM to construct intricate database migrations and seed profiles.</li>
              <li>Collaborated on frontend modernization projects by introducing AJAX and jQuery dynamic loading.</li>
              <li>Integrated PayPal SDK into e-commerce checkout flows for secure international user transactions.</li>        
              <li>Implemented Razorpay Payment Gateway API for secure UPI, net banking, and instant domestic payment processing.</li>
              <li>Implemented system-wide automated data sanitization and strict input verification middleware.</li>
            </ul>
          </div>
        </div>

        {/* Early Career Role */}
        <div className="experience-item">
          <div className="experience-year">
            Aug 2023 — Aug 2025
          </div>

          <div className="experience-content">
            <h3>PHP Developer</h3>
            <h4>
              <a href="https://webvire.com/" target="_blank" rel="noopener noreferrer">
                WebVire Software Solutions
              </a>
            </h4>

            <p>
              Maintained, debugged, and optimized legacy PHP systems while assisting in early-stage CodeIgniter development.
            </p>

            <ul>
              <li>Maintained custom web platforms built natively on core PHP and CodeIgniter architectures.</li>
              <li>Translated manual workflows into automated dashboard analytics using jQuery UI engines.</li>
              <li>Integrated Stripe Payment Gateway with webhooks for handling recurring subscriptions, automatic billing, and multi-currency transactions.</li>
              <li>Debugged persistent database deadlocks and resolved application security vulnerabilities.</li>
              <li>Authored technical documentation detailing code updates, architecture maps, and schemas.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
