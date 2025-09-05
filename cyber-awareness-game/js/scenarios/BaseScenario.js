// ===== js/scenarios/BaseScenario.js =====
class BaseScenario {
    constructor() {
        this.data = null;
        this.currentStep = 0;
        this.userChoices = [];
        this.score = 0;
        this.startTime = null;
    }

    async init() {
        this.startTime = Date.now();
        await this.loadData();
        this.render();
    }

    async loadData() {
        // Override in subclasses to load specific scenario data
        throw new Error('loadData method must be implemented in subclass');
    }

    render() {
        if (!this.data || !this.data.steps[this.currentStep]) {
            console.error('No data or step to render');
            return;
        }

        const step = this.data.steps[this.currentStep];
        const content = this.generateStepContent(step);
        
        window.game.uiManager.renderScenario(content);
        window.game.uiManager.clearFeedback();
        
        // Hide action buttons initially
        window.game.uiManager.showActionButton('next-btn', false);
        window.game.uiManager.showActionButton('restart-btn', false);
    }

    generateStepContent(step) {
        // Override in subclasses for specific step rendering
        return `
            <div class="scenario-step">
                <h3>${step.title || 'Scenario Step'}</h3>
                <div class="step-content">
                    ${step.content || ''}
                </div>
                <div class="choice-buttons">
                    ${step.choices ? step.choices.map((choice, index) => `
                        <button class="choice-btn" data-choice="${choice.id}" data-index="${index}">
                            ${choice.text}
                        </button>
                    `).join('') : ''}
                </div>
            </div>
        `;
    }

    handleChoice(choice) {
        const step = this.data.steps[this.currentStep];
        const selectedChoice = step.choices.find(c => c.id === choice.id);
        
        if (!selectedChoice) {
            console.error('Choice not found:', choice.id);
            return;
        }

        // Record the choice
        this.userChoices.push({
            step: this.currentStep,
            choice: selectedChoice,
            timestamp: Date.now()
        });

        // Update score
        if (selectedChoice.points) {
            this.score += selectedChoice.points;
            if (selectedChoice.points > 0) {
                window.game.progressTracker.recordAnswer(true);
            } else {
                window.game.progressTracker.recordAnswer(false);
            }
        }

        // Show feedback
        this.showFeedback(selectedChoice);
        
        // Show next button after feedback
        setTimeout(() => {
            window.game.uiManager.showActionButton('next-btn', true);
        }, 1500);
    }

    showFeedback(choice) {
        const feedbackType = choice.points > 0 ? 'positive' : 
                           choice.points < 0 ? 'negative' : 'neutral';
        
        let message = choice.feedback || 'Choice recorded.';
        
        // Add educational content if available
        if (choice.education) {
            message += `<br><br><strong>Learn more:</strong><br>${choice.education}`;
        }

        window.game.uiManager.showFeedback(message, feedbackType, choice.detailed);
    }

    nextStep() {
        this.currentStep++;
        
        if (this.currentStep >= this.data.steps.length) {
            this.completeScenario();
        } else {
            this.render();
        }
    }

    completeScenario() {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - this.startTime) / 1000);
        
        const results = {
            score: this.calculateFinalScore(),
            timeSpent: timeSpent,
            choices: this.userChoices,
            scenarioType: this.constructor.name
        };

        // Check if scenario has quiz questions
        if (this.data.quizQuestions && this.data.quizQuestions.length > 0) {
            window.game.showQuiz(this.data.quizQuestions);
        } else {
            const finalResults = window.game.progressTracker.completeScenario(
                this.constructor.name.toLowerCase(), 
                results
            );
            window.game.showResults(finalResults);
        }
    }

    calculateFinalScore() {
        // Calculate score based on choices made
        const totalPossiblePoints = this.data.steps.reduce((total, step) => {
            if (step.choices) {
                const maxPoints = Math.max(...step.choices.map(c => c.points || 0));
                return total + maxPoints;
            }
            return total;
        }, 0);

        if (totalPossiblePoints === 0) return 100;
        
        const earnedPoints = Math.max(0, this.score);
        return Math.round((earnedPoints / totalPossiblePoints) * 100);
    }

    cleanup() {
        // Clean up any resources, event listeners, etc.
        this.currentStep = 0;
        this.userChoices = [];
        this.score = 0;
        this.startTime = null;
    }
}