// ===== js/scenarios/DataBreachScenario.js =====
class DataBreachScenario extends BaseScenario {
    async loadData() {
        this.data = {
            title: "Data Breach Response",
            description: "Learn how to handle personal data breaches",
            steps: [
                {
                    title: "Breach Notification",
                    type: "notification",
                    content: this.generateBreachNotification({
                        company: "SecureShop Online",
                        date: "March 15, 2024",
                        affected: "2.1 million users",
                        data: ["Email addresses", "Encrypted passwords", "Names", "Phone numbers"],
                        action: "We recommend changing your password immediately"
                    }),
                    choices: [
                        {
                            id: "ignore_notification",
                            text: "Ignore it - my password is strong enough",
                            points: -20,
                            feedback: "❌ Even strong passwords should be changed after a breach. The encrypted data might be cracked over time.",
                            education: "Breaches expose your data to criminals who may have years to crack encryption or find other ways to exploit it."
                        },
                        {
                            id: "change_password_same",
                            text: "Change password to a similar one",
                            points: -5,
                            feedback: "⚠️ Using similar passwords doesn't provide good security. Use a completely different, strong password.",
                            education: "Password variations (like adding a number) are easily guessed by attackers who know your old password."
                        },
                        {
                            id: "change_all_passwords",
                            text: "Change this password and check other accounts",
                            points: 25,
                            feedback: "✅ Excellent! Changing the breached password and checking reused passwords across other sites is the best approach.",
                            education: "Data breaches often lead to credential stuffing attacks where criminals try your leaked password on other sites."
                        },
                        {
                            id: "enable_2fa",
                            text: "Change password and enable two-factor authentication",
                            points: 30,
                            feedback: "✅ Perfect! This is the most comprehensive response. 2FA provides additional security even if passwords are compromised.",
                            education: "Two-factor authentication adds a crucial second layer of security that's much harder for attackers to bypass."
                        }
                    ]
                },
                {
                    title: "Identity Monitoring",
                    type: "monitoring",
                    content: `
                        <div class="monitoring-content">
                            <h3>Identity Theft Protection</h3>
                            <p>After a data breach, it's important to monitor for signs of identity theft:</p>
                            <div class="monitoring-checklist">
                                <div class="check-item">📊 Monitor credit reports regularly</div>
                                <div class="check-item">💳 Watch bank and credit card statements</div>
                                <div class="check-item">📧 Set up account alerts for unusual activity</div>
                                <div class="check-item">🔍 Check for unauthorized accounts opened in your name</div>
                                <div class="check-item">📱 Monitor social media for impersonation</div>
                            </div>
                        </div>
                    `,
                    choices: [
                        {
                            id: "no_monitoring",
                            text: "I'll just be more careful with emails",
                            points: -10,
                            feedback: "⚠️ Being careful with emails is good, but you need comprehensive monitoring after a breach.",
                            education: "Data breaches can lead to identity theft months or years later. Active monitoring is essential."
                        },
                        {
                            id: "basic_monitoring",
                            text: "I'll check my bank statements monthly",
                            points: 10,
                            feedback: "✅ Good start! Monthly monitoring is better than nothing, but consider more frequent checks.",
                            education: "The sooner you detect fraudulent activity, the easier it is to resolve and limit damage."
                        },
                        {
                            id: "comprehensive_monitoring",
                            text: "Set up alerts and check all accounts regularly",
                            points: 25,
                            feedback: "✅ Excellent! Comprehensive monitoring gives you the best chance of catching fraud early.",
                            education: "Automated alerts can notify you of suspicious activity within hours instead of weeks or months."
                        },
                        {
                            id: "credit_freeze",
                            text: "Freeze my credit reports with all bureaus",
                            points: 30,
                            feedback: "✅ Outstanding! Credit freezes prevent new accounts from being opened in your name without your permission.",
                            education: "Credit freezes are free and one of the most effective ways to prevent identity theft after a breach."
                        }
                    ]
                },
                {
                    title: "Legal Rights and Actions",
                    type: "legal",
                    content: `
                        <div class="legal-content">
                            <h3>Your Rights After a Data Breach</h3>
                            <div class="rights-list">
                                <div class="right-item">
                                    <strong>Right to Information:</strong> Companies must notify you about breaches affecting your data
                                </div>
                                <div class="right-item">
                                    <strong>Right to Free Credit Monitoring:</strong> Many companies offer free monitoring services after breaches
                                </div>
                                <div class="right-item">
                                    <strong>Right to Compensation:</strong> You may be eligible for compensation if you suffered damages
                                </div>
                                <div class="right-item">
                                    <strong>Right to Legal Action:</strong> You can join class-action lawsuits or file individual claims
                                </div>
                            </div>
                        </div>
                    `,
                    choices: [
                        {
                            id: "do_nothing_legal",
                            text: "I don't want to deal with legal issues",
                            points: 0,
                            feedback: "That's understandable, but you should at least take advantage of free services offered by the company.",
                            education: "Even if you don't pursue legal action, accepting free credit monitoring and identity protection services costs nothing."
                        },
                        {
                            id: "accept_free_services",
                            text: "Accept free credit monitoring from the company",
                            points: 15,
                            feedback: "✅ Good choice! Free monitoring services can help detect problems early with no cost to you.",
                            education: "Companies often provide free monitoring for 1-2 years after a breach. Take advantage of these services."
                        },
                        {
                            id: "research_legal_options",
                            text: "Research legal options and class-action lawsuits",
                            points: 20,
                            feedback: "✅ Smart approach! Understanding your legal rights helps you make informed decisions about potential compensation.",
                            education: "Many data breach lawsuits result in settlements that provide additional monitoring services or monetary compensation."
                        }
                    ]
                }
            ],
            quizQuestions: [
                {
                    question: "What should you do first when you receive a data breach notification?",
                    options: [
                        "Wait to see if you notice any problems",
                        "Change your password immediately",
                        "Delete the notification email",
                        "Share the news on social media"
                    ],
                    correctAnswer: 1,
                    explanation: "Immediately changing your password reduces the window of opportunity for attackers to use your compromised credentials."
                },
                {
                    question: "What is a credit freeze?",
                    options: [
                        "A temporary hold on your credit card",
                        "A way to stop all credit monitoring",
                        "A block preventing new credit accounts from being opened",
                        "A method to improve your credit score"
                    ],
                    correctAnswer: 2,
                    explanation: "Credit freezes prevent creditors from accessing your credit report, making it nearly impossible for identity thieves to open new accounts in your name."
                },
                {
                    question: "How long should you monitor for identity theft after a data breach?",
                    options: [
                        "Just for the first month",
                        "Until you receive the breach notification",
                        "For at least 1-2 years, possibly longer",
                        "Only if you notice suspicious activity"
                    ],
                    correctAnswer: 2,
                    explanation: "Identity thieves may wait months or years before using stolen data, so long-term monitoring is essential for protection."
                }
            ]
        };
    }

    generateBreachNotification(data) {
        return `
            <div class="breach-notification">
                <div class="notification-header">
                    <div class="company-logo">🛒</div>
                    <div class="company-info">
                        <h2>${data.company}</h2>
                        <p>Security Notice</p>
                    </div>
                </div>
                <div class="notification-content">
                    <div class="breach-alert">
                        <h3>⚠️ Important Security Notice</h3>
                        <p><strong>Date of Incident:</strong> ${data.date}</p>
                        <p><strong>Affected Users:</strong> ${data.affected}</p>
                    </div>
                    <div class="breach-details">
                        <h4>What Information Was Involved:</h4>
                        <ul>
                            ${data.data.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <h4>What We're Doing:</h4>
                        <p>We have secured the vulnerability, notified law enforcement, and are working with cybersecurity experts to investigate this incident.</p>
                        <h4>What You Should Do:</h4>
                        <p>${data.action}</p>
                        <div class="action-buttons-notification">
                            <button class="notification-btn">Change Password</button>
                            <button class="notification-btn">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}