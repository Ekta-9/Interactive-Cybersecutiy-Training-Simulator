// ===== js/ScenarioManager.js =====
class ScenarioManager {
    constructor() {
        this.scenarios = new Map();
        this.currentScenario = null;
        this.currentScenarioType = null;
        
        this.registerScenarios();
    }

    registerScenarios() {
        this.scenarios.set('phishing', PhishingScenario);
        this.scenarios.set('ransomware', RansomwareScenario);
        this.scenarios.set('databreach', DataBreachScenario);
    }

    async loadScenario(scenarioType) {
        try {
            // Clean up previous scenario
            if (this.currentScenario) {
                this.currentScenario.cleanup();
            }

            // Create new scenario instance
            const ScenarioClass = this.scenarios.get(scenarioType);
            if (!ScenarioClass) {
                throw new Error(`Scenario type "${scenarioType}" not found`);
            }

            this.currentScenario = new ScenarioClass();
            this.currentScenarioType = scenarioType;

            // Initialize the scenario
            await this.currentScenario.init();
            
            return true;
        } catch (error) {
            console.error('Error loading scenario:', error);
            throw error;
        }
    }

    nextStep() {
        if (this.currentScenario) {
            this.currentScenario.nextStep();
        }
    }

    restartScenario() {
        if (this.currentScenarioType) {
            this.loadScenario(this.currentScenarioType);
        }
    }

    handleChoice(choice) {
        if (this.currentScenario) {
            this.currentScenario.handleChoice(choice);
        }
    }

    cleanup() {
        if (this.currentScenario) {
            this.currentScenario.cleanup();
            this.currentScenario = null;
            this.currentScenarioType = null;
        }
    }
}