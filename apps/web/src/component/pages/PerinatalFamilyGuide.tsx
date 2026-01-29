import React, { useState } from "react";
import styles from "./PerinatalFamilyGuide.module.css";

interface Symptom {
    id: string;
    title: string;
    icon: string;
    color: string;
    details: string[];
}

const SYMPTOMS: Symptom[] = [
    { id: "emotional", title: "Emotional Shifts", icon: "🎭", color: "#2196f3", details: ["Persistent sadness", "Intense irritability", "Loss of interest in baby", "Uncontrollable crying"] },
    { id: "behavioral", title: "Behavioral Changes", icon: "🚶", color: "#ff9800", details: ["Withdrawing from family", "Difficulty bonding", "Avoiding social contact", "Loss of appetite"] },
    { id: "cognitive", title: "Cognitive Fog", icon: "🧠", color: "#9c27b0", details: ["Difficulty concentrating", "Intrusive thoughts", "Memory gaps", "Decision-making paralysis"] },
    { id: "physical", title: "Physical Toll", icon: "📉", color: "#f44336", details: ["Extreme fatigue", "Unexplained aches", "Panic attacks", "Digestive issues"] },
    { id: "sleep", title: "Sleep Disturbance", icon: "🌙", color: "#673ab7", details: ["Insomnia even when baby sleeps", "Excessive sleep", "Night terrors", "Restless legs"] },
    { id: "social", title: "Social Anxiety", icon: "👥", color: "#4caf50", details: ["Fear of being alone", "Avoidance of phone calls", "Obsessive concern for baby", "Feeling like a 'bad' mother"] }
];

const PerinatalFamilyGuide: React.FC = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [activeSymptom, setActiveSymptom] = useState<Symptom | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - card.left) / card.width;
        const y = (e.clientY - card.top) / card.height;
        setTilt({ x: (x - 0.5) * 20, y: (y - 0.5) * -20 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div className={styles.perinatalFamilyPage}>
            <div className={styles.hero3dContainer}>
                <div
                    className={styles.hero3dCard}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
                >
                    <span className={styles.heroBadge}>Family Support System</span>
                    <h1 className={styles.heroTitle}>
                        Support Her Through <br />
                        <span className={styles.titleEmphasis}>Perinatal Depression</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A comprehensive guide for partners, family, and friends to recognize signs,
                        provide meaningful support, and navigate the journey to recovery together.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button className={styles.heroBadge} style={{ background: 'white', color: '#d81b60', border: '1px solid #d81b60' }}>
                            Start The Guide
                        </button>
                    </div>
                </div>
            </div>

            <section className={styles.wheelSection}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '16px' }}>Recognition Wheel</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
                            Interactive guide to understanding the various ways perinatal distress manifests.
                            Click a bubble to explore specific signs and how to help.
                        </p>
                    </div>

                    <div className={styles.wheelContainer}>
                        <div className={styles.wheelCenter}>
                            <span style={{ fontSize: '3rem' }}>❤️</span>
                            <span style={{ fontWeight: 800 }}>Observer Guide</span>
                        </div>
                        {SYMPTOMS.map((s, idx) => {
                            const angle = (idx * (360 / SYMPTOMS.length)) * (Math.PI / 180);
                            const left = 50 + (Math.cos(angle) * 35);
                            const top = 50 + (Math.sin(angle) * 35);
                            return (
                                <div
                                    key={s.id}
                                    className={styles.symptomSegment}
                                    style={{
                                        left: `${left}%`,
                                        top: `${top}%`,
                                        transform: 'translate(-50%, -50%)',
                                        borderTop: `5px solid ${s.color}`
                                    }}
                                    onClick={() => setActiveSymptom(s)}
                                >
                                    <span className={styles.symptomIcon}>{s.icon}</span>
                                    <span className={styles.symptomTitle}>{s.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.strategiesSection}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '16px' }}>Support Strategies</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
                            Practical, evidence-based methods to provide effective support. Hover to reveal clinical insights.
                        </p>
                    </div>

                    <div className={styles.strategiesGrid}>
                        <div className={styles.flipCard}>
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <span className={styles.strategyIcon}>👂</span>
                                    <h3>Active Listening</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>The power of presence without judgment.</p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <h3>The Approach</h3>
                                    <p>Listen without trying to 'fix' the problem. Validate her feelings with phrases like 'That sounds really hard' or 'I am here for you'.</p>
                                    <ul style={{ padding: '20px 0', fontSize: '0.85rem' }}>
                                        <li>✓ Eye contact & presence</li>
                                        <li>✓ No unsolicited advice</li>
                                        <li>✓ Validate, don't minimize</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flipCard}>
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <span className={styles.strategyIcon}>🧼</span>
                                    <h3>Practical Load</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Reducing the cognitive and physical burden.</p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <h3>Tangible Help</h3>
                                    <p>Take over specific tasks without asking. 'What can I do?' can be overwhelming. Instead, say 'I am doing the laundry now'.</p>
                                    <ul style={{ padding: '20px 0', fontSize: '0.85rem' }}>
                                        <li>✓ Household chores</li>
                                        <li>✓ Meal preparation</li>
                                        <li>✓ Night feeds management</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flipCard}>
                            <div className={styles.flipCardInner}>
                                <div className={styles.flipCardFront}>
                                    <span className={styles.strategyIcon}>🩺</span>
                                    <h3>Clinical Bridge</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Connecting to professional resources.</p>
                                </div>
                                <div className={styles.flipCardBack}>
                                    <h3>Professional Path</h3>
                                    <p>PPD is a medical condition, not a personality flaw. Help her book appointments and even drive her to them.</p>
                                    <ul style={{ padding: '20px 0', fontSize: '0.85rem' }}>
                                        <li>✓ Researching therapists</li>
                                        <li>✓ Managing appointments</li>
                                        <li>✓ Encouraging medical follow-up</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {activeSymptom && (
                <div className={styles.modal} onClick={() => setActiveSymptom(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <span className={styles.modalClose} onClick={() => setActiveSymptom(null)}>&times;</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '3rem' }}>{activeSymptom.icon}</span>
                            <h2 style={{ color: activeSymptom.color }}>{activeSymptom.title}</h2>
                        </div>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Common manifestations of {activeSymptom.title.toLowerCase()}:</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {activeSymptom.details.map((d, i) => (
                                <li key={i} style={{ padding: '12px', background: '#f8f8f8', marginBottom: '8px', borderRadius: '8px', borderLeft: `4px solid ${activeSymptom.color}` }}>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerinatalFamilyGuide;
