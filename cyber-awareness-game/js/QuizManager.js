// ===== js/QuizManager.js =====
class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.answers = [];
        this.startTime = null;
    }

    async startQuiz(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.answers = [];
        this.startTime = Date.now();
        
        this.renderQuestion();
    }

    renderQuestion() {
        const container = document.getElementById('quiz-container');
        const question = this.questions[this.currentQuestion];
        
        if (!question) {
            this.finishQuiz();
            return;
        }

        container.innerHTML = `
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.currentQuestion / this.questions.length) * 100}%"></div>
                </div>
                <p>Question ${this.currentQuestion + 1} of ${this.questions.length}</p>
            </div>
            
            <div class="quiz-question">
                ${question.question}
            </div>
            
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            
            <div class="quiz-actions">
                <button id="submit-answer" class="action-btn" disabled>Submit Answer</button>
                <button id="skip-question" class="action-btn">Skip Question</button>
            </div>
        `;

        this.attachQuizListeners();
    }

    attachQuizListeners() {
        const options = document.querySelectorAll('.quiz-option');
        const submitBtn = document.getElementById('submit-answer');
        const skipBtn = document.getElementById('skip-question');
        
        let selectedOption = null;

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Select current option
                option.classList.add('selected');
                selectedOption = parseInt(option.dataset.index);
                
                // Enable submit button
                submitBtn.disabled = false;
            });
        });

        submitBtn.addEventListener('click', () => {
            this.submitAnswer(selectedOption);
        });

        skipBtn.addEventListener('click', () => {
            this.skipQuestion();
        });
    }

    submitAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // Record the answer
        this.answers.push({
            question: this.currentQuestion,
            selected: selectedIndex,
            correct: question.correctAnswer,
            isCorrect: isCorrect
        });

        // Update progress tracker
        window.game.progressTracker.recordAnswer(isCorrect);

        // Show feedback
        this.showQuestionFeedback(isCorrect, question);
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.renderQuestion();
        }, 2000);
    }

    skipQuestion() {
        this.answers.push({
            question: this.currentQuestion,
            selected: null,
            correct: this.questions[this.currentQuestion].correctAnswer,
            isCorrect: false
        });

        this.currentQuestion++;
        this.renderQuestion();
    }

    showQuestionFeedback(isCorrect, question) {
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            } else if (option.classList.contains('selected') && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });

        // Show explanation if available
        if (question.explanation) {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            feedbackDiv.innerHTML = `
                <p><strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong></p>
                <p>${question.explanation}</p>
            `;
            
            document.getElementById('quiz-container').appendChild(feedbackDiv);
        }

        // Disable action buttons
        document.getElementById('submit-answer').disabled = true;
        document.getElementById('skip-question').disabled = true;
    }

    finishQuiz() {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - this.startTime) / 1000);
        
        const correct = this.answers.filter(a => a.isCorrect).length;
        const total = this.answers.length;
        const score = Math.round((correct / total) * 100);
        const skipped = this.answers.filter(a => a.selected === null).length;

        // Show detailed scorecard
        this.showScorecard({
            score: score,
            correct: correct,
            total: total,
            skipped: skipped,
            time: this.formatTime(timeSpent),
            timeSpent: timeSpent,
            answers: this.answers,
            questions: this.questions
        });
    }

    showScorecard(results) {
        const container = document.getElementById('quiz-container');
        
        // Determine performance level
        let performanceLevel = '';
        let performanceColor = '';
        let performanceMessage = '';
        
        if (results.score >= 90) {
            performanceLevel = 'Excellent';
            performanceColor = '#28a745';
            performanceMessage = 'Outstanding performance! You have mastered this topic.';
        } else if (results.score >= 75) {
            performanceLevel = 'Good';
            performanceColor = '#17a2b8';
            performanceMessage = 'Well done! You have a good understanding of the material.';
        } else if (results.score >= 60) {
            performanceLevel = 'Fair';
            performanceColor = '#ffc107';
            performanceMessage = 'Not bad, but there\'s room for improvement.';
        } else {
            performanceLevel = 'Needs Improvement';
            performanceColor = '#dc3545';
            performanceMessage = 'Consider reviewing the material and trying again.';
        }

        container.innerHTML = `
            <div class="scorecard">
                <div class="scorecard-header">
                    <h2>Quiz Complete!</h2>
                    <div class="score-circle" style="border-color: ${performanceColor}">
                        <span class="score-number" style="color: ${performanceColor}">${results.score}%</span>
                        <span class="score-label">Score</span>
                    </div>
                    <div class="performance-badge" style="background-color: ${performanceColor}">
                        ${performanceLevel}
                    </div>
                    <p class="performance-message">${performanceMessage}</p>
                </div>

                <div class="scorecard-stats">
                    <div class="stat-item">
                        <div class="stat-number" style="color: #28a745">${results.correct}</div>
                        <div class="stat-label">Correct</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" style="color: #dc3545">${results.total - results.correct - results.skipped}</div>
                        <div class="stat-label">Incorrect</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" style="color: #6c757d">${results.skipped}</div>
                        <div class="stat-label">Skipped</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" style="color: #17a2b8">${results.time}</div>
                        <div class="stat-label">Time</div>
                    </div>
                </div>

                <div class="question-review">
                    <h3>Question Review</h3>
                    <div class="review-list">
                        ${this.generateQuestionReview(results)}
                    </div>
                </div>

                <div class="scorecard-actions">
                    <button id="retake-quiz" class="action-btn primary">Retake Quiz</button>
                    <button id="back-to-menu" class="action-btn">Back to Menu</button>
                    <button id="share-results" class="action-btn">Share Results</button>
                </div>
            </div>
        `;

        this.attachScorecardListeners(results);
    }

    generateQuestionReview(results) {
        return results.answers.map((answer, index) => {
            const question = results.questions[index];
            let statusIcon = '';
            let statusClass = '';
            
            if (answer.selected === null) {
                statusIcon = '⏭️';
                statusClass = 'skipped';
            } else if (answer.isCorrect) {
                statusIcon = '✅';
                statusClass = 'correct';
            } else {
                statusIcon = '❌';
                statusClass = 'incorrect';
            }

            return `
                <div class="review-item ${statusClass}">
                    <div class="review-status">${statusIcon}</div>
                    <div class="review-content">
                        <div class="review-question">Q${index + 1}: ${question.question.substring(0, 60)}${question.question.length > 60 ? '...' : ''}</div>
                        ${answer.selected !== null ? `
                            <div class="review-answer">
                                Your answer: ${question.options[answer.selected]}
                            </div>
                        ` : '<div class="review-answer">Skipped</div>'}
                        ${!answer.isCorrect && answer.selected !== null ? `
                            <div class="review-correct">
                                Correct answer: ${question.options[answer.correct]}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    attachScorecardListeners(results) {
        const retakeBtn = document.getElementById('retake-quiz');
        const menuBtn = document.getElementById('back-to-menu');
        const shareBtn = document.getElementById('share-results');

        retakeBtn?.addEventListener('click', () => {
            this.startQuiz(this.questions);
        });

        menuBtn?.addEventListener('click', () => {
            // Try different possible method names to navigate back
            if (window.game.showScenarioSelection) {
                window.game.showScenarioSelection();
            } else if (window.game.showMainMenu) {
                window.game.showMainMenu();
            } else if (window.game.showScenarios) {
                window.game.showScenarios();
            } else if (window.game.init) {
                window.game.init();
            } else if (window.game.returnToMenu) {
                window.game.returnToMenu();
            } else {
                // Fallback: reload the page
                window.location.reload();
            }
        });

        shareBtn?.addEventListener('click', () => {
            this.shareResults(results);
        });
    }

    shareResults(results) {
        const shareText = `I just scored ${results.score}% on a cybersecurity quiz! ` +
                         `${results.correct}/${results.total} correct in ${results.time}. ` +
                         `#CyberSecurity #LearningTogether`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Cybersecurity Quiz Results',
                text: shareText,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}