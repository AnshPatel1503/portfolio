import React, { useEffect, useRef } from 'react';
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

const ArcadeTerminal = () => {
  const portfolioGames = [
    { id: "g1", title: "NEON VOID AVOIDER", subtitle: "Canvas Physics Simulation", description: "Highly animated space avoider game integrating smooth LERP dampening speeds, circular particle tail-trails, and live crash audio nodes.", tech: ["Canvas API", "LERP Physics", "Web Audio"], folderName: "neon-void", category: "Arcade Engine" },
    { id: "g2", title: "NEON EMERALD SUDOKU", subtitle: "Algorithm Performance Piece", description: "Futuristic multi-theme matrix sudoku engine deploying a dynamic recursive Backtracking DFS loop framework with live error highlights.", tech: ["Vanilla JS", "DFS Algorithm", "CSS Props"], folderName: "sudoku", category: "Math Logic" },
    { id: "g3", title: "TIC TAC TOE", subtitle: "Classic Turn Strategy", description: "Clean interactive dynamic matrix display system to track players alternating turn cycles and evaluating win vector conditions seamlessly.", tech: ["HTML5", "CSS Grid", "Event Handles"], folderName: "tic-tac-toe", category: "Casual Game" },
    { id: "g4", title: "JS BRICK BREAKER", subtitle: "2D Vector Physics Grid", description: "Retro breakthrough canvas module calculating geometric reflective wall collision values, paddle drag thresholds, and instant score counters.", tech: ["Vector Math", "Canvas Loop", "Collision"], folderName: "js-brick-breaker", category: "Retro Action" },
    { id: "g5", title: "MEMORY MATRIX", subtitle: "Asynchronous Timing Run", description: "A premium Simon Says extension handling sequence tracking chains via unified Promise await triggers and high score local cache sync.", tech: ["JS Promises", "Async/Await", "Local Storage"], folderName: "memory-matrix", category: "Neural Test" },
    { id: "g6", title: "CYBERPUNK MINESWEEPER", subtitle: "Recursive Terminal Script", description: "Secure data grid system operating recursive Flood-Fill sweep macros to chain-reveal empty coordinates without trigger-dead clicks.", tech: ["Flood-Fill", "Recursion", "DOM Control"], folderName: "minesweeper", category: "Data Security" }
  ];
  return ( 
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
        
   
  );
};

export default ArcadeTerminal;
