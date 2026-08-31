class MemoryMatrix {
    constructor() {
        this.gridContainer = document.getElementById('matrix-grid');
        this.levelCountElement = document.getElementById('level-count');
        this.highScoreElement = document.getElementById('high-score');
        this.startBtn = document.getElementById('start-btn');
        this.statusText = document.getElementById('status-text');
        this.nodes = document.querySelectorAll('.pad-node');

        this.systemSequence = [];
        this.playerSequence = [];
        this.level = 0;
        this.highScore = 0;
        this.isSystemPlaying = false;
        this.isGameActive = false;

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.startNewGame());
        
        this.nodes.forEach(node => {
            node.addEventListener('click', (e) => {
                const nodeId = parseInt(e.target.dataset.id);
                this.handlePlayerInput(nodeId, e.target);
            });
        });

        // Load high score snapshot via browser localstorage safely
        if (localStorage.getItem('matrix_high_score')) {
            this.highScore = parseInt(localStorage.getItem('matrix_high_score'));
            this.highScoreElement.textContent = this.highScore;
        }
    }

    startNewGame() {
        if (this.isSystemPlaying) return;
        this.systemSequence = [];
        this.level = 0;
        this.isGameActive = true;
        this.startBtn.textContent = "RESET";
        this.nextStage();
    }

    nextStage() {
        this.playerSequence = [];
        this.level++;
        this.levelCountElement.textContent = this.level;
        
        // Push a random node identifier (0 to 8 mapping boundaries)
        const randomNode = Math.floor(Math.random() * 9);
        this.systemSequence.push(randomNode);

        this.playPatternSequence();
    }

    // ADVANCED PORTFOLIO PROOF ASYNC DELAY SEQUENCER LOOP
    async playPatternSequence() {
        this.isSystemPlaying = true;
        this.gridContainer.classList.add('system-playing');
        this.statusText.textContent = "// WATCH NEURAL TRANSMISSION...";

        // Promise based dynamic timeout loops sequence mapping
        for (let i = 0; i < this.systemSequence.length; i++) {
            await this.delay(400);
            const nodeId = this.systemSequence[i];
            const targetNode = document.querySelector(`.pad-node[data-id="${nodeId}"]`);
            
            targetNode.classList.add('active');
            await this.delay(500); // Glow Flash hold window time frame
            targetNode.classList.remove('active');
        }

        this.isSystemPlaying = false;
        this.gridContainer.classList.remove('system-playing');
        this.statusText.textContent = "// EXECUTE SEQUENCE PATTERN NOW.";
    }

    handlePlayerInput(nodeId, element) {
        if (this.isSystemPlaying || !this.isGameActive) return;

        // Custom local element microflash action callback feedback
        element.classList.add('active');
        setTimeout(() => element.classList.remove('active'), 150);

        this.playerSequence.push(nodeId);
        const currentCheckIndex = this.playerSequence.length - 1;

        // Verification validation tracking logic layer
        if (this.playerSequence[currentCheckIndex] !== this.systemSequence[currentCheckIndex]) {
            this.triggerGameOver();
            return;
        }

        // Stage verification validation balance loop completion step
        if (this.playerSequence.length === this.systemSequence.length) {
            this.statusText.textContent = "// ACCESS VERIFIED. DOWNLINK SECURE.";
            
            if (this.level > this.highScore) {
                this.highScore = this.level;
                this.highScoreElement.textContent = this.highScore;
                localStorage.setItem('matrix_high_score', this.highScore);
            }

            // Automated micro window offset execution delay trigger for smooth pacing
            setTimeout(() => this.nextStage(), 1000);
        }
    }

    triggerGameOver() {
        this.isGameActive = false;
        this.statusText.textContent = `// SYNC FAILURE: RESET TERMINAL LINK.`;
        this.startBtn.textContent = "INITIALIZE";
        
        // Full dashboard notification alert wrapper trigger
        alert(`NETWORK CRASH: Neural sync broken at Stage ${this.level}. Link destroyed.`);
    }

    // Universal Helper Framework Promise engine wrapper layout mapping
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryMatrix();
});
