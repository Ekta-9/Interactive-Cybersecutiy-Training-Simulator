// ===== js/ProgressTracker.js =====
console.log("ProgressTracker.js loaded");

class ProgressTracker {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.startTime = null;
        this.completedScenarios = new Set();
        console.log("ProgressTracker initialized");
    }

    startScenario() {
        this.startTime = Date.now();
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        console.log("Scenario tracking started");
    }

    recordAnswer(isCorrect, points = 10) {
        this.totalQuestions++;
        if (isCorrect) {
            this.correctAnswers++;
            this.score += points;
            this.updateDisplay();
            console.log(`Correct answer! Score: ${this.score}`);
        } else {
            console.log("Incorrect answer");
        }
    }

    completeScenario(scenarioType) {
        this.completedScenarios.add(scenarioType);
        
        // Level up logic
        const completedCount = this.completedScenarios.size;
        this.level = Math.floor(completedCount / 3) + 1;
        
        this.updateDisplay();
        return this.getResults();
    }

    getResults() {
        const endTime = Date.now();
        const timeElapsed = Math.round((endTime - this.startTime) / 1000);
        const percentage = this.totalQuestions > 0 ? 
            Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;

        return {
            score: percentage,
            correct: this.correctAnswers,
            total: this.totalQuestions,
            time: this.formatTime(timeElapsed),
            title: this.getScoreTitle(percentage),
            message: this.getScoreMessage(percentage)
        };
    }

    getScoreTitle(percentage) {
        if (percentage >= 90) return "Excellent!";
        if (percentage >= 75) return "Great Job!";
        if (percentage >= 60) return "Good Effort!";
        return "Keep Learning!";
    }

    getScoreMessage(percentage) {
        if (percentage >= 90) return "You're a cybersecurity expert! You identified threats accurately.";
        if (percentage >= 75) return "You have a strong understanding of cyber threats. Minor improvements needed.";
        if (percentage >= 60) return "You're on the right track! Review the feedback to improve your skills.";
        return "Consider reviewing cybersecurity best practices. Practice makes perfect!";
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    updateDisplay() {
        const scoreElement = document.getElementById('current-score');
        const levelElement = document.getElementById('current-level');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (levelElement) levelElement.textContent = this.level;
    }

    reset() {
        this.score = 0;
        this.level = 1;
        this.totalQuestions = 0;
        this.correctAnswers = 0;
        this.startTime = null;
        this.updateDisplay();
        console.log("Progress tracker reset");
    }

    getProgress() {
        return {
            score: this.score,
            level: this.level,
            completedScenarios: Array.from(this.completedScenarios),
            totalCompleted: this.completedScenarios.size
        };
    }
}