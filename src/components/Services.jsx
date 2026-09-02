import React from 'react';

const Services = () => {
  return (
    <section id="services" className="section">
      <p className="section-subtitle">WHAT I DO</p>

      <h2>Services I Can Provide</h2>

      <div className="services-grid">
        <div className="service-card">
          <h3>Web Development</h3>
          <p>
            Custom, responsive and scalable web applications built with
            modern technologies, clean architecture and maintainable code.
          </p>
        </div>

        <div className="service-card">
          <h3>Laravel Development</h3>
          <p>
            Laravel applications, REST APIs, authentication systems,
            admin dashboards, CRUD modules, database integration and
            business logic development.
          </p>
        </div>

        <div className="service-card">
          <h3>React & Next.js Development</h3>
          <p>
            Modern and responsive frontend applications using React and
            Next.js with reusable components, API integration and
            optimized user experiences.
          </p>
        </div>

        <div className="service-card">
          <h3>Payment Integration</h3>
          <p>
            Integration of secure payment gateways such as Razorpay,
            PayPal and Stripe with checkout flows, webhooks, payment
            verification and transaction handling.
          </p>
        </div>

        <div className="service-card">
          <h3>REST API Development</h3>
          <p>
            Secure and scalable REST APIs with authentication,
            authorization, validation, database relationships and
            seamless frontend integration.
          </p>
        </div>

        <div className="service-card">
          <h3>Bug Fixing & Troubleshooting</h3>
          <p>
            Debugging and resolving frontend, backend, API, database,
            authentication and integration-related issues to improve
            application stability and performance.
          </p>
        </div>

        <div className="service-card">
          <h3>Database & Performance Optimization</h3>
          <p>
            MySQL database optimization, query improvements, relationships,
            indexing and backend performance tuning for faster applications.
          </p>
        </div>

        <div className="service-card">
          <h3>API & Third-Party Integration</h3>
          <p>
            Integration of third-party APIs, webhooks, external services,
            authentication providers and business automation into existing
            applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
