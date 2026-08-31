
        class NeonVoidGame {
            constructor() {
                this.canvas = document.getElementById('gameCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.scoreVal = document.getElementById('score-val');
                this.highVal = document.getElementById('high-val');
                this.menuOverlay = document.getElementById('menu-overlay');
                this.startBtn = document.getElementById('start-btn');
                this.menuTitle = document.querySelector('.neon-title');

                this.isPlaying = false;
                this.score = 0;
                this.highScore = parseInt(localStorage.getItem('void_high')) || 0;
                this.highVal.textContent = this.highScore.toString().padStart(4, '0');

                this.player = { x: 0, y: 0, radius: 15, targetX: 0, targetY: 0, speed: 0.14 };
                this.obstacles = [];
                this.particles = [];
                this.starfield = [];
                this.spawnTimer = 0;
                this.difficultyMultiplier = 1;

                this.audioCtx = null;
                this.engineOsc = null;
                this.engineGain = null;

                this.init();
            }

            init() {
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                this.canvas.addEventListener('mousemove', (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.player.targetX = e.clientX - rect.left;
                    this.player.targetY = e.clientY - rect.top;
                });

                this.startBtn.addEventListener('click', () => this.startGame());
                this.generateStars();
            }

            resizeCanvas() {
                this.canvas.width = this.canvas.parentElement.clientWidth;
                this.canvas.height = this.canvas.parentElement.clientHeight;
                if (!this.isPlaying) {
                    this.player.x = this.canvas.width / 2;
                    this.player.y = this.canvas.height * 0.75;
                }
            }

            generateStars() {
                this.starfield = [];
                for (let i = 0; i < 60; i++) {
                    this.starfield.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: Math.random() * 2,
                        speed: Math.random() * 1.5 + 0.5
                    });
                }
            }

            initAudioEngine() {
                try {
                    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    this.engineOsc = this.audioCtx.createOscillator();
                    this.engineGain = this.audioCtx.createGain();
                    
                    this.engineOsc.type = 'sawtooth';
                    this.engineOsc.frequency.setValueAtTime(60, this.audioCtx.currentTime);
                    
                    const lowpass = this.audioCtx.createBiquadFilter();
                    lowpass.type = 'lowpass';
                    lowpass.frequency.setValueAtTime(130, this.audioCtx.currentTime);

                    this.engineOsc.connect(lowpass);
                    lowpass.connect(this.engineGain);
                    this.engineGain.connect(this.audioCtx.destination);
                    
                    this.engineGain.gain.setValueAtTime(1, this.audioCtx.currentTime);
                    this.engineOsc.start();
                } catch (e) {
                    console.warn("Audio Context pipeline safety lock:", e);
                }
            }

            playExplosionSound() {
                if (!this.audioCtx) return;
                
                const bufferSize = this.audioCtx.sampleRate * 0.5;
                const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noiseNode = this.audioCtx.createBufferSource();
                noiseNode.buffer = buffer;

                const explosionFilter = this.audioCtx.createBiquadFilter();
                explosionFilter.type = 'lowpass';
                explosionFilter.frequency.setValueAtTime(280, this.audioCtx.currentTime);
                explosionFilter.frequency.exponentialRampToValueAtTime(15, this.audioCtx.currentTime + 0.48);

                const volumeGain = this.audioCtx.createGain();
                volumeGain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
                volumeGain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.48);

                noiseNode.connect(explosionFilter);
                explosionFilter.connect(volumeGain);
                volumeGain.connect(this.audioCtx.destination);
                
                noiseNode.start();
            }

            startGame() {

    if (!this.audioCtx) this.initAudioEngine();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
    this.audioCtx.resume();
    }
    if (this.engineGain) {
    this.engineGain.gain.setValueAtTime(1, this.audioCtx.currentTime);
    }
    this.isPlaying = true;
    this.score = 0;
    this.difficultyMultiplier = 1;
    this.obstacles = [];
    this.particles = [];
    this.player.x = this.canvas.width / 2;
    this.player.y = this.canvas.height * 0.75;
    this.player.targetX = this.player.x;
    this.player.targetY = this.player.y;
    this.menuOverlay.classList.add('hidden');
    this.animate();
    }
    animate() {
    if (!this.isPlaying) return;
    this.ctx.fillStyle = 'rgba(2, 4, 10, 0.22)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateStarfield();
    this.updatePlayer();
    this.updateObstacles();
    this.updateParticles();
    this.checkCollisions();
    this.handlePointsTracker();
    requestAnimationFrame(() => this.animate());
    }
    updateStarfield() {
    this.starfield.forEach(star => {
    star.y += star.speed * this.difficultyMultiplier;
    if (star.y > this.canvas.height) {
    star.y = 0;
    star.x = Math.random() * this.canvas.width;
    }
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    this.ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    }
    updatePlayer() {
    const lastX = this.player.x;
    const lastY = this.player.y;
    this.player.x += (this.player.targetX - this.player.x) * this.player.speed;
    this.player.y += (this.player.targetY - this.player.y) * this.player.speed;
    if (this.audioCtx && this.engineOsc) {
    const currentVelocity = Math.hypot(this.player.x - lastX, this.player.y - lastY);
    const modularPitch = 60 + Math.min(55, currentVelocity * 5.5);
    this.engineOsc.frequency.setValueAtTime(modularPitch, this.audioCtx.currentTime);
    }
    const px = this.player.x;
    const py = this.player.y;
    if (Math.random() > 0.15) {
    this.particles.push({
    x: px + (Math.random() - 0.5) * 4,
    y: py + 18,
    vx: (Math.random() - 0.5) * 1.2,
    vy: Math.random() * 4 + 3,
    alpha: 1,
    size: Math.random() * 5 + 3,
    color: Math.random() > 0.4 ? '#06b6d4' : '#22d3ee'
    });
    }
    // Premium Jet Model Renderer Block
    this.ctx.save();
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = '#06b6d4';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#06b6d4';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(px, py - 22);
    this.ctx.lineTo(px + 4, py - 10);
    this.ctx.lineTo(px + 6, py + 2);
    this.ctx.lineTo(px + 20, py + 14);
    this.ctx.lineTo(px + 8, py + 11);
    this.ctx.lineTo(px + 5, py + 20);
    this.ctx.lineTo(px - 5, py + 20);
    this.ctx.lineTo(px - 8, py + 11);
    this.ctx.lineTo(px - 20, py + 14);
    this.ctx.lineTo(px - 6, py + 2);
    this.ctx.lineTo(px - 4, py - 10);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.fillStyle = '#06b6d4';
    this.ctx.beginPath();
    this.ctx.ellipse(px, py - 3, 3.5, 8, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    }
    updateObstacles() {
    this.spawnTimer++;
    if (this.spawnTimer > Math.max(9, 30 - this.difficultyMultiplier * 4)) {
    this.spawnTimer = 0;
    this.obstacles.push({
    x: Math.random() * this.canvas.width,
    y: -20,
    radius: Math.random() * 15 + 8,
    speed: Math.random() * 3 + 2.5 * this.difficultyMultiplier,
    color: Math.random() > 0.5 ? '#ec4899' : '#a855f7'
    });
    }
    this.obstacles.forEach((obs, index) => {
    obs.y += obs.speed;
    this.ctx.save();
    this.ctx.shadowBlur = 14;
    this.ctx.shadowColor = obs.color;
    this.ctx.fillStyle = obs.color;
    this.ctx.beginPath();
    this.ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    if (obs.y - obs.radius > this.canvas.height) {
    this.obstacles.splice(index, 1);
    }
    });
    }
    updateParticles() {
    this.particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.024;
    if (p.alpha <= 0) {
    this.particles.splice(index, 1);
    return;
    }
    this.ctx.save();
    this.ctx.globalAlpha = p.alpha;
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    });
    }
    checkCollisions() {
    for (let i = 0; i < this.obstacles.length; i++) {
    const obs = this.obstacles[i];
    const dist = Math.hypot(this.player.x - obs.x, this.player.y - obs.y);
    if (dist < 15 + obs.radius) {
    this.triggerExplosion(this.player.x, this.player.y);
    this.playExplosionSound();
    this.handleGameOver();
    break;
    }
    }
    }
    triggerExplosion(x, y) {
    for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const burstVelocity = Math.random() * 7 + 2;
    this.particles.push({
    x: x, y: y,
    vx: Math.cos(angle) * burstVelocity, vy: Math.sin(angle) * burstVelocity,
    alpha: 1, size: Math.random() * 5 + 2,
    color: Math.random() > 0.5 ? '#06b6d4' : '#ec4899'
    });
    }
    }
    handlePointsTracker() {
    this.score++;
    this.scoreVal.textContent = this.score.toString().padStart(4, '0');
    this.difficultyMultiplier += 0.0004;
    }
    handleGameOver() {
    this.isPlaying = false;
    if (this.engineGain) {
    this.engineGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
    if (this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('void_high', this.highScore);
    this.highVal.textContent = this.highScore.toString().padStart(4, '0');
    }
    setTimeout(() => {
    this.menuTitle.textContent = "CORE DETONATED";
    this.startBtn.textContent = "RE-ENGAGE SYSTEMS";
    this.menuOverlay.classList.remove('hidden');
    }, 800);
    }
    }
    document.addEventListener('DOMContentLoaded', () => {
    new NeonVoidGame();
    });



