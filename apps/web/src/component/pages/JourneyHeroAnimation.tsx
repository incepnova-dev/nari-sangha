import React from "react";
import styles from "./JourneyHeroAnimation.module.css";

const JourneyHeroAnimation: React.FC = () => {
    return (
        <div className={styles.animationContainer}>
            <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className={styles.heroSvg}>
                <defs>
                    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#e30b5d", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
                    </linearGradient>

                    <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "#fbbf24", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "#f59e0b", stopOpacity: 0.8 }} />
                    </linearGradient>

                    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
                    </linearGradient>

                    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#2563eb", stopOpacity: 1 }} />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.2)" />
                    </pattern>
                </defs>

                <circle cx="100" cy="100" r="60" fill="url(#primaryGrad)" opacity="0.1">
                    <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="500" cy="500" r="80" fill="url(#greenGrad)" opacity="0.08">
                    <animate attributeName="r" values="80;90;80" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="450" cy="120" r="50" fill="url(#blueGrad)" opacity="0.1">
                    <animate attributeName="r" values="50;60;50" dur="3.5s" repeatCount="indefinite" />
                </circle>

                <g className={styles.hubCenter}>
                    <circle cx="300" cy="300" r="45" fill="url(#primaryGrad)" filter="url(#glow)">
                        <animate attributeName="r" values="45;48;45" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="308" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">👤</text>
                </g>

                <circle cx="300" cy="300" r="140" fill="none" stroke="url(#dots)" strokeWidth="2" opacity="0.4" />
                <circle cx="300" cy="300" r="200" fill="none" stroke="url(#dots)" strokeWidth="2" opacity="0.3" />

                <g className={styles.orbitItem}>
                    <circle cx="300" cy="160" r="35" fill="url(#primaryGrad)" opacity="0.9">
                        <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="170" textAnchor="middle" fontSize="28">
                        🤰
                        <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="20s" repeatCount="indefinite" />
                    </text>
                </g>

                <g className={styles.orbitItem}>
                    <circle cx="420" cy="220" r="32" fill="url(#greenGrad)" opacity="0.9">
                        <animateTransform attributeName="transform" type="rotate" from="72 300 300" to="432 300 300" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <text x="420" y="230" textAnchor="middle" fontSize="26">
                        🌱
                        <animateTransform attributeName="transform" type="rotate" from="72 300 300" to="432 300 300" dur="20s" repeatCount="indefinite" />
                    </text>
                </g>

                <g className={styles.orbitItem}>
                    <circle cx="500" cy="300" r="35" fill="url(#blueGrad)" opacity="0.9">
                        <animateTransform attributeName="transform" type="rotate" from="144 300 300" to="504 300 300" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <text x="500" y="312" textAnchor="middle" fontSize="28">
                        🛡️
                        <animateTransform attributeName="transform" type="rotate" from="144 300 300" to="504 300 300" dur="20s" repeatCount="indefinite" />
                    </text>
                </g>

                <g className={styles.orbitItem}>
                    <circle cx="420" cy="380" r="32" fill="url(#softGrad)" opacity="0.9">
                        <animateTransform attributeName="transform" type="rotate" from="216 300 300" to="576 300 300" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <text x="420" y="390" textAnchor="middle" fontSize="26">
                        🩺
                        <animateTransform attributeName="transform" type="rotate" from="216 300 300" to="576 300 300" dur="20s" repeatCount="indefinite" />
                    </text>
                </g>

                <g className={styles.orbitItem}>
                    <circle cx="180" cy="380" r="32" fill="#f59e0b" opacity="0.9">
                        <animateTransform attributeName="transform" type="rotate" from="288 300 300" to="648 300 300" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <text x="180" y="390" textAnchor="middle" fontSize="26">
                        👥
                        <animateTransform attributeName="transform" type="rotate" from="288 300 300" to="648 300 300" dur="20s" repeatCount="indefinite" />
                    </text>
                </g>

                <g className={styles.connectionLines} opacity="0.3">
                    <line x1="300" y1="300" x2="300" y2="160" stroke="url(#primaryGrad)" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                    </line>
                    <line x1="300" y1="300" x2="420" y2="220" stroke="url(#greenGrad)" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.2s" repeatCount="indefinite" />
                    </line>
                    <line x1="300" y1="300" x2="500" y2="300" stroke="url(#blueGrad)" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="300" y1="300" x2="420" y2="380" stroke="url(#softGrad)" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.6s" repeatCount="indefinite" />
                    </line>
                    <line x1="300" y1="300" x2="180" y2="380" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.8s" repeatCount="indefinite" />
                    </line>
                </g>

                <g className={styles.particles}>
                    <circle cx="150" cy="200" r="3" fill="#e30b5d" opacity="0.6">
                        <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="450" cy="450" r="3" fill="#7c3aed" opacity="0.6">
                        <animate attributeName="cy" values="450;430;450" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
                    </circle>
                </g>

                <circle cx="300" cy="300" r="220" fill="none" stroke="url(#primaryGrad)" strokeWidth="4" opacity="0.2" strokeDasharray="1400">
                    <animate attributeName="stroke-dashoffset" from="1400" to="0" dur="3s" fill="freeze" />
                </circle>
            </svg>
        </div>
    );
};

export default JourneyHeroAnimation;
