import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
const Contact = () => {
   const [formData, setFormData] = useState({name: "",email: "",subject: "",message: "",});

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setStatus("");
    try {
      await emailjs.send( "service_e3wo4zm","template_vszbwpp", formData,"ydEzxlrQi8ncxla9R");

      setStatus("Message sent successfully! I'll get back to you soon.");

      setFormData({name: "",email: "",subject: "",message: "",});
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }

    setSending(false);
  };

  return (
     <section id="contact" className="section contact-section">
          <p className="section-subtitle">CONTACT</p>

          <h2>Let's Work Together</h2>

          <p className="section-text">
            I'm available for freelance projects, full-time opportunities and web development collaborations. Whether you need a new application,
            API integration, payment gateway or help fixing an existing project, let's discuss your requirements. Have a project, job opportunity or collaboration in mind?
            Send me a message.
          </p>
          <div className="contact-details">
          <div>
            <span>Email</span>
            <a href="mailto:anantansh1503@gmail.com">anantansh1503@gmail.com</a>
          </div>
          <div>
            <span>WhatsApp</span>
            <a href="https://wa.me/910648014746?text=Hello%20Ansh,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
          <div>
            <span>GitHub</span>
            <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer">github.com/AnshPatel1503</a>
          </div>

          <div>
            <span>LinkedIn</span>
            <a href="https://www.linkedin.com/in/anshpatel-dev" target="_blank" rel="noreferrer">LinkedIn Profile</a>
          </div>
        </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>

              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>

            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required/>

            <textarea name="message" rows="7" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>

            <button type="submit" className="primary-btn" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
            {status && (<p className="form-status">{status}</p>)}
          </form>
        </section>
  );
};

export default Contact;
