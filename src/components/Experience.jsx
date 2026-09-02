// src/components/Experience.jsx
import React from 'react';

const Experience = () => {
  // 1. Dynamic Experience Data Matrix Array Loop Optimization Ke Liye
  const experienceData = [
    {
      id: 1,
      year: "March 2026 — Present",
      role: "Freelance Full Stack Developer",
      companyName: "YMCODERS Technologies Pvt. Ltd.",
      companyUrl: "https://ymcoders.in/",
      description: "Worked as a Freelance Full Stack Developer, building and maintaining modern web applications using Laravel, React, Next.js, PHP, and MySQL. Delivered scalable frontend interfaces, backend APIs, database-driven applications, and third-party service integrations.",
      bullets: [
        "Developed responsive and reusable user interfaces using React and Next.js for modern web applications.",
        "Built scalable RESTful APIs, backend services, authentication systems, and business logic using Laravel and PHP.",
        "Designed and optimized MySQL databases, queries, relationships, and data-driven application workflows.",
        "Integrated third-party APIs, payment gateways, webhooks, and external services into Laravel and React-based applications.",
        "Worked across the complete development lifecycle, from frontend development and API integration to backend development and deployment."
      ]
    },
    {
      id: 2,
      year: "Aug 2025 — Feb 2026",
      role: "Laravel Developer",
      companyName: "Swa Softech Pvt. Ltd.",
      companyUrl: "https://swasoftech.com/",
      description: "Focused on backend performance tuning, secure database design, and modular MVC application structure development.",
      bullets: [
        "Developed granular role-based access control (RBAC) modules for multi-tenant admin dashboards.",
        "Utilized Laravel Eloquent ORM to construct intricate database migrations and seed profiles.",
        "Collaborated on frontend modernization projects by introducing AJAX and jQuery dynamic loading.",
        "Integrated PayPal SDK into e-commerce checkout flows for secure international user transactions.",
        "Implemented Razorpay Payment Gateway API for secure UPI, net banking, and instant domestic payment processing.",
        "Implemented system-wide automated data sanitization and strict input verification middleware."
      ]
    },
    {
      id: 3,
      year: "Aug 2023 — Aug 2025",
      role: "PHP Developer",
      companyName: "WebVire Software Solutions",
      companyUrl: "https://webvire.com/",
      description: "Maintained, debugged, and optimized legacy PHP systems while assisting in early-stage CodeIgniter development.",
      bullets: [
        "Maintained custom web platforms built natively on core PHP and CodeIgniter architectures.",
        "Translated manual workflows into automated dashboard analytics using jQuery UI engines.",
        "Integrated Stripe Payment Gateway with webhooks for handling recurring subscriptions, automatic billing, and multi-currency transactions.",
        "Debugged persistent database deadlocks and resolved application security vulnerabilities.",
        "Authored technical documentation detailing code updates, architecture maps, and schemas."
      ]
    }
  ];

  return (
    <section id="experience" className="px-[2%] py-12 border-t border-neutral-900 text-white">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase">
        EXPERIENCE
      </p>

      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-3 mb-8">
        My Professional Journey
      </h2>

      {/* .experience-list container */}
      <div className="mt-1 space-y-10">
        {experienceData.map((item) => (
          /* .experience-item (Responsive Grid Layout: 180px 1fr on Desktop, 1fr on Mobile) */
          <div 
            key={item.id} 
            className="grid grid-cols-1 [minmax(0,1fr)] min-[651px]:grid-cols-[180px_1fr] gap-4 min-[651px]:gap-10 border-b border-neutral-900/50 pb-8 last:border-b-0"
          >
            {/* .experience-year */}
            <div className="text-emerald-400 text-sm font-semibold tracking-wide">
              {item.year}
            </div>

            {/* .experience-content area */}
            <div>
              {/* Role Title */}
              <h3 className="text-2xl min-[651px]:text-[26px] font-bold text-white mb-1">
                {item.role}
              </h3>

              {/* Company Hyperlink Subtitle */}
              <h4 className="text-neutral-400 text-[15px] font-normal mb-5">
                <a 
                  href={item.companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors duration-200 underline decoration-neutral-800 hover:decoration-emerald-400"
                >
                  {item.companyName}
                </a>
              </h4>

              {/* Job Description Paragraph */}
              <p className="text-neutral-400 text-base leading-[1.7] mb-5 font-normal">
                {item.description}
              </p>

              {/* Bullet Points List Block */}
              <ul className="list-disc pl-5 space-y-2 max-w-4xl">
                {item.bullets.map((bullet, idx) => (
                  <li 
                    key={idx} 
                    className="text-[#888] text-sm sm:text-base leading-[1.8] font-normal"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
