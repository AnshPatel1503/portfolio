// src/components/Contact.jsx
import React, { useState } from 'react';
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    try {
      await emailjs.send("service_e3wo4zm", "template_vszbwpp", formData, "ydEzxlrQi8ncxla9R");
      setStatus("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  return (
    <section id="contact" className="px-[2%] py-12 border-t border-neutral-900 text-center text-white">
      <p className="text-emerald-400 text-sm font-bold tracking-[3px] uppercase">CONTACT</p>
      <h2 className="text-[clamp(28px,4vw,35px)] font-bold mt-3 mb-4">Let's Work Together</h2>
      
      <p className="text-neutral-400 text-base leading-[1.8] max-w-[850px] mx-auto mb-[30px]">
        I'm available for freelance projects, full-time opportunities and web development collaborations. 
        Whether you need a new application, API integration, payment gateway or help fixing an existing project, 
        let's discuss your requirements. Have a project, job opportunity or collaboration in mind? Send me a message.
      </p>

      {/* .contact-details: 4 Columns on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 min-[651px]:grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-full mx-auto mt-[30px] text-left">
        <div className="p-5 bg-[#111] border border-[#292929] rounded-8">
          <span className="block text-[#777] text-[13px] mb-2 font-medium">Email</span>
          <a href="mailto:anantansh1503@gmail.com" className="text-emerald-400 text-sm break-all font-semibold hover:underline">
            anantansh1503@gmail.com
          </a>
        </div>
        <div className="p-5 bg-[#111] border border-[#292929] rounded-8">
          <span className="block text-[#777] text-[13px] mb-2 font-medium">WhatsApp</span>
          <a href="https://wa.me/910648014746?text=Hello%20Ansh,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noreferrer" className="text-emerald-400 text-sm break-all font-semibold hover:underline">
            Chat on WhatsApp
          </a>
        </div>
        <div className="p-5 bg-[#111] border border-[#292929] rounded-8">
          <span className="block text-[#777] text-[13px] mb-2 font-medium">GitHub</span>
          <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer" className="text-emerald-400 text-sm break-all font-semibold hover:underline">
            github.com/AnshPatel1503
          </a>
        </div>
        <div className="p-5 bg-[#111] border border-[#292929] rounded-8">
          <span className="block text-[#777] text-[13px] mb-2 font-medium">LinkedIn</span>
          <a href="https://www.linkedin.com/in/anshpatel-dev" target="_blank" rel="noreferrer" className="text-emerald-400 text-sm break-all font-semibold hover:underline">
            LinkedIn Profile
          </a>
        </div>
      </div>

      {/* .contact-form container inputs fields layout matrix */}
      <form className="max-w-[850px] mx-auto mt-[45px] flex flex-col gap-[18px]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 min-[651px]:grid-cols-2 gap-[18px]">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-4 border border-[#292929] rounded-md bg-[#111] text-white text-[15px] outline-none transition-colors duration-200 focus:border-emerald-400 placeholder:#666" 
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-4 border border-[#292929] rounded-md bg-[#111] text-white text-[15px] outline-none transition-colors duration-200 focus:border-emerald-400 placeholder:#666" 
            required 
          />
        </div>

        <input 
          type="text" 
          name="subject" 
          placeholder="Subject" 
          value={formData.subject} 
          onChange={handleChange} 
          className="w-full p-4 border border-[#292929] rounded-md bg-[#111] text-white text-[15px] outline-none transition-colors duration-200 focus:border-emerald-400 placeholder:#666" 
          required
        />

        <textarea 
          name="message" 
          rows="7" 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          className="w-full p-4 border border-[#292929] rounded-md bg-[#111] text-white text-[15px] outline-none transition-colors duration-200 focus:border-emerald-400 placeholder:#666 resize-y" 
          required
        ></textarea>

        <button 
          type="submit" 
          className="bg-emerald-400 text-neutral-950 font-semibold px-6 py-3.5 rounded-lg hover:bg-emerald-500 transition-all duration-200 self-start max-[650px]:w-full disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="mt-2 text-emerald-400 text-sm font-medium text-left">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
