// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="px-[2%] py-[30px] text-center border-t border-[#222] text-[#777] text-sm md:text-base font-normal tracking-wide bg-neutral-950/40">
      <p>© {new Date().getFullYear()} Ansh Patel. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
