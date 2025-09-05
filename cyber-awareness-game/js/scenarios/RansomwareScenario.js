// ===== js/scenarios/RansomwareScenario.js =====
class RansomwareScenario extends BaseScenario {
    async loadData() {
        this.data = {
            title: "Ransomware Attack Simulation",
            description: "Learn how to respond to ransomware threats",
            steps: [
                {
                    title: "Suspicious Download Warning",
                    type: "system",
                    content: this.generateSystemInterface({
                        title: "File Download",
                        message: "You've received an email with an attachment: 'Invoice_2024_URGENT.exe'",
                        warning: "Your antivirus has flagged this file as potentially dangerous.",
                        systemType: "download"
                    }),
                    choices: [
                        {
                            id: "download_anyway",
                            text: "Download anyway - I need to see the invoice",
                            points: -25,
                            feedback: "❌ Downloading suspicious executable files is extremely dangerous! This could be ransomware.",
                            education: "Never download files flagged by antivirus, especially executable files (.exe) from unknown sources."
                        },
                        {
                            id: "scan_first",
                            text: "Run additional antivirus scan on the file",
                            points: 15,
                            feedback: "✅ Good thinking! Always scan suspicious files, but be aware that some malware can evade detection.",
                            education: "Multiple security layers provide better protection than relying on a single antivirus solution."
                        },
                        {
                            id: "delete_file",
                            text: "Delete the file immediately",
                            points: 20,
                            feedback: "✅ Excellent choice! When antivirus flags a file as dangerous, it's best to delete it immediately.",
                            education: "Trust your security software's warnings - it's better to be safe than sorry."
                        },
                        {
                            id: "contact_sender",
                            text: "Contact the sender to verify the file",
                            points: 10,
                            feedback: "⚠️ Good instinct to verify, but be careful - the sender's email might be compromised.",
                            education: "Always verify through a separate communication channel, not by replying to the suspicious email."
                        }
                    ]
                },
                {
                    title: "Ransomware Attack in Progress",
                    type: "system",
                    content: this.generateSystemInterface({
                        title: "SYSTEM COMPROMISED",
                        message: "Your files are being encrypted!",
                        warning: "Ransomware detected: All your files will be encrypted unless you pay $500 in Bitcoin within 24 hours.",
                        systemType: "attack",
                        critical: true
                    }),
                    choices: [
                        {
                            id: "pay_ransom",
                            text: "Pay the ransom to get my files back",
                            points: -30,
                            feedback: "❌ Never pay ransoms! There's no guarantee you'll get your files back, and it funds criminal activity.",
                            education: "Paying ransom encourages more attacks and doesn't guarantee file recovery. Many victims never get their files back even after paying."
                        },
                        {
                            id: "disconnect_network",
                            text: "Immediately disconnect from the network",
                            points: 25,
                            feedback: "✅ Excellent! Disconnecting prevents the ransomware from spreading to other systems and encrypting network drives.",
                            education: "Quick isolation is crucial to limit damage. Disconnect ethernet cables and turn off Wi-Fi immediately."
                        },
                        {
                            id: "restart_computer",
                            text: "Restart the computer to stop the attack",
                            points: -5,
                            feedback: "⚠️ Restarting might stop the current process, but the malware will likely resume when you restart.",
                            education: "Ransomware often survives restarts and may continue encryption. Professional removal is needed."
                        },
                        {
                            id: "call_it_support",
                            text: "Call IT support immediately",
                            points: 20,
                            feedback: "✅ Good choice! Professional IT support can help contain the attack and begin recovery procedures.",
                            education: "Incident response should involve IT professionals who can properly assess and contain the threat."
                        }
                    ]
                },
                {
                    title: "Recovery Planning",
                    type: "recovery",
                    content: `
                        <div class="recovery-content">
                            <h3>Post-Attack Recovery Steps</h3>
                            <p>Now that the immediate threat is contained, let's plan recovery:</p>
                            <div class="recovery-steps">
                                <div class="step-item">1. Isolate affected systems</div>
                                <div class="step-item">2. Assess damage scope</div>
                                <div class="step-item">3. Check backup availability</div>
                                <div class="step-item">4. Remove malware completely</div>
                                <div class="step-item">5. Restore from clean backups</div>
                                <div class="step-item">6. Update security measures</div>
                            </div>
                        </div>
                    `,
                    choices: [
                        {
                            id: "restore_backup",
                            text: "Restore files from yesterday's backup",
                            points: 25,
                            feedback: "✅ Perfect! Regular backups are your best defense against ransomware. This is why backup strategies are crucial.",
                            education: "Follow the 3-2-1 rule: 3 copies of important data, on 2 different media types, with 1 copy stored offsite."
                        },
                        {
                            id: "no_backup",
                            text: "We don't have recent backups",
                            points: -10,
                            feedback: "⚠️ This highlights the importance of regular backups. Without them, recovery becomes much more difficult.",
                            education: "Implement automated daily backups and test them regularly to ensure they work when needed."
                        }
                    ]
                },
                {
                    title: "Prevention Education",
                    type: "education",
                    content: `
                        <div class="education-content">
                            <h3>🛡️ Ransomware Prevention Best Practices</h3>
                            <p>Let's review key strategies to prevent future ransomware attacks:</p>
                            <div class="prevention-grid">
                                <div class="prevention-item">
                                    <div class="prevention-icon">💾</div>
                                    <h4>Regular Backups</h4>
                                    <p>Maintain automated backups using the 3-2-1 rule: 3 copies, 2 different media, 1 offsite</p>
                                </div>
                                <div class="prevention-item">
                                    <div class="prevention-icon">🔄</div>
                                    <h4>Keep Software Updated</h4>
                                    <p>Install security updates promptly to patch vulnerabilities that ransomware exploits</p>
                                </div>
                                <div class="prevention-item">
                                    <div class="prevention-icon">📧</div>
                                    <h4>Email Vigilance</h4>
                                    <p>Be extremely cautious with email attachments, especially executable files</p>
                                </div>
                                <div class="prevention-item">
                                    <div class="prevention-icon">🔐</div>
                                    <h4>Network Segmentation</h4>
                                    <p>Isolate critical systems and limit user access privileges</p>
                                </div>
                                <div class="prevention-item">
                                    <div class="prevention-icon">🎯</div>
                                    <h4>Employee Training</h4>
                                    <p>Regular cybersecurity awareness training for all staff members</p>
                                </div>
                                <div class="prevention-item">
                                    <div class="prevention-icon">🚨</div>
                                    <h4>Incident Response Plan</h4>
                                    <p>Have a clear plan for responding quickly to security incidents</p>
                                </div>
                            </div>
                        </div>
                    `,
                    choices: [
                        {
                            id: "implement_plan",
                            text: "I'll implement these security measures",
                            points: 15,
                            feedback: "✅ Excellent commitment to cybersecurity! Proactive measures are the best defense against ransomware.",
                            education: "Create a checklist and timeline to implement these measures systematically in your organization."
                        },
                        {
                            id: "need_help",
                            text: "I need help implementing these measures",
                            points: 10,
                            feedback: "✅ Smart to recognize when you need assistance! Consider consulting with IT security professionals.",
                            education: "Many organizations benefit from working with cybersecurity consultants to develop comprehensive protection strategies."
                        },
                        {
                            id: "already_protected",
                            text: "We already have most of these in place",
                            points: 20,
                            feedback: "✅ Great! Regular review and testing of security measures ensures they remain effective.",
                            education: "Even with good security in place, regular audits and updates are essential as threats evolve."
                        }
                    ]
                }
            ],
            quizQuestions: [
                {
                    question: "What should you do first when you discover a ransomware attack is in progress?",
                    options: [
                        "Pay the ransom immediately to minimize damage",
                        "Disconnect the infected system from the network",
                        "Try to delete the ransomware manually",
                        "Restart the computer multiple times"
                    ],
                    correctAnswer: 1,
                    explanation: "Immediate network isolation prevents ransomware from spreading to other systems and encrypting shared network drives."
                },
                {
                    question: "What is the best defense against ransomware?",
                    options: [
                        "Having comprehensive cyber insurance",
                        "Using the latest antivirus software",
                        "Maintaining regular, tested backups",
                        "Never opening email attachments"
                    ],
                    correctAnswer: 2,
                    explanation: "While all options help, regular backups are the most effective way to recover from ransomware without paying criminals."
                },
                {
                    question: "Why should you never pay ransomware demands?",
                    options: [
                        "It's too expensive for most people",
                        "There's no guarantee you'll get your files back",
                        "It's technically difficult to pay in Bitcoin",
                        "Your antivirus will block the payment"
                    ],
                    correctAnswer: 1,
                    explanation: "Many victims never receive decryption keys even after payment, and paying funds criminal operations and encourages more attacks."
                },
                {
                    question: "What does the '3-2-1 backup rule' mean?",
                    options: [
                        "3 antivirus programs, 2 firewalls, 1 backup",
                        "3 copies of data, 2 different media types, 1 offsite copy",
                        "Back up 3 times daily, 2 times weekly, 1 time monthly",
                        "3 years of backups, 2 verification checks, 1 restore test"
                    ],
                    correctAnswer: 1,
                    explanation: "The 3-2-1 rule ensures data protection through multiple copies stored in different locations and formats, providing redundancy against various threats."
                },
                {
                    question: "How often should organizations test their backup and recovery procedures?",
                    options: [
                        "Only when a disaster occurs",
                        "Once per year during annual reviews",
                        "Quarterly or bi-annually with documented results",
                        "Only when implementing new backup systems"
                    ],
                    correctAnswer: 2,
                    explanation: "Regular testing ensures backups are working properly and recovery procedures can be executed quickly during an actual incident."
                }
            ]
        };
    }

