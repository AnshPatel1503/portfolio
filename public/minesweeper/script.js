class CyberMinesweeper {
    constructor() {
        this.gridContainer = document.getElementById('mines-grid');
        this.mineCountElement = document.getElementById('mine-count');
        this.timerElement = document.getElementById('timer');
        this.resetBtn = document.getElementById('reset-btn');

        this.gridSize = 9;
        this.totalMines = 10;
        this.board = [];
        
        this.timer = null;
        this.secondsElapsed = 0;
        this.isGameOver = false;
        this.isFirstClick = true;

        this.init();
    }

    init() {
        this.resetBtn.addEventListener('click', () => this.bootSystem());
        // Standard Right click disable to avoid browser contextual popups
        this.gridContainer.addEventListener('contextmenu', e => e.preventDefault());
        this.bootSystem();
    }

    bootSystem() {
        clearInterval(this.timer);
        this.secondsElapsed = 0;
        this.timerElement.textContent = "00:00";
        this.isGameOver = false;
        this.isFirstClick = true;
        this.mineCountElement.textContent = this.totalMines;
        this.board = [];
        this.renderEmptyGrid();
    }

    renderEmptyGrid() {
        this.gridContainer.innerHTML = '';
        for (let r = 0; r < this.gridSize; r++) {
            this.board[r] = [];
            for (let c = 0; c < this.gridSize; c++) {
                const node = document.createElement('div');
                node.classList.add('node');
                node.dataset.row = r;
                node.dataset.col = c;

                // Event Listeners for action mapping
                node.addEventListener('click', (e) => {
                    if (e.shiftKey) {
                        this.toggleFlag(r, c);
                    } else {
                        this.scanNode(r, c);
                    }
                });

                // Right click handling natively for desktop comfort
                node.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.toggleFlag(r, c);
                });

                this.gridContainer.appendChild(node);
                this.board[r][c] = {
                    element: node,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }
    }

    // Deploy threats after first interaction to make game fair (No instant deaths)
    plantMines(startRow, startCol) {
        let planted = 0;
        while (planted < this.totalMines) {
            let r = Math.floor(Math.random() * this.gridSize);
            let c = Math.floor(Math.random() * this.gridSize);

            // Avoid planting on first clicked area block range
            if (!this.board[r][c].isMine && (Math.abs(r - startRow) > 1 || Math.abs(c - startCol) > 1)) {
                this.board[r][c].isMine = true;
                planted++;
            }
        }

        // Calculate proximity threat values across elements
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (!this.board[r][c].isMine) {
                    this.board[r][c].neighborMines = this.countNeighbors(r, c);
                }
            }
        }
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = row + dr;
                let nc = col + dc;
                if (nr >= 0 && nr < this.gridSize && nc >= 0 && nc < this.gridSize) {
                    if (this.board[nr][nc].isMine) count++;
                }
            }
        }
        return count;
    }

    scanNode(r, c) {
        if (this.isGameOver || this.board[r][c].isRevealed || this.board[r][c].isFlagged) return;

        if (this.isFirstClick) {
            this.isFirstClick = false;
            this.plantMines(r, c);
            this.startTimer();
        }

        const cell = this.board[r][c];
        cell.isRevealed = true;
        cell.element.classList.add('revealed');

        if (cell.isMine) {
            this.triggerGameOver(false);
            return;
        }

        if (cell.neighborMines > 0) {
            cell.element.textContent = cell.neighborMines;
            cell.element.setAttribute('data-mines', cell.neighborMines);
        } else {
            // ADVANCED PORTFOLIO PROOF RECURSION ALGORITHM (Flood Fill Setup)
            this.revealEmptyNeighbors(r, c);
        }

        this.checkWinCondition();
    }

    revealEmptyNeighbors(row, col) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = row + dr;
                let nc = col + dc;
                if (nr >= 0 && nr < this.gridSize && nc >= 0 && nc < this.gridSize) {
                    if (!this.board[nr][nc].isRevealed && !this.board[nr][nc].isFlagged) {
                        this.scanNode(nr, nc);
                    }
                }
            }
        }
    }

    toggleFlag(r, c) {
        if (this.isGameOver || this.board[r][c].isRevealed) return;

        const cell = this.board[r][c];
        cell.isFlagged = !cell.isFlagged;
        
        if (cell.isFlagged) {
            cell.element.classList.add('flagged');
            cell.element.textContent = '⚑';
        } else {
            cell.element.classList.remove('flagged');
            cell.element.textContent = '';
        }

        // Realtime update flag counter balance info
        const totalFlagged = document.querySelectorAll('.flagged').length;
        this.mineCountElement.textContent = Math.max(0, this.totalMines - totalFlagged);
    }

    checkWinCondition() {
        let unrevealedSafeCells = 0;
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (!this.board[r][c].isMine && !this.board[r][c].isRevealed) {
                    unrevealedSafeCells++;
                }
            }
        }
        if (unrevealedSafeCells === 0) {
            this.triggerGameOver(true);
        }
    }

    triggerGameOver(isWin) {
        this.isGameOver = true;
        clearInterval(this.timer);

        // Show all malware nodes positioning on matrix
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.board[r][c].isMine) {
                    this.board[r][c].element.classList.add('mine');
                    this.board[r][c].element.textContent = '☢';
                }
            }
        }

        setTimeout(() => {
            if (isWin) {
                alert(`SYSTEM SECURED! Network cleared safely in ${this.timerElement.textContent}.`);
            } else {
                alert(`BREACH DETECTED: Network Terminal Compromised!`);
            }
        }, 200);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.secondsElapsed++;
            let mins = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
            let secs = (this.secondsElapsed % 60).toString().padStart(2, '0');
            this.timerElement.textContent = `${mins}:${secs}`;
        }, 1000);
    }
}

// Instantiate engine initialization
document.addEventListener('DOMContentLoaded', () => {
    new CyberMinesweeper();
});
