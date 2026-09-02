import { useState } from "react";
import "./App.css";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Services from './components/Services';
import Projects from './components/Projects';
import ArcadeTerminal from './components/ArcadeTerminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
 
  return (
    <div className="portfolio">      
      <Navbar />
      <main>
        <Hero />
        <About /> 
        <Skills />
        <Experience />
        <Education />
        <Services />       
        <Projects />       
        <ArcadeTerminal />       
        <Contact />
      </main>
      <Footer />
        
    </div>
  );
}

export default App;