    generateSystemInterface(systemData) {
        const alertClass = systemData.critical ? 'system-error' : 'system-warning';
        
        return `
            <div class="system-interface">
                <div class="system-header">
                    <span>🖥️ ${systemData.title}</span>
                    <div class="system-controls">
                        <span class="sys-btn">_</span>
                        <span class="sys-btn">□</span>
                        <span class="sys-btn">✕</span>
                    </div>
                </div>
                <div class="system-content">
                    <div class="${alertClass}">
                        <div class="alert-icon">
                            ${systemData.critical ? '🚨' : '⚠️'}
                        </div>
                        <div class="alert-content">
                            <h3>${systemData.message}</h3>
                            ${systemData.warning ? `<p class="warning-text">${systemData.warning}</p>` : ''}
                        </div>
                    </div>
                    ${systemData.systemType === 'attack' ? this.generateRansomwareMessage() : ''}
                    ${systemData.systemType === 'download' ? this.generateDownloadWarning() : ''}
                </div>
            </div>
        `;
    }

    generateRansomwareMessage() {
        return `
            <div class="ransom-message">
                <div class="ransom-header">
                    <h2 style="color: red; text-align: center;">🔒 YOUR FILES ARE ENCRYPTED! 🔒</h2>
                </div>
                <div class="ransom-body">
                    <p style="text-align: center; font-weight: bold;">All your important files have been encrypted with military-grade encryption.</p>
                    
                    <div class="ransom-details">
                        <p>📁 <strong>Files affected:</strong> Documents, Pictures, Videos, Databases</p>
                        <p>🔐 <strong>Encryption:</strong> AES-256 + RSA-2048</p>
                        <p>⏰ <strong>Time remaining:</strong> <span class="countdown">23:47:33</span></p>
                    </div>
                    
                    <div class="ransom-payment">
                        <p style="text-align: center;"><strong>You have 24 hours to pay $500 USD in Bitcoin to:</strong></p>
                        <div class="bitcoin-address">1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S</div>
                        <p style="text-align: center;">After payment, you will receive the decryption key.</p>
                    </div>
                    
                    <div class="ransom-warning" style="margin-top: 1rem; padding: 1rem; background: #330000; border: 1px solid #ff0000;">
                        <p style="color: #ff0000; font-weight: bold; text-align: center;">⚠️ WARNING ⚠️</p>
                        <p style="color: #ff0000; text-align: center;">Do not restart your computer or attempt to remove this software.</p>
                        <p style="color: #ff0000; text-align: center;">Your decryption key will be lost forever!</p>
                    </div>
                    
                    <div class="fake-buttons" style="text-align: center; margin-top: 1rem;">
                        <button class="fake-btn" style="background: #ff0000; color: white; padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 3px; cursor: not-allowed;" disabled>
                            💳 Pay Now
                        </button>
                        <button class="fake-btn" style="background: #333; color: white; padding: 0.5rem 1rem; margin: 0.5rem; border: none; border-radius: 3px; cursor: not-allowed;" disabled>
                            📞 Contact Support
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateDownloadWarning() {
        return `
            <div class="download-warning">
                <div class="file-info">
                    <div class="file-icon">📄</div>
                    <div class="file-details">
                        <p><strong>File:</strong> Invoice_2024_URGENT.exe</p>
                        <p><strong>Size:</strong> 2.3 MB</p>
                        <p><strong>Source:</strong> billing@company-invoices.net</p>
                        <p><strong>Detection:</strong> <span style="color: #dc3545;">⚠️ Trojan.Ransomware.Generic</span></p>
                    </div>
                </div>
                
                <div class="security-alert">
                    <h4 style="color: #dc3545;">🛡️ Security Alert</h4>
                    <ul style="color: #dc3545;">
                        <li>This file has been flagged as malicious</li>
                        <li>Executable files can contain harmful code</li>
                        <li>The sender domain appears suspicious</li>
                        <li>File extension (.exe) is potentially dangerous</li>
                    </ul>
                </div>
                
                <div class="recommendation">
                    <p style="font-weight: bold; color: #007bff;">🔍 Recommendation:</p>
                    <p>Do not download or execute this file. Contact the sender through official channels to verify legitimacy.</p>
                </div>
            </div>
        `;
    }
}
