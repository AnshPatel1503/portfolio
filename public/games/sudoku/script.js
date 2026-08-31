class SudokuGame {
    constructor() {
        this.boardContainer = document.getElementById('sudoku-board');
        this.timerElement = document.getElementById('timer');
        this.difficultySelect = document.getElementById('difficulty');
        this.themeSelect = document.getElementById('theme-select');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.numberButtons = document.querySelectorAll('.pad-btn');
        
        this.solution = [];
        this.puzzle = [];
        this.selectedCell = null;
        this.timer = null;
        this.secondsElapsed = 0;
        
        this.init();
    }

    init() {
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.difficultySelect.addEventListener('change', () => this.startNewGame());
        
        // --- MULTI-THEME LIVE SWITCHER ---
        this.themeSelect.addEventListener('change', (e) => {
            document.body.setAttribute('data-theme', e.target.value);
            // Re-trigger highlighting to match new glow engine variables
            if (this.selectedCell) this.selectCell(this.selectedCell);
        });
        
        this.numberButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInput(e.target.dataset.num));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key >= 1 && e.key <= 9) this.handleInput(e.key);
            if (e.key === 'Backspace' || e.key === 'Delete') this.handleInput('erase');
        });

        this.startNewGame();
    }

    startNewGame() {
        this.generateSudoku();
        this.renderBoard();
        this.resetTimer();
        this.startTimer();
    }

    generateSudoku() {
        this.solution = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.fillDiagonalBlocks();
        this.solveMatrix(this.solution);
        this.puzzle = this.solution.map(row => [...row]);
        this.removeNumbersBasedOnDifficulty();
    }

    fillDiagonalBlocks() {
        for (let i = 0; i < 9; i += 3) {
            this.fillBox(i, i);
        }
    }

    fillBox(row, col) {
        let num;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while (this.usedInBox(row, col, num));
                this.solution[row + i][col + j] = num;
            }
        }
    }

    usedInBox(rowStart, colStart, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.solution[rowStart + i][colStart + j] === num) return true;
            }
        }
        return false;
    }

    solveMatrix(matrix) {
        let row = -1, col = -1, isEmpty = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (matrix[i][j] === 0) {
                    row = i; col = j; isEmpty = false;
                    break;
                }
            }
            if (!isEmpty) break;
        }

        if (isEmpty) return true;

        for (let num = 1; num <= 9; num++) {
            if (this.isSafe(matrix, row, col, num)) {
                matrix[row][col] = num;
                if (this.solveMatrix(matrix)) return true;
                matrix[row][col] = 0;
            }
        }
        return false;
    }

    isSafe(matrix, row, col, num) {
        for (let d = 0; d < 9; d++) {
            if (matrix[row][d] === num || matrix[d][col] === num) return false;
        }
        let boxRowStart = row - (row % 3), boxColStart = col - (col % 3);
        for (let r = 0; r < 3; r++) {
            for (let d = 0; d < 3; d++) {
                if (matrix[boxRowStart + r][boxColStart + d] === num) return false;
            }
        }
        return true;
    }

    removeNumbersBasedOnDifficulty() {
        // High difficulty algorithms setup
        const levels = { 'easy': 35, 'medium': 48, 'hard': 56 };
        let attempts = levels[this.difficultySelect.value];
        while (attempts > 0) {
            let cellIndex = Math.floor(Math.random() * 81);
            let r = Math.floor(cellIndex / 9), c = cellIndex % 9;
            if (this.puzzle[r][c] !== 0) {
                this.puzzle[r][c] = 0;
                attempts--;
            }
        }
    }

    renderBoard() {
        this.boardContainer.innerHTML = '';
        this.selectedCell = null;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = this.puzzle[r][c];
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (val !== 0) {
                    cell.textContent = val;
                    cell.classList.add('original');
                }

                cell.addEventListener('click', () => this.selectCell(cell));
                this.boardContainer.appendChild(cell);
            }
        }
    }

    selectCell(cell) {
        if (this.selectedCell) this.selectedCell.classList.remove('selected');
        document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight-match'));

        this.selectedCell = cell;
        
        if (!cell.classList.contains('original')) {
            this.selectedCell.classList.add('selected');
        }

        const targetNumber = cell.textContent;
        if (targetNumber && targetNumber !== '') {
            document.querySelectorAll('.cell').forEach(c => {
                if (c.textContent === targetNumber) {
                    c.classList.add('highlight-match');
                }
            });
        }
    }

    handleInput(value) {
        if (!this.selectedCell || this.selectedCell.classList.contains('original')) return;
        const r = parseInt(this.selectedCell.dataset.row);
        const c = parseInt(this.selectedCell.dataset.col);
        
        if (value === 'erase') {
            this.selectedCell.textContent = '';
            this.selectedCell.classList.remove('error');
            this.puzzle[r][c] = 0;
            document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight-match'));
        } else {
            const num = parseInt(value);
            this.selectedCell.textContent = num;
            this.puzzle[r][c] = num;
            
            if (this.solution[r][c] !== num) {
                this.selectedCell.classList.add('error');
            } else {
                this.selectedCell.classList.remove('error');
                this.checkWinCondition();
            }
            
            this.selectCell(this.selectedCell);
        }
    }

    checkWinCondition() {
        for (let r = 0; r < 9; r++) {
            for (let rCol = 0; rCol < 9; rCol++) {
                if (this.puzzle[r][rCol] !== this.solution[r][rCol]) return;
            }
        }
        clearInterval(this.timer);
        alert(`ACCESS GRANTED: Matrix Solved in ${this.timerElement.textContent}!`);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.secondsElapsed++;
            let mins = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
            let secs = (this.secondsElapsed % 60).toString().padStart(2, '0');
            this.timerElement.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.secondsElapsed = 0;
        this.timerElement.textContent = "00:00";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});
