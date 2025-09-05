// ===== js/scenarios/PhishingScenario.js ===== 
class PhishingScenario extends BaseScenario {
    async loadData() {
        // In a real implementation, this would fetch from data/phishing-scenarios.json
        this.data = {
            title: "Email Phishing Detection",
            description: "Learn to identify and handle suspicious emails",
            steps: [
                {
                    title: "Suspicious Email Alert",
                    type: "email",
                    content: this.generateEmailInterface({
                        sender: "security@youbank-alert.com",
                        subject: "🚨 URGENT: Account Security Alert - Verify Now!",
                        body: `
                            <p>Dear Valued Customer,</p>
                            <p>We have detected unusual activity on your account. For your security, 
                            we need you to verify your account immediately.</p>
                            <p><strong style="color: red;">Your account will be suspended in 24 hours if not verified.</strong></p>
                            <p>Click the link below to verify your account:</p>
                            <p><a href="#" class="email-link suspicious-link">https://youbank-security-verify.net/login</a></p>
                            <p>Thank you for your immediate attention.</p>
                            <p>Security Team<br>YourBank</p>
                        `,
                        time: "2 minutes ago",
                        suspicious: true
                    }),
                    choices: [
                        {
                            id: "click_link",
                            text: "Click the verification link immediately",
                            points: -20,
                            feedback: "❌ This was a phishing attempt! The URL 'youbank-security-verify.net' is suspicious and doesn't match the official bank domain.",
                            education: "Always verify the sender's email domain and hover over links to check their destination before clicking.",
                            detailed: true
                        },
                        {
                            id: "call_bank",
                            text: "Call the bank directly to verify",
                            points: 25,
                            feedback: "✅ Excellent choice! Calling the bank directly is the safest way to verify if the email is legitimate.",
                            education: "When in doubt, always contact the organization through official channels listed on their website or your account statements."
                        },
                        {
                            id: "forward_email",
                            text: "Forward to friends to warn them",
                            points: -5,
                            feedback: "⚠️ While well-intentioned, forwarding suspicious emails can spread them further. Report to the bank instead.",
                            education: "Instead of forwarding, report suspicious emails to the organization's security team."
                        },
                        {
                            id: "ignore_email",
                            text: "Delete the email and ignore it",
                            points: 5,
                            feedback: "⚠️ Ignoring is better than clicking, but reporting it helps protect others too.",
                            education: "Deleting is safe, but reporting helps organizations track and prevent phishing attempts."
                        }
                    ]
                },
                {
                    title: "Email Analysis",
                    type: "analysis",
                    content: `
                        <div class="analysis-content">
                            <h3>Let's analyze what made this email suspicious:</h3>
                            <div class="red-flags">
                                <div class="flag-item">
                                    <span class="flag-icon">🚩</span>
                                    <div class="flag-content">
                                        <strong>Suspicious Domain:</strong> "youbank-alert.com" instead of the official bank domain
                                    </div>
                                </div>
                                <div class="flag-item">
                                    <span class="flag-icon">🚩</span>
                                    <div class="flag-content">
                                        <strong>Urgency Tactics:</strong> "24 hours" deadline and emergency language
                                    </div>
                                </div>
                                <div class="flag-item">
                                    <span class="flag-icon">🚩</span>
                                    <div class="flag-content">
                                        <strong>Generic Greeting:</strong> "Dear Valued Customer" instead of your name
                                    </div>
                                </div>
                                <div class="flag-item">
                                    <span class="flag-icon">🚩</span>
                                    <div class="flag-content">
                                        <strong>Suspicious Link:</strong> Domain doesn't match the claimed sender
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                    choices: [
                        {
                            id: "understand",
                            text: "I understand these warning signs",
                            points: 5,
                            feedback: "Great! Recognizing these patterns will help you identify future phishing attempts."
                        }
                    ]
                }
            ],
            quizQuestions: [
                {
                    question: "What is the most reliable way to verify a suspicious security email from your bank?",
                    options: [
                        "Click the link to see if it looks legitimate",
                        "Call the bank using the number from their official website",
                        "Reply to the email asking for confirmation",
                        "Forward it to friends for their opinion"
                    ],
                    correctAnswer: 1,
                    explanation: "Always contact organizations directly using official contact information to verify suspicious communications."
                },
                {
                    question: "Which of these is typically a red flag in phishing emails?",
                    options: [
                        "Personalized greeting with your full name",
                        "Links to the organization's official website",
                        "Urgent language demanding immediate action",
                        "Professional email formatting"
                    ],
                    correctAnswer: 2,
                    explanation: "Phishing emails often create false urgency to pressure victims into making quick, poor decisions."
                }
            ]
        };
    }

    generateEmailInterface(emailData) {
        return `
            <div class="email-interface">
                <div class="email-header">
                    <div class="email-toolbar">
                        <span class="email-btn">📧 Inbox</span>
                        <span class="email-btn">↩️ Reply</span>
                        <span class="email-btn">➡️ Forward</span>
                        <span class="email-btn">🗑️ Delete</span>
                    </div>
                </div>
                <div class="email-meta">
                    <div class="email-subject">${emailData.subject}</div>
                    <div class="email-sender">From: ${emailData.sender}</div>
                    <div class="email-time">Received: ${emailData.time}</div>
                    ${emailData.suspicious ? '<div class="warning-badge">⚠️ Potential Spam</div>' : ''}
                </div>
                <div class="email-content">
                    <div class="email-body">
                        ${emailData.body}
                    </div>
                </div>
            </div>
        `;
    }
}