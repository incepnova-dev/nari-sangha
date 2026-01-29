import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import intStyles from "../../styles/common/StaticIntegration.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";
import "../../styles/themes.module.css";

const FertilityJourney: React.FC = () => {
    const navigate = useNavigate();
    const [currentDay, setCurrentDay] = useState(14);
    const [activePhase, setActivePhase] = useState(3);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeFactor, setActiveFactor] = useState<string | null>(null);

    // Hormone levels based on cycle day
    const getHormoneLevels = useCallback((day: number) => {
        if (day <= 5) {
            return { estrogen: 20, lh: 5, progesterone: 5 };
        } else if (day <= 10) {
            return { estrogen: 45, lh: 10, progesterone: 8 };
        } else if (day <= 14) {
            return { estrogen: 85, lh: day === 14 ? 95 : 30, progesterone: 12 };
        } else if (day <= 21) {
            return { estrogen: 55, lh: 15, progesterone: 75 };
        } else {
            return { estrogen: 35, lh: 8, progesterone: 45 };
        }
    }, []);

    const [hormones, setHormones] = useState(() => getHormoneLevels(14));

    const phaseData = [
        { name: "Menstrual", days: "1-5", emoji: "🩸", color: "var(--pink-primary)" },
        { name: "Follicular", days: "6-13", emoji: "🌱", color: "var(--accent-orange)" },
        { name: "Ovulation", days: "14-16", emoji: "🌟", color: "var(--accent-green)" },
        { name: "Luteal", days: "17-28", emoji: "🌙", color: "var(--accent-blue)" }
    ];

    const trackingMethods = [
        { icon: "📅", title: "Calendar Method", description: "Track cycle length for 6+ months. Fertile window typically days 10-17 of a 28-day cycle.", badge: "✅ Easy to Start" },
        { icon: "🌡️", title: "Basal Body Temperature", description: "Measure temperature first thing each morning. A 0.5-1°F rise indicates ovulation occurred.", badge: "⭐ Most Accurate" },
        { icon: "💧", title: "Cervical Mucus", description: "Check consistency daily. Clear, stretchy, egg-white mucus signals peak fertility.", badge: "🔧 No Equipment" },
        { icon: "🧪", title: "Ovulation Predictor Kits", description: "Urine tests detect LH surge 24-48 hours before ovulation. Test daily during fertile window.", badge: "⚡ Most Convenient" },
        { icon: "📱", title: "Fertility Apps", description: "Digital tracking combines multiple methods. Predictions improve over time with your data.", badge: "🔄 Comprehensive" },
        { icon: "🔬", title: "Fertility Monitors", description: "Advanced devices measure hormones or detect fertile saliva patterns for precise prediction.", badge: "💎 Premium" }
    ];

    const optimizationTips = [
        { icon: "🥗", title: "Nutrition", tips: ["Folic acid: 400-800 mcg daily", "Antioxidants: berries, nuts, leafy greens", "Healthy fats: avocado, olive oil, fish", "Limit processed foods and trans fats"] },
        { icon: "⚖️", title: "Healthy Weight", tips: ["BMI 18.5-24.9 optimal for fertility", "Under/overweight affects ovulation", "Gradual, sustainable changes best", "Focus on overall health, not just numbers"] },
        { icon: "🏃‍♀️", title: "Exercise", tips: ["Moderate activity 30 min most days", "Improves circulation and hormone balance", "Avoid excessive intense exercise", "Yoga and walking are excellent choices"] },
        { icon: "🚭", title: "Avoid Toxins", tips: ["No smoking or secondhand smoke", "Limit alcohol consumption", "Reduce caffeine (under 200mg/day)", "Minimize environmental toxins"] },
        { icon: "🧘‍♀️", title: "Stress Management", tips: ["High stress can affect ovulation", "Practice meditation or mindfulness", "Adequate sleep (7-9 hours nightly)", "Consider counseling or support groups"] },
        { icon: "💊", title: "Supplements", tips: ["Prenatal vitamin before conception", "CoQ10 may improve egg quality", "Vitamin D if deficient", "Always consult doctor first"] }
    ];

    const whenToConsult = [
        "Trying for over 12 months without success (or 6 months if over 35)",
        "Irregular or absent periods",
        "Known fertility conditions (PCOS, endometriosis)",
        "History of miscarriage",
        "Male partner fertility concerns"
    ];

    // Determine phase from day
    const getPhaseFromDay = (day: number) => {
        if (day <= 5) return 1;
        if (day <= 13) return 2;
        if (day <= 16) return 3;
        return 4;
    };

    // Update simulation based on day slider
    const updateSimulation = (day: number) => {
        setCurrentDay(day);
        setActivePhase(getPhaseFromDay(day));
        setHormones(getHormoneLevels(day));
    };

    // Play full cycle simulation
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentDay((prev) => {
                    const next = prev >= 28 ? 1 : prev + 1;
                    setActivePhase(getPhaseFromDay(next));
                    setHormones(getHormoneLevels(next));
                    return next;
                });
            }, 500);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, getHormoneLevels]);

    const toggleFactor = (factor: string) => {
        setActiveFactor(activeFactor === factor ? null : factor);
    };

    const getInsight = () => {
        const phase = getPhaseFromDay(currentDay);
        switch (phase) {
            case 1:
                return { icon: "🩸", title: "Menstruation Begins", text: "Hormones are low. The uterine lining is shedding. Energy may be lower." };
            case 2:
                return { icon: "🌱", title: "Building Phase", text: "Estrogen is rising. Follicles are maturing. Energy and mood often improve." };
            case 3:
                return { icon: "🌟", title: "Peak Fertility", text: "Fertile window! LH surges, egg is released. Best time for conception." };
            case 4:
                return { icon: "🌙", title: "Preparation Phase", text: "Progesterone peaks. Body prepares for possible pregnancy or next cycle." };
            default:
                return { icon: "📊", title: "Cycle Tracking", text: "Understanding your cycle helps optimize fertility." };
        }
    };

    const insight = getInsight();

    return (
        <div className="app-container theme-lavender">
            <InnerPageHero
                title="Fertility & Trying to Conceive"
                subtitle="Understand your cycle, optimize your health, and prepare for conception with expert guidance and support."
                badge="Fertility Journey"
            />

            {/* Back Button */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 20px 0' }}>
                <button
                    onClick={() => navigate(ROUTES.JOURNEYS)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 16px",
                        background: "white",
                        border: "1px solid #eee",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#666",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f9f9f9";
                        e.currentTarget.style.color = "var(--pink-primary)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.color = "#666";
                    }}
                >
                    <span style={{ fontSize: "16px" }}>←</span>
                    Back to all journeys
                </button>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Interactive Body Simulator Section */}
                <section className={intStyles.bodySimulatorSection} style={{ marginBottom: '60px' }}>
                    <div className={intStyles.sectionHeader}>
                        <span style={{
                            display: "inline-block",
                            background: "var(--accent-light-orange)",
                            color: "var(--accent-orange)",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "20px",
                            marginBottom: "1rem",
                            letterSpacing: "0.05em"
                        }}>LIVE SIMULATION</span>
                        <h2 className={intStyles.sectionTitle}>Bio-Digital Body Twin</h2>
                        <p className={intStyles.sectionSubtitle}>Travel through your cycle day-by-day to see the hidden choreography of your fertility.</p>
                    </div>

                    <div className={intStyles.bodySimContainer}>
                        {/* Control Panel */}
                        <div style={{ position: 'sticky', top: '2rem' }}>
                            <div className={intStyles.controlPanel}>
                                {/* Day Slider */}
                                <div className={intStyles.controlGroup}>
                                    <div className={intStyles.controlLabel}>
                                        <span>⏳</span> Cycle Time Travel
                                    </div>
                                    <div className={intStyles.sliderContainer}>
                                        <div className={intStyles.sliderHeader}>
                                            <span className={intStyles.sliderName}>Current Day</span>
                                            <span className={intStyles.sliderValue}>Day {currentDay}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="28"
                                            value={currentDay}
                                            className={intStyles.slider}
                                            onChange={(e) => updateSimulation(Number(e.target.value))}
                                        />
                                        <div style={{ display: 'flex', height: '6px', marginTop: '10px', borderRadius: '3px', overflow: 'hidden' }}>
                                            <span style={{ width: '18%', background: 'var(--pink-primary)', opacity: 0.7 }}></span>
                                            <span style={{ width: '30%', background: 'var(--accent-orange)', opacity: 0.7 }}></span>
                                            <span style={{ width: '14%', background: 'var(--accent-green)', opacity: 0.7 }}></span>
                                            <span style={{ width: '38%', background: 'var(--accent-blue)', opacity: 0.7 }}></span>
                                        </div>
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            style={{
                                                width: '100%',
                                                marginTop: '1rem',
                                                padding: '0.8rem',
                                                background: isPlaying ? 'var(--pink-primary)' : '#212121',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {isPlaying ? '⏸ Pause' : '▶ Run Full Cycle Simulation'}
                                        </button>
                                    </div>
                                </div>

                                {/* Hormone Levels */}
                                <div className={intStyles.controlGroup}>
                                    <div className={intStyles.controlLabel}>
                                        <span>📊</span> Hormone Levels
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#555' }}>
                                            <label style={{ width: '80px', fontWeight: '600' }}>Estrogen</label>
                                            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${hormones.estrogen}%`, background: '#f06292', transition: 'width 0.5s' }}></div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#555' }}>
                                            <label style={{ width: '80px', fontWeight: '600' }}>LH Surge</label>
                                            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${hormones.lh}%`, background: '#ba68c8', transition: 'width 0.5s' }}></div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#555' }}>
                                            <label style={{ width: '80px', fontWeight: '600' }}>Progesterone</label>
                                            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${hormones.progesterone}%`, background: '#4db6ac', transition: 'width 0.5s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lifestyle Modifiers */}
                                <div className={intStyles.controlGroup}>
                                    <div className={intStyles.controlLabel}>
                                        <span>🧘‍♀️</span> Lifestyle Modifiers
                                    </div>
                                    <div className={intStyles.factorButtons}>
                                        <button
                                            className={`${intStyles.factorBtn} ${activeFactor === 'stress' ? intStyles.factorBtnActive : ''}`}
                                            onClick={() => toggleFactor('stress')}
                                        >
                                            <span>⚡</span> Stress
                                        </button>
                                        <button
                                            className={`${intStyles.factorBtn} ${activeFactor === 'sleep' ? intStyles.factorBtnActive : ''}`}
                                            onClick={() => toggleFactor('sleep')}
                                        >
                                            <span>💤</span> Sleep
                                        </button>
                                        <button
                                            className={`${intStyles.factorBtn} ${activeFactor === 'diet' ? intStyles.factorBtnActive : ''}`}
                                            onClick={() => toggleFactor('diet')}
                                        >
                                            <span>🥑</span> Diet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visualization */}
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(180deg, var(--bg-cream) 0%, white 100%)',
                            borderRadius: '24px',
                            padding: '2rem',
                            border: '2px solid rgba(216, 27, 96, 0.1)',
                            minHeight: '500px'
                        }}>
                            {/* Insight Card */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                right: '20px',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(5px)',
                                padding: '1rem',
                                borderRadius: '16px',
                                borderLeft: '4px solid var(--pink-primary)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                zIndex: 10
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <span>{insight.icon}</span>
                                    <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1rem' }}>{insight.title}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#555', margin: 0, lineHeight: 1.4 }}>{insight.text}</p>
                            </div>

                            {/* Phase Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '100px' }}>
                                {phaseData.map((phase, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: activePhase === idx + 1 ? 'white' : 'rgba(255,255,255,0.7)',
                                            padding: '1.5rem',
                                            borderRadius: '16px',
                                            textAlign: 'center',
                                            border: `2px solid ${activePhase === idx + 1 ? phase.color : 'transparent'}`,
                                            boxShadow: activePhase === idx + 1 ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                                            transition: 'all 0.3s ease',
                                            transform: activePhase === idx + 1 ? 'scale(1.05)' : 'scale(1)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            const dayMap = [3, 10, 15, 22];
                                            updateSimulation(dayMap[idx]);
                                        }}
                                    >
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{phase.emoji}</div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.3rem' }}>{phase.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Days {phase.days}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Factor Impact */}
                            {activeFactor && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '20px',
                                    right: '20px',
                                    background: 'rgba(255,255,255,0.95)',
                                    backdropFilter: 'blur(5px)',
                                    borderRadius: '16px',
                                    padding: '1rem',
                                    boxShadow: '0 -5px 20px rgba(0,0,0,0.15)',
                                    borderLeft: `4px solid ${activeFactor === 'stress' ? '#ef5350' : activeFactor === 'diet' ? '#66bb6a' : '#5c6bc0'}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: '800', color: activeFactor === 'stress' ? '#c62828' : activeFactor === 'diet' ? '#2e7d32' : '#283593' }}>
                                        <span>{activeFactor === 'stress' ? '⚡' : activeFactor === 'diet' ? '🥑' : '💤'}</span>
                                        <span>{activeFactor === 'stress' ? 'High Stress Detected' : activeFactor === 'diet' ? 'Nutrition Boost Active' : 'Sleep Quality Impact'}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: 1.4 }}>
                                        {activeFactor === 'stress' && 'Cortisol suppresses the hypothalamus, potentially delaying LH surge and reducing progesterone.'}
                                        {activeFactor === 'diet' && 'Good nutrition supports healthy follicle development and optimal hormone production.'}
                                        {activeFactor === 'sleep' && 'Quality sleep helps regulate hormone cycles and improves overall fertility.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Fertility Tracking Methods */}
                <section style={{ marginBottom: '60px' }}>
                    <div className={intStyles.sectionHeader}>
                        <h2 className={intStyles.sectionTitle}>Fertility Tracking Methods</h2>
                        <p className={intStyles.sectionSubtitle}>Choose the approach that works best for you</p>
                    </div>

                    <div className={intStyles.methodsGrid}>
                        {trackingMethods.map((method, idx) => (
                            <div key={idx} className={intStyles.methodCard}>
                                <div className={intStyles.methodIcon}>{method.icon}</div>
                                <h3>{method.title}</h3>
                                <p>{method.description}</p>
                                <span className={intStyles.methodBadge}>{method.badge}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Optimization Tips */}
                <section style={{ marginBottom: '60px' }}>
                    <div className={intStyles.sectionHeader}>
                        <h2 className={intStyles.sectionTitle}>Optimizing Your Fertility</h2>
                        <p className={intStyles.sectionSubtitle}>Lifestyle factors that support conception</p>
                    </div>

                    <div className={intStyles.methodsGrid}>
                        {optimizationTips.map((tip, idx) => (
                            <div key={idx} className={intStyles.methodCard}>
                                <div className={intStyles.methodIcon}>{tip.icon}</div>
                                <h3>{tip.title}</h3>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                                    {tip.tips.map((item, i) => (
                                        <li key={i} style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* When to Seek Help */}
                <div className={intStyles.infoCallout}>
                    <h3>👩‍⚕️ When to Consult a Specialist</h3>
                    <ul>
                        {whenToConsult.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Remember: Every fertility journey is unique. There's no shame in seeking help early.
                    </p>
                </div>

                {/* CTA Section */}
                <div className={intStyles.ctaSection}>
                    <h3>Ready to Start Your Fertility Journey?</h3>
                    <p>Connect with fertility specialists who understand your goals and can provide personalized guidance.</p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Book a Consultation
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FertilityJourney;
