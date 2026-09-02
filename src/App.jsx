import emailjs from "@emailjs/browser";
import { useState } from "react";
import { SiPhp, SiLaravel, SiCodeigniter, SiNextdotjs, SiReact, SiJavascript, SiJquery, SiMysql } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaEye, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import "./App.css";
import PokemonGame from './components/PokemonGame';
import React, { useEffect, useRef } from 'react';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

// Canvas Particle Engine Component

const AutoGameplayCanvas = ({ gameId }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    
    const resizeCanvas = () => {
      const parentRect = canvas.parentElement.getBoundingClientRect();
      canvas.width = parentRect.width;
      canvas.height = parentRect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // AI Variables Initializations
    let g1Player = { x: canvas.width / 2, y: canvas.height - 50, size: 8, targetX: canvas.width / 2 };
    let g1Obstacles = [];
    let g2Grid = Array(4).fill(null).map(() => Array(4).fill(''));
    let g2Timer = 0;
    let g3Grid = Array(9).fill('');
    let g3Timer = 0;
    let g3Turn = 'X';
    let g4Ball = { x: canvas.width / 2, y: canvas.height / 2 + 30, vx: 1.5, vy: -1.5, radius: 4 };
    let g4Paddle = { x: canvas.width / 2 - 25, y: canvas.height - 40, w: 50, h: 6 };
    let g4Bricks = [];
    const initG4Bricks = () => {
      g4Bricks = [];
      for(let r=0; r<3; r++) {
        for(let c=0; c<6; c++) { g4Bricks.push({ x: c * 45 + 30, y: r * 15 + 60, w: 38, h: 10, active: true }); }
      }
    };
    initG4Bricks();
    let g5Grid = Array(9).fill(false);
    let g5Sequence = [], g5Timer = 0, g5Step = 0, g5State = 'SHOWING';
    let g6Grid = Array(5).fill(null).map(() => Array(5).fill({ isMine: false, revealed: false }));
    let g6Timer = 0;
    const initG6Grid = () => {
      g6Grid = Array(5).fill(null).map(() => Array(5).fill(null).map(() => ({ isMine: Math.random() < 0.2, revealed: false })));
    };
    initG6Grid();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // G1: Void Avoider
      if (gameId === "g1") {
        if (Math.random() < 0.08 && g1Obstacles.length < 12) {
          g1Obstacles.push({ x: Math.random() * canvas.width, y: -10, speed: Math.random() * 2 + 1.5, size: Math.random() * 5 + 4 });
        }
        let closest = null; let minDist = 9999;
        g1Obstacles.forEach(o => { if (o.y < g1Player.y && (g1Player.y - o.y) < minDist) { minDist = g1Player.y - o.y; closest = o; } });
        if (closest && Math.abs(closest.x - g1Player.x) < 35) { g1Player.targetX = closest.x > g1Player.x ? g1Player.x - 25 : closest.x + 25; }
        else { g1Player.targetX += (canvas.width / 2 - g1Player.x) * 0.02; }
        g1Player.x += (g1Player.targetX - g1Player.x) * 0.15;
        g1Obstacles.forEach((o, i) => {
          o.y += o.speed;
          ctx.beginPath(); ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(236, 72, 153, 0.4)'; ctx.shadowBlur = 8; ctx.shadowColor = '#ec4899'; ctx.fill();
          if (Math.hypot(g1Player.x - o.x, g1Player.y - o.y) < g1Player.size + o.size) g1Obstacles = [];
          if (o.y > canvas.height) g1Obstacles.splice(i, 1);
        });
        ctx.beginPath(); ctx.moveTo(g1Player.x, g1Player.y - g1Player.size); ctx.lineTo(g1Player.x - g1Player.size, g1Player.y + g1Player.size); ctx.lineTo(g1Player.x + g1Player.size, g1Player.y + g1Player.size); ctx.closePath();
        ctx.fillStyle = '#ec4899'; ctx.shadowBlur = 10; ctx.shadowColor = '#ec4899'; ctx.fill();
      }
      // G2: Sudoku
      else if (gameId === "g2") {
        g2Timer++;
        if (g2Timer % 45 === 0) {
          let r = Math.floor(Math.random() * 4), c = Math.floor(Math.random() * 4);
          g2Grid[r][c] = Math.random() > 0.15 ? Math.floor(Math.random() * 4) + 1 : 'X';
        }
        let startX = (canvas.width - 140) / 2, startY = 120, size = 35;
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            let x = startX + c * size, y = startY + r * size; ctx.strokeRect(x, y, size, size);
            if (g2Grid[r][c] !== '') {
              ctx.font = 'bold 13px Orbitron'; ctx.fillStyle = g2Grid[r][c] === 'X' ? '#ef4444' : '#10b981';
              ctx.shadowBlur = 5; ctx.shadowColor = ctx.fillStyle; ctx.fillText(g2Grid[r][c] === 'X' ? '!' : g2Grid[r][c], x + 12, y + 22);
            }
          }
        }
      }
      // G3: Tic Tac Toe
      else if (gameId === "g3") {
        g3Timer++;
        if (g3Timer % 60 === 0) {
          let empty = g3Grid.map((v, i) => v === '' ? i : null).filter(v => v !== null);
          if (empty.length > 0) { let idx = empty[Math.floor(Math.random() * empty.length)]; g3Grid[idx] = g3Turn; g3Turn = g3Turn === 'X' ? 'O' : 'X'; }
          else { g3Grid.fill(''); }
        }
        let startX = (canvas.width - 120) / 2, startY = 120, size = 40;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)'; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(startX + size, startY); ctx.lineTo(startX + size, startY + 3*size); ctx.moveTo(startX + 2*size, startY); ctx.lineTo(startX + 2*size, startY + 3*size);
        ctx.moveTo(startX, startY + size); ctx.lineTo(startX + 3*size, startY + size); ctx.moveTo(startX, startY + 2*size); ctx.lineTo(startX + 3*size, startY + 2*size); ctx.stroke();
        g3Grid.forEach((v, i) => {
          if (v === '') return;
          let r = Math.floor(i / 3), c = i % 3, x = startX + c * size + 20, y = startY + r * size + 26;
          ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = '#f59e0b'; ctx.shadowBlur = 6; ctx.fillText(v, x - 7, y);
        });
      }
      // G4: Brick Breaker
      else if (gameId === "g4") {
        g4Ball.x += g4Ball.vx; g4Ball.y += g4Ball.vy;
        if (g4Ball.x < 10 || g4Ball.x > canvas.width - 10) g4Ball.vx *= -1; if (g4Ball.y < 50) g4Ball.vy *= -1;
        g4Paddle.x = g4Ball.x - g4Paddle.w / 2;
        if (g4Ball.y >= g4Paddle.y && g4Ball.x >= g4Paddle.x && g4Ball.x <= g4Paddle.x + g4Paddle.w) g4Ball.vy = -Math.abs(g4Ball.vy);
        if (g4Ball.y > canvas.height) { g4Ball.x = canvas.width/2; g4Ball.y = canvas.height/2 + 20; g4Ball.vy = -1.5; initG4Bricks(); }
        g4Bricks.forEach(b => {
          if (!b.active) return;
          if (g4Ball.x > b.x && g4Ball.x < b.x + b.w && g4Ball.y > b.y && g4Ball.y < b.y + b.h) { b.active = false; g4Ball.vy *= -1; }
          ctx.fillStyle = 'rgba(239, 68, 68, 0.4)'; ctx.strokeStyle = '#ef4444'; ctx.shadowBlur = 4; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.strokeRect(b.x, b.y, b.w, b.h);
        });
        ctx.fillStyle = '#ef4444'; ctx.fillRect(g4Paddle.x, g4Paddle.y, g4Paddle.w, g4Paddle.h);
        ctx.beginPath(); ctx.arc(g4Ball.x, g4Ball.y, g4Ball.radius, 0, Math.PI * 2); ctx.fill();
      }
      // G5: Memory Matrix
      else if (gameId === "g5") {
        g5Timer++;
        if (g5Sequence.length === 0) g5Sequence = [Math.floor(Math.random()*9), Math.floor(Math.random()*9)];
        if (g5State === 'SHOWING' && g5Timer % 40 === 0) {
          g5Grid.fill(false); if (g5Step < g5Sequence.length) { g5Grid[g5Sequence[g5Step]] = true; g5Step++; } else { g5State = 'MATCHING'; g5Step = 0; }
        } else if (g5State === 'MATCHING' && g5Timer % 30 === 0) {
          g5Grid.fill(false);
          if (g5Step < g5Sequence.length) { g5Grid[g5Sequence[g5Step]] = true; g5Step++; } 
          else { g5State = 'SHOWING'; g5Step = 0; g5Grid.fill(false); if (g5Sequence.length < 5) g5Sequence.push(Math.floor(Math.random()*9)); else g5Sequence = []; }
        }
        let startX = (canvas.width - 120) / 2, startY = 120, size = 35;
        for (let i = 0; i < 9; i++) {
          let r = Math.floor(i / 3), c = i % 3, x = startX + c * (size + 5), y = startY + r * (size + 5);
          ctx.fillStyle = g5Grid[i] ? 'rgba(99, 102, 241, 0.7)' : 'rgba(99, 102, 241, 0.1)'; ctx.strokeStyle = '#6366f1';
          ctx.fillRect(x, y, size, size); ctx.strokeRect(x, y, size, size);
        }
      }
      // G6: Minesweeper
      else if (gameId === "g6") {
        g6Timer++;
        if (g6Timer % 50 === 0) {
          let unrevealed = [];
          for(let r=0; r<5; r++) { for(let c=0; c<5; c++) { if(!g6Grid[r][c].revealed) unrevealed.push({r,c}); } }
          if (unrevealed.length > 5) {
            let target = unrevealed[Math.floor(Math.random() * unrevealed.length)]; g6Grid[target.r][target.c].revealed = true;
            if(g6Grid[target.r][target.c].isMine) initG6Grid();
          } else { initG6Grid(); }
        }
        let startX = (canvas.width - 130) / 2, startY = 120, size = 22;
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
            let x = startX + c * (size + 4), y = startY + r * (size + 4), cell = g6Grid[r][c];
            ctx.fillStyle = cell.revealed ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.3)'; ctx.strokeStyle = '#8b5cf6';
            ctx.fillRect(x, y, size, size); ctx.strokeRect(x, y, size, size);
            if (cell.revealed) {
              ctx.font = '10px monospace'; ctx.fillStyle = cell.isMine ? '#ef4444' : '#8b5cf6';
              ctx.fillText(cell.isMine ? '*' : Math.floor(Math.random()*3), x + 8, y + 14);
            }
          }
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); };
  }, [gameId]);

  return <canvas ref={canvasRef} className="card-bg-canvas" />;
};


