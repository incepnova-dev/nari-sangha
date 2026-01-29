import React, { useState } from "react";
import styles from "./FertilityJourney.module.css";
import InnerPageHero from "../shared/InnerPageHero";

const FertilityJourney: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const [stressLevel, setStressLevel] = useState(20);
    const [temp, setTemp] = useState(36.5);
    const [mucus, setMucus] = useState(30);

    const phases = [
        { name: "Menstrual", start: 1, end: 5, color: "#e74c3c", emoji: "🩸", desc: "Uterine lining sheds. Progesterone and estrogen are at their lowest." },
        { name: "Follicular", start: 6, end: 12, color: "#3498db", emoji: "🥚", desc: "FSH stimulates egg-containing follicles to grow. Estrogen begins to rise." },
        { name: "Ovulation", start: 13, end: 15, color: "#f39c12", emoji: "✨", desc: "LH surge triggers egg release. Body temperature rises slightly." },
        { name: "Luteal", start: 16, end: 28, color: "#27ae60", emoji: "🌿", desc: "Progesterone rises to prepare for possible pregnancy. Energy might dip." }
    ];

    const currentPhase = phases.find(p => selectedDay >= p.start && selectedDay <= p.end) || phases[0];

    const getSegmentPath = (startDay: number, endDay: number) => {
        const totalDays = 28;
        const radius = 160;
        const centerX = 200;
        const centerY = 200;

        const startAngle = (startDay - 1) * (360 / totalDays);
        const endAngle = endDay * (360 / totalDays);

        const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    return (
        <div className={styles.fertilityPage}>
            <InnerPageHero
                title="Fertility & TTC Journey"
                subtitle="Understand your unique rhythm. Track your cycle, identify your fertile window, and optimize your chances naturally."
                badge="Fertility Constellation"
            />

            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Interactive Cycle Visualizer</h2>
                    <p className={styles.sectionSubtitle}>Select a day to understand what's happening in your body.</p>

                    <div className={styles.visualizerContainer}>
                        <div className={styles.visualizerLeft}>
                            <svg viewBox="0 0 400 400" className={styles.cycleRing}>
                                {phases.map((phase, idx) => (
                                    <path
                                        key={idx}
                                        d={getSegmentPath(phase.start, phase.end)}
                                        stroke={phase.color}
                                        className={`${styles.cycleSegment} ${currentPhase.name === phase.name ? styles.active : ""}`}
                                        onClick={() => setSelectedDay(phase.start)}
                                    />
                                ))}
                                {/* Indicator for selected day */}
                                <circle
                                    cx={200 + 160 * Math.cos(((selectedDay - 1) * (360 / 28) * Math.PI) / 180)}
                                    cy={200 + 160 * Math.sin(((selectedDay - 1) * (360 / 28) * Math.PI) / 180)}
                                    r="10"
                                    fill="#e30b5d"
                                    stroke="white"
                                    strokeWidth="3"
                                />
                            </svg>
                            <div className={styles.cycleCenter}>
                                <div className={styles.dayDisplay}>Day {selectedDay}</div>
                                <div className={styles.phaseName} style={{ color: currentPhase.color }}>{currentPhase.emoji} {currentPhase.name}</div>
                            </div>
                        </div>

                        <div className={styles.visualizerRight}>
                            <h3 className={styles.phaseName}>{currentPhase.name} Phase</h3>
                            <p className={styles.phaseDesc}>{currentPhase.desc}</p>
                            <div className={styles.daySelection}>
                                <input
                                    type="range"
                                    min="1"
                                    max="28"
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.simulatorSection}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Conception Simulator</h2>
                    <p className={styles.sectionSubtitle}>Adjust your biological markers to see how they impact your fertility architecture.</p>

                    <div className={styles.simGrid}>
                        <div className={styles.controls}>
                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}>
                                    <span>Stress Level</span>
                                    <span>{stressLevel}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={stressLevel}
                                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                                    className={styles.slider}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>High stress increases cortisol, potentially delaying ovulation.</p>
                            </div>

                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}>
                                    <span>Basal Temp</span>
                                    <span>{temp}°C</span>
                                </div>
                                <input
                                    type="range"
                                    min="35"
                                    max="38"
                                    step="0.1"
                                    value={temp}
                                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                                    className={styles.slider}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>A 0.3°C - 0.5°C rise typically confirms ovulation.</p>
                            </div>

                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}>
                                    <span>Cervical Mucus</span>
                                    <span>{mucus}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={mucus}
                                    onChange={(e) => setMucus(parseInt(e.target.value))}
                                    className={styles.slider}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Clear, stretchy mucus (egg-white) indicates peak fertility.</p>
                            </div>
                        </div>

                        <div className={styles.visualization}>
                            <div className={styles.feedbackCard}>
                                <h3>Architectural Status</h3>
                                {stressLevel > 70 ? (
                                    <div style={{ color: '#d32f2f' }}>⚠️ High Stress: Hormone balance might be disrupted.</div>
                                ) : (
                                    <div style={{ color: '#2e7d32' }}>✅ Calm State: Ideal for hormonal signaling.</div>
                                )}

                                {mucus > 70 ? (
                                    <div style={{ color: '#2e7d32', marginTop: '10px' }}>🌟 Peak Mucus: Sperm friendly environment detected.</div>
                                ) : (
                                    <div style={{ color: '#666', marginTop: '10px' }}>○ Baseline Mucus: Keep tracking.</div>
                                )}

                                <div style={{ marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
                                    <strong>AI Insight:</strong> {
                                        stressLevel < 30 && mucus > 60 && temp > 36.6
                                            ? "Conditions are highly favorable for conception. Focus on relaxation."
                                            : "Your body is currently in a preparation phase. Maintain consistent tracking."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Fertility Methods</h2>
                    <div className={styles.methodsGrid}>
                        <div className={styles.methodCard}>
                            <div className={styles.methodIcon}>🌡️</div>
                            <h3>FAM Method</h3>
                            <p>Fertility Awareness-Based Methods track temp and mucus to predict fertile days.</p>
                        </div>
                        <div className={styles.methodCard}>
                            <div className={styles.methodIcon}>🧪</div>
                            <h3>OPK Tests</h3>
                            <p>Ovulation Predictor Kits detect the LH surge 24-48 hours before egg release.</p>
                        </div>
                        <div className={styles.methodCard}>
                            <div className={styles.methodIcon}>📱</div>
                            <h3>AI Tracking</h3>
                            <p>Using algorithms to predict cycles based on historical data and symptoms.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FertilityJourney;
