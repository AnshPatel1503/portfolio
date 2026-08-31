const boardEl = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const difficultySelect = document.getElementById('difficulty');
const themeSelect = document.getElementById('theme');

const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const streakEl = document.getElementById('streak-val');

let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let currentPlayer = 'X'; 
let scores = { X: 0, O: 0, streak: 0 };

// Pure 8 numerical sets bina kisi array brackets compression leakage ke
// Is block ko purane winPatterns se replace karein
const winPatterns = [];
const rawCombos = "0,1,2|3,4,5|6,7,8|0,3,6|1,4,7|2,5,8|0,4,8|2,4,6";
rawCombos.split('|').forEach(combo => {
    winPatterns.push(combo.split(',').map(Number));
});


// Structural sound waves (No raw assets required)
function playSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'click') {
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start(); osc.stop(ctx.currentTime + 0.1);
        } else if (type === 'win') {
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); 
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); 
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start(); osc.stop(ctx.currentTime + 0.4);
        } else if (type === 'lose') {
            osc.frequency.setValueAtTime(220, ctx.currentTime); 
            osc.frequency.setValueAtTime(165, ctx.currentTime + 0.15); 
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start(); osc.stop(ctx.currentTime + 0.4);
        }
    } catch(e) { console.log("Audio API blocked"); }
}

themeSelect.addEventListener('change', (e) => {
    document.body.className = '';
    if (e.target.value !== 'default') {
        document.body.classList.add(`theme-${e.target.value}`);
    }
});

function handleCellClick(e) {
    const index = parseInt(e.target.getAttribute('data-index'));

    if (board[index] !== '' || !isGameActive || currentPlayer === 'O') return;

    makeMove(index, 'X');
    
    if (checkWin('X')) {
        endGame('X');
    } else if (board.every(cell => cell !== '')) {
        endGame('draw');
    } else {
        currentPlayer = 'O';
        statusEl.textContent = "AI is thinking...";
        setTimeout(aiTurn, 400);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    playSound('click');
}

function aiTurn() {
    if (!isGameActive) return;
    
    const difficulty = difficultySelect.value;
    let bestMove;

    if (difficulty === 'easy') {
        bestMove = getRandomMove();
    } else if (difficulty === 'medium') {
        bestMove = Math.random() > 0.5 ? getBestMove() : getRandomMove();
    } else { 
        bestMove = Math.random() > 0.2 ? getBestMove() : getRandomMove();
    }

    if (bestMove !== undefined && bestMove !== null) {
        makeMove(bestMove, 'O');
        if (checkWin('O')) {
            endGame('O');
        } else if (board.every(cell => cell !== '')) {
            endGame('draw');
        } else {
            currentPlayer = 'X';
            statusEl.textContent = "Your Turn (X)";
        }
    }
}

function getRandomMove() {
    const availSpots = [];
    for(let i=0; i<9; i++) { if(board[i] === '') availSpots.push(i); }
    return availSpots[Math.floor(Math.random() * availSpots.length)];
}

function checkWin(player) {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function highlightWinningCombo(player) {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            break;
        }
    }
}

function endGame(result) {
    isGameActive = false;
    if (result === 'X') {
        statusEl.textContent = "You Win! 🎉";
        scores.X++;
        scores.streak++;
        scoreXEl.textContent = scores.X;
        streakEl.textContent = `${scores.streak}🔥`;
        highlightWinningCombo('X');
        playSound('win');
    } else if (result === 'O') {
        statusEl.textContent = "AI Wins! 🤖";
        scores.O++;
        scores.streak = 0;
        scoreOEl.textContent = scores.O;
        streakEl.textContent = "0🔥";
        highlightWinningCombo('O');
        playSound('lose');
    } else {
        statusEl.textContent = "It's a Draw! 🤝";
        scores.streak = 0;
        streakEl.textContent = "0🔥";
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move !== null ? move : getRandomMove();
}

function minimax(tempBoard, depth, isMaximizing) {
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (tempBoard.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'O';
                let score = minimax(tempBoard, depth + 1, false);
                tempBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'X';
                let score = minimax(tempBoard, depth + 1, true);
                tempBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusEl.textContent = "Your Turn (X)";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame); // Fixed 'resetGhame' spelling typo here