function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  // Slider States
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
 const educationData = [
    {
      id: 1,
      title: 'Internship',
      subtitle: 'Softpro India Computer Technologies (P) Ltd.',
      details: 'Diploma Student / Intern (Jul 2022 - Oct 2022)',
      badge: 'LATEST',
      // Briefcase SVG Icon
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
      // Graduation Cap SVG Icon
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
      // School/Building SVG Icon
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
      // Book/Document SVG Icon
      icon: (
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-16.25v16.25" />
        </svg>
      )
    }
  ];

  const portfolioGames = [
    { id: "g1", title: "NEON VOID AVOIDER", subtitle: "Canvas Physics Simulation", description: "Highly animated space avoider game integrating smooth LERP dampening speeds, circular particle tail-trails, and live crash audio nodes.", tech: ["Canvas API", "LERP Physics", "Web Audio"], folderName: "neon-void", category: "Arcade Engine" },
    { id: "g2", title: "NEON EMERALD SUDOKU", subtitle: "Algorithm Performance Piece", description: "Futuristic multi-theme matrix sudoku engine deploying a dynamic recursive Backtracking DFS loop framework with live error highlights.", tech: ["Vanilla JS", "DFS Algorithm", "CSS Props"], folderName: "sudoku", category: "Math Logic" },
    { id: "g3", title: "TIC TAC TOE", subtitle: "Classic Turn Strategy", description: "Clean interactive dynamic matrix display system to track players alternating turn cycles and evaluating win vector conditions seamlessly.", tech: ["HTML5", "CSS Grid", "Event Handles"], folderName: "tic-tac-toe", category: "Casual Game" },
    { id: "g4", title: "JS BRICK BREAKER", subtitle: "2D Vector Physics Grid", description: "Retro breakthrough canvas module calculating geometric reflective wall collision values, paddle drag thresholds, and instant score counters.", tech: ["Vector Math", "Canvas Loop", "Collision"], folderName: "js-brick-breaker", category: "Retro Action" },
    { id: "g5", title: "MEMORY MATRIX", subtitle: "Asynchronous Timing Run", description: "A premium Simon Says extension handling sequence tracking chains via unified Promise await triggers and high score local cache sync.", tech: ["JS Promises", "Async/Await", "Local Storage"], folderName: "memory-matrix", category: "Neural Test" },
    { id: "g6", title: "CYBERPUNK MINESWEEPER", subtitle: "Recursive Terminal Script", description: "Secure data grid system operating recursive Flood-Fill sweep macros to chain-reveal empty coordinates without trigger-dead clicks.", tech: ["Flood-Fill", "Recursion", "DOM Control"], folderName: "minesweeper", category: "Data Security" }
  ];

  // Real-world project screenshots mapping
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_e3wo4zm",
        "template_vszbwpp",
        formData,
        "ydEzxlrQi8ncxla9R"
      );

      setStatus("Message sent successfully! I'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }

    setSending(false);
  };
  return (
    <div className="portfolio">
      <header className="navbar">
        <div className="logo">
        <img src="./logo-2.png" alt="Ansh Patel" className="logo-image"/>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          
        </nav>
        <nav>
        <a href="/Ansh-Patel-Resume.pdf" target="_blank" className="secondary-btn">
            Download Resume</a>
        <a href="#contact" className="nav-btn">
          Hire Me
        </a>
        </nav> 
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">HELLO, I'M</p>

            <h1>Ansh Patel<br /><span>Web Developer</span></h1>

            <p className="hero-description">
              Full Stack Developer specializing in Laravel, Codeigniter, React and Next.js.
              I build scalable web applications, REST APIs, admin dashboards
              and seamless digital experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">View Projects</a>

              <a href="#contact" className="secondary-btn">Contact Me</a>
            </div>

            <div className="social-links">
              <a href="https://github.com/AnshPatel1503" target="_blank" rel="noreferrer">GitHub ↗</a>

              <a href="https://www.linkedin.com/in/anshpatel-dev/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="profile-wrapper">
              <div className="profile-glow"></div>
              <img src="./profile.png" alt="Ansh Patel Portfolio - Full Stack Web Developer" className="profile-image"/>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <p className="section-subtitle">ABOUT ME</p>

          <h2>Full Stack Developer building scalable web applications.</h2>

          <p className="section-text">
            I am a Full Stack Developer with professional experience in PHP,
            Laravel, React, Next.js, JavaScript and MySQL. I specialize in
            developing scalable backend systems, RESTful APIs, responsive
            frontend applications and database-driven platforms.
          </p>

          <p className="section-text about-second">
            I have worked on e-commerce platforms, payment gateway integrations,
            admin dashboards, authentication systems, API integrations and
            business-focused web applications.
          </p>

          <div className="about-stats">
            <div>
              <strong>2+</strong>
              <span>Years Experience</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>8+</strong>
              <span>Technologies</span>
            </div>  
          </div>
        </section>

        <section id="skills" className="section">
          <p className="section-subtitle">MY SKILLS</p>

          <h2>Technologies I Work With</h2>

          <div className="skills-grid">
            <div className="skill">
              <SiPhp className="skill-bg-icon" />
              <h3>PHP</h3>
              <p>Developed dynamic web applications using core PHP and MVC structure with clean, modular code.</p>
            </div>

            <div className="skill">
              <SiLaravel className="skill-bg-icon" />
              <h3>Laravel</h3>
              <p>Built full-stack Laravel apps including APIs, authentication, database design, and blade templating.</p>
            </div>
            <div className="skill">
              <SiCodeigniter className="skill-bg-icon" />
              <h3>Codeigniter</h3>
              <p>Created lightweight, high-performance applications using CodeIgniter with custom modules.</p>
            </div>

            <div className="skill">
              <SiNextdotjs className="skill-bg-icon" />
              <h3>Next.js</h3>
              <p>Engineered SEO-optimized SEO web apps using Server-Side Rendering (SSR), Static Site Generation (SSG), and optimized API routes.</p>
            </div>

            <div className="skill">
            <SiReact className="skill-bg-icon" />
              <h3>React</h3>
              <p>Built responsive, high-performance Single Page Applications (SPAs) utilizing hooks, state management, and reusable UI components.</p>
            </div>

            <div className="skill">
              <SiJavascript className="skill-bg-icon" />
              <h3>JavaScript</h3>
              <p>Implemented client-side logic, form validation, and event-driven programming.</p>
            </div>

            <div className="skill">
              <SiJquery className="skill-bg-icon" />
              <h3>Jquery</h3>
              <p>Used jQuery for DOM manipulation, animations, and AJAX requests to enhance UI interactivity.</p>
            </div>
            
            <div className="skill">
              <SiMysql className="skill-bg-icon" />
              <h3>MySQL</h3>
              <p>Designed and optimized relational databases and complex queries for scalable web apps.</p>
            </div>

            <div className="skill">
            <TbApi className="skill-bg-icon" />
              <h3>REST API</h3>
              <p>Developed and consumed RESTful APIs for seamless integration between frontend and backend systems.</p>
            </div>
          </div>
        </section>
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

                <h4><a href="https://ymcoders.in/" target="_blank" rel="noopener noreferrer">
                    YMCODERS Technologies Pvt. Ltd.
                  </a></h4>

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
                  <li>Integrated PayPal SDK into e-commerce checkout flows for secure international user transactions.**</li>        
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
         <section id="education" className="edu-section section">
      <div className="edu-container">
        
        {/* मिनी पिल बैज */}
        <div className="edu-pill">
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width: '14px', height: '14px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425-4.761 1.146 1.146 0 0 1 1.931-1.28c.67.974 1.352 1.97 2.029 2.975m11.522 3.066a50.619 50.619 0 0 1 2.426-4.761 1.146 1.146 0 0 0-1.93-1.28c-.67.974-1.352 1.97-2.03 2.975m-12.113 0a48.654 48.654 0 0 1 14.086 0m-14.086 0A49.54 49.54 0 0 1 12 11.25c2.597 0 5.117-.196 7.574-.573m0 0V5.25" />
          </svg>
          Education
        </div>

        {/* टाइटल और सबटाइटल */}
        
        <p className="edu-subtitle">My educational journey and academic achievements</p>

        {/* ग्रिड रैपर */}
        <div className="edu-grid">
          {educationData.map((item) => (
            <div key={item.id} className="edu-card">
              
              {/* ऑरेंज बैज */}
              {item.badge && <span className="edu-badge">{item.badge}</span>}

              {/* आइकॉन सर्कल */}
              <div className="edu-icon-circle">{item.icon}</div>

              {/* टाइटल / सबटाइटल */}
              <div className="edu-content">
                <h3 className="edu-title">{item.title}</h3>
                <h4 className="edu-sub">{item.subtitle}</h4>
              </div>

              {/* बॉटम छोटा टेक्स्ट */}
              <p className="edu-details">{item.details}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
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
        <section id="projects" className="section">
          <p className="section-subtitle">MY WORK</p>
          <h2>Featured Projects</h2>

          <div className="projects-grid">
            
           

            {/* Project 4: MPPL Life */}
            <div className="project-card">
              <h3>MPPL - Ayurvedic Wellness & MLM Platform</h3>
              <p>
                Developed an end-to-end Multi-Level Marketing (MLM) application. Built secure distributor registration 
                portals, nested network tree structures, real-time commission tracking, and wallet systems.
              </p>
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
              <p>
                Engineered a high-performance food consultancy platform. Implemented an automated Nutrition Intelligence 
                module for recipe micro-nutrient analysis and dynamic packaging-ready AI nutrition fact labels.
              </p>
              <div className="project-tech">
                <span>Next.js</span>
                <span>Json</span>
                <span>Tailwind CSS</span>
                <a href="https://samritfood.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('samrit')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
               {/* Project 3: Perfex CRM */}
            <div className="project-card">
              <h3>Perfex CRM - Custom Module Development</h3>
              <p>
                Successfully customized and deployed 3 core modules within the CodeIgniter 3 architecture. Refactored 
                backend business workflows, automated invoice generation PDF engines, and granular RBAC tasks.
              </p>
              <div className="project-tech">
                <span>CodeIgniter 3</span>
                <span>Perfex CRM</span>
                <span>PHP & MySQL</span>
                <span>Jquery</span>
                <a href="https://perfexcrm.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Platform Link</a>
                <button onClick={() => openSlider('perfex')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
             {/* Project 1: Combiz Solutions */}
            <div className="project-card">
              <h3>Combiz Solutions (Enterprise SaaS CRM)</h3>
              <p>
                Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce. 
                Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.
              </p>
              <div className="project-tech">
                <span>Perfex CRM</span>
                <span>SaaS Architecture</span>
                <span>Codeigniter 3 & PHP & MySQL</span>
                <a href="https://combizsolutions.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('combiz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
             {/* Project 1: Aurra Health Kart (New Dual-Gateway E-Commerce) */}
            <div className="project-card">
              <h3>Aurra Health Kart (E-Commerce Platform)</h3>
              <p>
                Developed an industry-grade wellness e-commerce ecosystem. Engineered hybrid dual-payment routing channels by 
                fully integrating Razorpay API for seamless domestic UPI/Net-banking workflows and Stripe SDK to authorize secure international multi-currency transactions.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>Razorpay & Stripe</span>
                <span>MySQL</span>
                <a href="https://aurved.in/" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('aurra')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
            {/* Project 5: StreetBuzz */}
            <div className="project-card">
              <h3>StreetBuzz (Regional News & Media Portal)</h3>
              <p>
                Customized and scaled a native architecture real-time regional aggregator system. Optimized state-wise 
                dynamic news sorting modules and customized trending hashtag tracking filters.
              </p>
              <div className="project-tech">
                <span>Core PHP</span>
                <span>JavaScript</span>
                <span>Customization</span>
                <a href="https://streetbuzz.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('streetbuzz')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
           

            {/* Project 6: Restro Genius */}
            <div className="project-card">
              <h3>Restro Genius (SaaS Restaurant Wallet)</h3>
              <p>
                Overhauled backend workflows by profiling query metrics. Customized multi-tenant admin control panels, 
                refactored subscription modules, and fixed live restaurant wallet balance bugs.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>Blade Engine</span>
                <span>Customization</span>
                <span>Bug Fixing</span>
                <a href="https://restrogenius.co.in" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('restro')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>

            {/* Project 7: Tripgare */}
            <div className="project-card">
              <h3>Tripgare (Flight Booking & Meta-Search)</h3>
              <p>
                Optimized and customized an online travel aggregator platform. Fixed major application routing, session 
                handling, and dynamic flight search result algorithms to ensure zero-downtime.
              </p>
              <div className="project-tech">
                <span>Laravel</span>
                <span>jQuery & AJAX</span>
                <span>Customization</span>
                <a href="https://tripgare.com" target="_blank" rel="noopener noreferrer" className="live-link-badge">Live Project</a>
                <button onClick={() => openSlider('tripgare')} className="preview-eye-btn" title="View Screenshots"><FaEye /></button>
              </div>
            </div>
          {/* Project 7: Tripgare */}
            <div className="project-card">
              <h3>IMMIMATE AI (Enterprise SaaS CRM)</h3>
              <p>
                Architected and customized a high-concurrency SaaS CRM platform built for international B2B commerce. 
                Developed secure multi-tenant vendor panels, localized checkout engines, and automated PDF invoicing.
              </p>
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

          {/* Lightbox / Slider Modal */}
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
        {/* --- ARCADE TERMINAL SECTION START --- */}
         <section className="arcade-section">
        <div className="arcade-container">
          
          {/* Header Layout */}
          <div className="arcade-header">
            <h2><span>&gt;</span> // ARCADE_GAMING_TERMINAL</h2>
            <p>Production modules served standalone via secure static public subdirectories.</p>
          </div>

          {/* Grid Layout Framework Mapping */}
          <div className="arcade-grid">
            {portfolioGames.map((game) => (
              <div key={game.id} className="arcade-card">
                
                {/* Part 2 Logic Canvas Injection */}
                <AutoGameplayCanvas gameId={game.id} />
                
                {/* Pure Foreground HTML Elements Content */}
                <div className="card-inner-layer">
                  <div className="card-top-content">
                    <span className="card-category">{game.category}</span>
                    <h3 className="card-title">{game.title}</h3>
                    <p className="card-subtitle">{game.subtitle}</p>
                    <p className="card-description">{game.description}</p>
                  </div>
                  
                  <div className="card-bottom-content">
                    <div className="tech-badges-row">
                      {game.tech.map((t, i) => (
                        <span key={i} className="tech-badge">{t}</span>
                      ))}
                    </div>
                    
                    <a 
                      href={`${import.meta.env.BASE_URL}games/${game.folderName}/`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="deploy-button"
                    >
                      DEPLOY ENGINE
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
        {/* --- ARCADE TERMINAL SECTION END --- */}
   
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
      </main>

      <footer>
        <p>© 2026 Ansh Patel. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;