// ===== js/UIManager.js =====
console.log("UIManager.js loaded");

class UIManager {
    constructor() {
        this.container = document.getElementById('scenario-container');
        this.feedbackArea = document.getElementById('feedback-area');
        this.modal = document.getElementById('feedback-modal');
        this.modalBody = document.getElementById('modal-body');
        
        this.setupUI();
        console.log("UIManager initialized");
    }

    setupUI() {
        // Additional UI setup if needed
    }

    renderScenario(content) {
        console.log("Rendering scenario content");
        this.container.innerHTML = content;
        this.attachChoiceListeners();
    }

    attachChoiceListeners() {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = {
                    id: e.target.dataset.choice,
                    text: e.target.textContent.trim()
                };
                
                console.log("Choice selected:", choice);
                
                // Disable all buttons to prevent multiple clicks
                document.querySelectorAll('.choice-btn').forEach(b => {
                    b.disabled = true;
                });
                
                // Add visual feedback
                e.target.classList.add('selected');
                
                // Handle the choice
                if (window.game && window.game.scenarioManager) {
                    window.game.scenarioManager.handleChoice(choice);
                } else {
                    console.error("Game or scenario manager not available");
                }
            });
        });
    }

    showFeedback(message, type = 'neutral', isDetailed = false) {
        console.log(`Showing feedback: ${type}`);
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback-message feedback-${type}`;
        feedbackDiv.innerHTML = message;

        this.feedbackArea.innerHTML = '';
        this.feedbackArea.appendChild(feedbackDiv);

        // Add animation
        feedbackDiv.style.opacity = '0';
        feedbackDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feedbackDiv.style.transition = 'all 0.5s ease';
            feedbackDiv.style.opacity = '1';
            feedbackDiv.style.transform = 'translateY(0)';
        }, 100);

        // Show detailed feedback in modal if needed
        if (isDetailed) {
            setTimeout(() => {
                this.showModal(message);
            }, 1000);
        }
    }

    showModal(content) {
        if (this.modalBody && this.modal) {
            this.modalBody.innerHTML = content;
            this.modal.style.display = 'block';
            
            // Close modal when clicking outside
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hideModal();
                }
            });
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    updateScore(score) {
        const scoreElement = document.getElementById('current-score');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }

    updateLevel(level) {
        const levelElement = document.getElementById('current-level');
        if (levelElement) {
            levelElement.textContent = level;
        }
    }

    showActionButton(buttonId, show = true) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.style.display = show ? 'inline-block' : 'none';
        }
    }

    showLoading() {
        console.log("Showing loading screen");
        this.container.innerHTML = `
            <div class="loading-container">
                <div class="loading"></div>
                <p>Loading scenario...</p>
            </div>
        `;
    }

    hideLoading() {
        console.log("Hiding loading screen");
        // Loading will be replaced when scenario renders
    }

    showError(message) {
        console.error("UI Error:", message);
        this.showFeedback(`Error: ${message}`, 'negative');
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) {
            console.error("Results container not found");
            return;
        }

        const scoreClass = results.score >= 80 ? 'results-good' : 
                          results.score >= 60 ? 'results-average' : 'results-poor';
        
        resultsContainer.innerHTML = `
            <div class="scenario-results">
                <h2>Scenario Complete!</h2>
                <div class="results-score ${scoreClass}">
                    ${results.score}%
                </div>
                <div class="results-feedback">
                    <h3>${results.title}</h3>
                    <p>${results.message}</p>
                    <div class="results-details">
                        <p><strong>Correct Answers:</strong> ${results.correct} / ${results.total}</p>
                        <p><strong>Time Taken:</strong> ${results.time}</p>
                    </div>
                </div>
                <div class="results-actions">
                    <button class="action-btn" onclick="window.game.goHome()">Back to Menu</button>
                    <button class="action-btn" onclick="window.game.restartScenario()">Try Again</button>
                </div>
            </div>
        `;
    }

    clearFeedback() {
        if (this.feedbackArea) {
            this.feedbackArea.innerHTML = '';
        }
    }

    animateElement(element, animation) {
        element.classList.add(animation);
        setTimeout(() => {
            element.classList.remove(animation);
        }, 600);
    }
}