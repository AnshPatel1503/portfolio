const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI Elements
const levelEl = document.getElementById("level");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const actionBtn = document.getElementById("actionBtn");

// Game States
let score = 0;
let lives = 3;
let currentLevel = 1;
const maxLevels = 3;
let isPlaying = false;
let animationFrameId;

// Physics Configuration
let baseSpeed = 2.5; 
let ballSpeedMultiplier = 1.0; 
const ballRadius = 7;
let x, y, dx, dy;

// Paddle Configuration
const paddleHeight = 10;
const paddleWidth = 80;
let paddleX;
let rightPressed = false;
let leftPressed = false;

// Bricks Matrix Config
const brickRowCount = 4;
const brickColumnCount = 6;
const brickWidth = 65;
const brickHeight = 16;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 30;
let bricks = [];

// Level-wise Brick Colors
const levelColors = {
    1: ["#ff007f", "#ff00ff", "#00f0ff", "#00ff66"],
    2: ["#d4af37", "#aa7c11", "#ff4500", "#ff8c00"],
    3: ["#7000ff", "#a000ff", "#00ffcc", "#ff0055"]
};

// Event Listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);
actionBtn.addEventListener("click", handleBtnClick);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// System Reset
function resetBallAndPaddle() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    // Har level par vector logic speed dynamic set hogi
    let speed = baseSpeed * ballSpeedMultiplier;
    dx = speed * (Math.random() > 0.5 ? 1 : -1); 
    dy = -speed;
    paddleX = (canvas.width - paddleWidth) / 2;
}

function generateBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            // Level 2 aur 3 me random gaps de kar pattern banayenge
            let activeStatus = 1;
            if (currentLevel === 2 && (c + r) % 3 === 0) activeStatus = 0;
            if (currentLevel === 3 && (c * r) % 2 === 0) activeStatus = 0;
            
            bricks[c][r] = { x: 0, y: 0, status: activeStatus };
        }
    }
}

// Collisions
function collisionDetection() {
    let activeBricksLeft = false;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                activeBricksLeft = true; 
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 10 * currentLevel; 
                    scoreEl.innerText = score;
                    
                    // Re-check tracking context
                    checkLevelWin();
                    return;
                }
            }
        }
    }
    // Agar background status checks me koi brick nahi bachi
    if (!activeBricksLeft && isPlaying) {
        nextLevel();
    }
}

function checkLevelWin() {
    let count = 0;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) count++;
        }
    }
    if (count === 0) nextLevel();
}

// Render Functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00f0ff";
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; // reset
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "linear-gradient(to right, #00f0ff, #ff007f)";
    ctx.fillStyle = "#00f0ff";
    ctx.borderRadius = 5;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    let colors = levelColors[currentLevel] || levelColors[1];
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colors[r % colors.length];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Loop Engine
function draw() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Wall Vector Mechanics
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius - 2) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            // Ball striking position defines bounce trajectory angle
            let strikePos = (x - (paddleX + paddleWidth/2)) / (paddleWidth/2);
            dx = strikePos * (baseSpeed * ballSpeedMultiplier);
            dy = -dy;
        } else {
            lives--;
            livesEl.innerText = lives;
            if (lives <= 0) {
                gameOver();
                return;
            } else {
                resetBallAndPaddle();
            }
        }
    }

    // Paddle controls execution
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 6;
    else if (leftPressed && paddleX > 0) paddleX -= 6;

    x += dx;
    y += dy;

    animationFrameId = requestAnimationFrame(draw);
}

// Navigation States
function handleBtnClick() {
    if (actionBtn.innerText === "START GAME" || actionBtn.innerText === "PLAY AGAIN") {
        startNewGame();
    } else if (actionBtn.innerText === "START NEXT LEVEL") {
        overlay.style.display = "none";
        isPlaying = true;
        resetBallAndPaddle();
        generateBricks();
        draw();
    }
}

function startNewGame() {
    score = 0;
    lives = 3;
    currentLevel = 1;
    ballSpeedMultiplier = 1.0; 
    
    scoreEl.innerText = score;
    livesEl.innerText = lives;
    levelEl.innerText = currentLevel;
    
    overlay.style.display = "none";
    isPlaying = true;
    
    generateBricks();
    resetBallAndPaddle();
    draw();
}

function nextLevel() {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    
    if (currentLevel < maxLevels) {
        currentLevel++;
        ballSpeedMultiplier += 0.35; // Increments ball physics velocity by 35%
        levelEl.innerText = currentLevel;
        
        overlayTitle.innerText = `LEVEL ${currentLevel - 1} CLEAR!`;
        overlayText.innerText = `Get ready! Ball speed is now faster.`;
        actionBtn.innerText = "START NEXT LEVEL";
        overlay.style.display = "flex";
    } else {
        victory();
    }
}

function gameOver() {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    overlayTitle.innerText = "GAME OVER";
    overlayTitle.style.color = "#ff3333";
    overlayText.innerText = `Final Score: ${score} | Reached Level: ${currentLevel}`;
    actionBtn.innerText = "PLAY AGAIN";
    overlay.style.display = "flex";
}

function victory() {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    overlayTitle.innerText = "CHAMPION! 🏆";
    overlayTitle.style.color = "#00ff66";
    overlayText.innerText = `Incredible! You crushed all levels. Score: ${score}`;
    actionBtn.innerText = "PLAY AGAIN";
    overlay.style.display = "flex";
}
