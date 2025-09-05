// ===== js/main.js =====
console.log("Main.js loaded successfully!");

class CyberAwarenessGame {
    constructor() {
        console.log("Game constructor called");
        this.currentScreen = 'landing';
        this.scenarioManager = new ScenarioManager();
        this.uiManager = new UIManager();
        this.progressTracker = new ProgressTracker();
        this.quizManager = new QuizManager();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showScreen('landing');
        console.log('Cyber Awareness Game initialized');
    }

    setupEventListeners() {
        console.log("Setting up event listeners...");
        
        // Scenario selection buttons
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log("Scenario button clicked:", e.target.dataset.scenario);
                const scenario = e.target.dataset.scenario;
                this.startScenario(scenario);
            });
        });

        // Action buttons
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                this.goHome();
            });
        }

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextStep();
            });
        }

        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartScenario();
            });
        }

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.uiManager.hideModal();
            });
        }

        console.log("Event listeners set up successfully");
    }

    async startScenario(scenarioType) {
        try {
            console.log(`Starting ${scenarioType} scenario`);
            this.showScreen('game');
            this.uiManager.showLoading();
            
            await this.scenarioManager.loadScenario(scenarioType);
            this.uiManager.hideLoading();
            
            console.log(`${scenarioType} scenario loaded successfully`);
        } catch (error) {
            console.error('Error starting scenario:', error);
            this.uiManager.showError('Failed to load scenario: ' + error.message);
        }
    }

    nextStep() {
        if (this.scenarioManager) {
            this.scenarioManager.nextStep();
        }
    }

    restartScenario() {
        if (this.scenarioManager) {
            this.scenarioManager.restartScenario();
        }
    }

    goHome() {
        if (this.scenarioManager) {
            this.scenarioManager.cleanup();
        }
        this.showScreen('landing');
        this.progressTracker.reset();
    }

    showScreen(screenName) {
        console.log(`Switching to ${screenName} screen`);
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        } else {
            console.error(`Screen ${screenName} not found!`);
        }
    }

    showQuiz(questions) {
        this.showScreen('quiz');
        this.quizManager.startQuiz(questions);
    }

    showResults(results) {
        this.showScreen('results');
        this.uiManager.displayResults(results);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing game...");
    
    // Check if all required classes are available
    if (typeof ScenarioManager === 'undefined') {
        console.error("ScenarioManager class not found!");
        return;
    }
    if (typeof UIManager === 'undefined') {
        console.error("UIManager class not found!");
        return;
    }
    if (typeof ProgressTracker === 'undefined') {
        console.error("ProgressTracker class not found!");
        return;
    }
    if (typeof QuizManager === 'undefined') {
        console.error("QuizManager class not found!");
        return;
    }
    
    window.game = new CyberAwarenessGame();
    console.log("Game instance created and assigned to window.game");
});
