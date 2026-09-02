// src/components/Services.jsx
import React from 'react';

const Services = () => {
  // 1. Dynamic Data Array Code Duplication Se Bachne Ke Liye
  const servicesData = [
    {
      id: "01",
      title: "Web Development",
      description: "Custom, responsive and scalable web applications built with modern technologies, clean architecture and maintainable code."
    },
    {
      id: "02",
      title: "Laravel Development",
      description: "Laravel applications, REST APIs, authentication systems, admin dashboards, CRUD modules, database integration and business logic development."
    },
    {
      id: "03",
      title: "React & Next.js Development",
      description: "Modern and responsive frontend applications using React and Next.js with reusable components, API integration and optimized user experiences."
    },
    {
      id: "04",
      title: "Payment Integration",
      description: "Integration of secure payment gateways such as Razorpay, PayPal and Stripe with checkout flows, webhooks, payment verification and transaction handling."
    },
    {
      id: "05",
      title: "REST API Development",
      description: "Secure and scalable REST APIs with authentication, authorization, validation, database relationships and seamless frontend integration."
    },
    {
      id: "06",
      title: "Bug Fixing & Troubleshooting",
      description: "Debugging and resolving frontend, backend, API, database, authentication and integration-related issues to improve application stability and performance."
    },
    {
      id: "07",
      title: "Database & Performance Optimization",
      description: "MySQL database optimization, query improvements, relationships, indexing and backend performance tuning for faster applications."
    },
    {
      id: "08",
      title: "API & Third-Party Integration",
      description: "Integration of third-party APIs, webhooks, external services, authentication providers and business automation into existing applications."
    }
  ];

  return (
    <section id="services" className="px-[2%] py-6 border-t border-neutral-900 text-white justify-items-center text-center">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase">
        WHAT I DO
      </p>

      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-1 mb-4">
        Services I Can Provide
      </h2>

      {/* 2. Optimized Loop Framework (Responsive Grid Setup: 2 Cols on Desktop, 1 on Mobile) */}
      <div className="grid grid-cols-1 min-[651px]:grid-cols-2 gap-5">
        {servicesData.map(({ id, title, description }) => (
          /* .service-card core unit */
          <div 
            key={id} 
            className="group p-[35px] bg-[#111] border border-[#292929] rounded-[10px] transition-all duration-300 hover:border-emerald-400 hover:-translate-y-1.5"
          >
            
            {/* .service-card h3 target style heading */}
            <h3 className="text-2xl font-bold text-white mb-[15px] transition-colors duration-300 group-hover:text-emerald-400">
              {title}
            </h3>

            {/* .service-card p target description */}
            <p className="text-[#888] text-base leading-[1.7] font-normal">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
