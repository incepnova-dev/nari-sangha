import React from "react";
import styles from "./JourneyFlow.module.css";

const JourneyFlow: React.FC = () => {
    return (
        <div className={styles.journeyFlowContainer}>
            <h2>How it works</h2>
            <p className={styles.sectionSubtitle}>Navigate your health journey with clarity and confidence</p>

            <div className={styles.journeyFlowMap}>
                {/* Central Hub */}
                <div className={styles.flowHub}>
                    <div className={styles.hubCore}>
                        <i className="fas fa-compass"></i>
                        <span>YOU</span>
                        <div className={styles.hubPulse}></div>
                    </div>
                </div>

                {/* Stage 1: Choose Your Path */}
                <div className={`${styles.flowStage} ${styles.stage1}`}>
                    <div className={styles.stageHeader}>
                        <span className={styles.stageNum}>1</span>
                        <h3>Choose Your Path</h3>
                    </div>
                    <div className={styles.stagePaths}>
                        <a href="#pregnancy" className={styles.pathPill}>
                            <span className={styles.pathEmoji}>🤰</span>
                            <span>Pregnancy</span>
                        </a>
                        <a href="#fertility" className={styles.pathPill}>
                            <span className={styles.pathEmoji}>🌱</span>
                            <span>Fertility</span>
                        </a>
                        <a href="#symptoms" className={styles.pathPill}>
                            <span className={styles.pathEmoji}>🩺</span>
                            <span>Symptoms</span>
                        </a>
                        <a href="#prevention" className={styles.pathPill}>
                            <span className={styles.pathEmoji}>🛡️</span>
                            <span>Prevention</span>
                        </a>
                        <a href="#community" className={styles.pathPill}>
                            <span className={styles.pathEmoji}>🤝</span>
                            <span>Community</span>
                        </a>
                    </div>
                </div>

                {/* Stage 2: Follow Your Steps */}
                <div className={`${styles.flowStage} ${styles.stage2}`}>
                    <div className={styles.stageHeader}>
                        <span className={styles.stageNum}>2</span>
                        <h3>Follow Your Steps</h3>
                    </div>
                    <div className={styles.stageCards}>
                        <div className={styles.microCard}>
                            <span className={styles.microEmoji}>📋</span>
                            <span>Checklists</span>
                        </div>
                        <div className={styles.microCard}>
                            <span className={styles.microEmoji}>📍</span>
                            <span>Action Plans</span>
                        </div>
                        <div className={styles.microCard}>
                            <span className={styles.microEmoji}>🔔</span>
                            <span>Reminders</span>
                        </div>
                        <div className={styles.microCard}>
                            <span className={styles.microEmoji}>📊</span>
                            <span>Track Progress</span>
                        </div>
                    </div>
                </div>

                {/* Stage 3: Get Expert Help */}
                <div className={`${styles.flowStage} ${styles.stage3}`}>
                    <div className={styles.stageHeader}>
                        <span className={styles.stageNum}>3</span>
                        <h3>Get Expert Help</h3>
                    </div>
                    <div className={styles.stageSupport}>
                        <div className={styles.supportBox}>
                            <div className={styles.supportIcon}>
                                <span>👨‍⚕️</span>
                            </div>
                            <div className={styles.supportText}>
                                <strong>Find Specialists</strong>
                                <small>Connect with verified doctors</small>
                            </div>
                        </div>
                        <div className={styles.supportBox}>
                            <div className={styles.supportIcon}>
                                <span>📹</span>
                            </div>
                            <div className={styles.supportText}>
                                <strong>Teleconsult</strong>
                                <small>Video call anytime</small>
                            </div>
                        </div>
                        <div className={styles.supportBox}>
                            <div className={styles.supportIcon}>
                                <span>💬</span>
                            </div>
                            <div className={styles.supportText}>
                                <strong>Ask Community</strong>
                                <small>Share & learn together</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connecting Lines (SVG) */}
                <svg className={styles.flowConnectors} viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#e30b5d", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M 400 372 Q 300 250, 200 160" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 200 160 Q 400 100, 600 160" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 600 160 Q 550 350, 400 480" stroke="url(#flowGradient)" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M 400 480 Q 450 420, 400 372" stroke="url(#flowGradient)" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="3,3">
                        <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2s" repeatCount="indefinite" />
                    </path>
                </svg>
            </div>

            {/* Quick Jump Navigation */}
            <div className={styles.quickJump}>
                <p className={styles.quickLabel}>Jump to any stage:</p>
                <div className={styles.quickButtons}>
                    <button className={`${styles.btn} ${styles.btnOutline}`}>
                        <span>🏠</span> Home
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>
                        <span>🤰</span> Start Journey
                    </button>
                    <button className={`${styles.btn} ${styles.btnGhost}`}>
                        <span>📊</span> My Dashboard
                    </button>
                    <button className={`${styles.btn} ${styles.btnGhost}`}>
                        <span>👨‍⚕️</span> Find Doctors
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JourneyFlow;
