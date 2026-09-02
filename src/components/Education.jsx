// src/components/Education.jsx
import React from 'react';

const Education = () => {
  const educationData = [
    {
      id: 1,
      title: 'Internship',
      subtitle: 'Softpro India Computer Technologies (P) Ltd.',
      details: 'Diploma Student / Intern (Jul 2022 - Oct 2022)',
      badge: 'LATEST',
      icon: (
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.4V14.15m16.5 0c.49-.396.75-.989.75-1.613V9.15c0-.621-.504-1.125-1.125-1.125H18.75m-15 0H4.875A1.125 1.125 0 0 0 3.75 9.15v3.387c0 .624.26 1.217.75 1.613m15 0a24.585 24.585 0 0 1-15 0m15 0V8.25m-15 4.3v-4.3m1.5-3h12a1.5 1.5 0 0 1 1.5 1.5V6a1.5 1.5 0 0 1-1.5 1.5H5.25A1.5 1.5 0 0 1 3.75 6v-.75A1.5 1.5 0 0 1 5.25 3.75Z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Diploma',
      subtitle: 'Jawaharlal Nehru Polytechnic',
      details: 'Computer Science & Engineering (2020 - 2023)',
      badge: null,
      icon: (
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425-4.761 1.146 1.146 0 0 1 1.931-1.28c.67.974 1.352 1.97 2.029 2.975m11.522 3.066a50.619 50.619 0 0 1 2.426-4.761 1.146 1.146 0 0 0-1.93-1.28c-.67.974-1.352 1.97-2.03 2.975m-12.113 0a48.654 48.654 0 0 1 14.086 0m-14.086 0A49.54 49.54 0 0 1 12 11.25c2.597 0 5.117-.196 7.574-.573m0 0V5.25m0 0a2.25 2.25 0 1 0-4.5 0M12 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
        </svg>
      )
    },
    {
      id: 3,
      title: '80.8%',
      subtitle: 'Sita Inter College',
      details: 'Intermediate (12th Grade) | UP Board (2018 - 2020)',
      badge: null,
      icon: (
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      )
    },
    {
      id: 4,
      title: '81.3%',
      subtitle: 'Ram Sagar Verma Public School',
      details: 'High School (10th Grade) | UP Board (2016 - 2018)',
      badge: null,
      icon: (
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-16.25v16.25" />
        </svg>
      )
    }
  ];

  return (
    <section id="education" className="px-[2%] py-12 border-t border-neutral-900 font-sans text-center text-white">
      <div className="w-full mx-auto">
        
        {/* .edu-pill (Indigo small top pill) */}
        <div className="inline-flex items-center gap-1.5 bg-[#eef2ff] border border-[#e0e7ff] text-[#4f46e5] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425-4.761 1.146 1.146 0 0 1 1.931-1.28c.67.974 1.352 1.97 2.029 2.975m11.522 3.066a50.619 50.619 0 0 1 2.426-4.761 1.146 1.146 0 0 0-1.93-1.28c-.67.974-1.352 1.97-2.03 2.975m-12.113 0a48.654 48.654 0 0 1 14.086 0m-14.086 0A49.54 49.54 0 0 1 12 11.25c2.597 0 5.117-.196 7.574-.573m0 0V5.25" />
          </svg>
          Education
        </div>

       
        <p className="text-neutral-400 text-base max-w-[600px] mx-auto mb-10">
          My educational journey and academic achievements
        </p>

        {/* .edu-grid (Responsive Grid Matrix: 1 col on Mobile, 2 on Tablet, 4 on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationData.map((item) => (
            /* .edu-card unit wrapper */
            <div 
              key={item.id} 
              className="group relative border border-neutral-800 rounded-[24px] p-8 px-6 bg-neutral-950/20 backdrop-blur-sm shadow-md flex flex-col items-center transition-all duration-300 hover:-translate-y-1.25 hover:border-neutral-700 hover:shadow-[0_20px_25px_-5px_rgba(79,70,229,0.1),0_8px_10px_-6px_rgba(79,70,229,0.05)]"
            >
              
              {/* .edu-badge (Orange LATEST pill badge) */}
              {item.badge && (
                <span className="absolute top-4 right-4 bg-[#f97316] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase z-10 animate-pulse">
                  {item.badge}
                </span>
              )}

              {/* .edu-icon-circle (Purple Solid Icon Badge) */}
              <div className="w-16 h-16 bg-[#4f46e5] rounded-full flex items-center justify-center mb-6 shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)] transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* .edu-content text framework area */}
              <div className="flex-1 flex flex-col justify-center w-full">
                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <h4 className="text-neutral-300 text-sm font-bold leading-snug max-w-[90%] mx-auto">
                  {item.subtitle}
                </h4>
              </div>

              {/* .edu-details (Bottom section details divider text area) */}
              <p className="text-neutral-400 text-xs font-medium mt-4 pt-4 border-t border-neutral-900/60 w-full leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
