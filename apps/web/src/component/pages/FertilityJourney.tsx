import React from "react";
import styles from "./FertilityJourney.module.css";
import "./legacy/fertility.css";
import InnerPageHero from "../shared/InnerPageHero";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";
import { useFertilityLogic } from "../hooks/useFertilityLogic";

const FertilityJourney: React.FC = () => {
    const navigate = useNavigate();
    const {
        selectedDay,
        setSelectedDay,
        stressLevel,
        setStressLevel,
        temp,
        setTemp,
        mucus,
        setMucus,
        currentPhase,
        architectureStatus,
        PHASES
    } = useFertilityLogic();

    const nutrients = [
        { name: "Folic Acid", icon: "🍃", color: "#ff6b9d", daily: "400-800 mcg", benefit: "Prevents neural tube defects. START 3 months before trying! Helps egg quality.", foods: ["Spinach", "Broccoli", "Oranges", "Beans"] },
        { name: "Iron", icon: "💪", color: "#4caf50", daily: "18-27 mg", benefit: "Builds blood volume, prevents anemia. Low iron linked to ovulation problems.", foods: ["Red Meat", "Kale", "Lentils", "Dark Chocolate"] },
        { name: "Omega-3", icon: "🐟", color: "#ff9800", daily: "200-300 mg", benefit: "Improves egg quality, regulates hormones. Critical for brain development.", foods: ["Salmon", "Sardines", "Omega Eggs", "Chia Seeds"] },
        { name: "Vitamin D", icon: "☀️", color: "#9c27b0", daily: "600-1000 IU", benefit: "Regulates cycles, improves egg quality. Deficiency linked to PCOS.", foods: ["Sunlight", "Egg Yolks", "Fortified Milk", "Mushrooms"] }
    ];

    const timelineItems = [
        { month: "Month 1", title: "Schedule Check-Up", icon: "🩺", color: "#f44336", desc: "Book pre-conception visit. Update vaccinations. Get blood tests for STIs and immunity." },
        { month: "Month 1-3", title: "Start Supplements", icon: "💊", color: "#ff9800", desc: "Begin prenatal vitamins with folic acid. Add Omega-3 and CoQ10 if over 35." },
        { month: "Month 2", title: "Optimize Weight", icon: "⚖️", color: "#9c27b0", desc: "Aim for healthy BMI. Even 5-10% loss if overweight significantly improves ovulation." },
        { month: "Month 2", title: "Eliminate Toxins", icon: "🚫", color: "#2196f3", desc: "Stop smoking and alcohol. Reduce caffeine to < 200mg. Switch to BPA-free containers." },
        { month: "Month 3", title: "Track Ovulation", icon: "📊", color: "#4caf50", desc: "Use predictor kits or basal thermometer. Identify your 5-6 day fertile window." },
        { month: "Month 3+", title: "Start Trying!", icon: "🎯", color: "#00bcd4", desc: "Have regular intercourse during fertile window. Stay relaxed and enjoy the process." }
    ];

    const lossTypes = [
        { name: "Early Miscarriage", stat: "Before 12 weeks", icon: "🩸", color: "#f44336", desc: "Most common loss type. Usually caused by chromosomal abnormalities. Body's natural selection process.", signs: ["Heavy bleeding with clots", "Severe cramping", "Loss of symptoms"] },
        { name: "Chemical Pregnancy", stat: "Before 5 weeks", icon: "🫥", color: "#ff9800", desc: "Pregnancy ends shortly after implantation. Often mistaken for a late period.", signs: ["Faint positive test", "Heavy late period", "HCG drop"] },
        { name: "Molar Pregnancy", stat: "Rare (1 in 1,000)", icon: "⚠️", color: "#9c27b0", desc: "Abnormal tissue grows instead of baby. Requires medical monitoring.", signs: ["Severe nausea", "High HCG", "No heartbeat"] },
        { name: "Ectopic Pregnancy", stat: "Emergency (1-2%)", icon: "🏥", color: "#00bcd4", desc: "Embryo implants outside uterus. Life-threatening if left untreated.", signs: ["One-sided stabbing pain", "Shoulder pain", "Dizziness"] }
    ];

    return (
        <div className="fertilityHighFidelity">
            <InnerPageHero
                title="Your Fertility Journey"
                subtitle="A high-fidelity guide to pre-conception wellness, cycle mastery, and biological preparedness."
                badge="Premium Protocol"
            >
                <button
                    onClick={() => navigate(ROUTES.JOURNEYS)}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        color: 'white',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        backdropFilter: 'blur(5px)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    ← Back to Paths
                </button>
                <div className="heroStatsGrid">
                    <div className="statBox">
                        <div className="statIcon">🎯</div>
                        <div className="statValue">85%</div>
                        <div className="statLabel">Conceive in 1 Year</div>
                    </div>
                    <div className="statBox">
                        <div className="statIcon">📅</div>
                        <div className="statValue">5-6</div>
                        <div className="statLabel">Fertile Days/Month</div>
                    </div>
                    <div className="statBox">
                        <div className="statIcon">⏱️</div>
                        <div className="statValue">3-6</div>
                        <div className="statLabel">Average Months</div>
                    </div>
                </div>
            </InnerPageHero>

            {/* Cycle Mastery */}
            <section className="hfSection">
                <h2 className="hfSectionTitle">Understanding Your Cycle</h2>
                <p className="hfSectionSubtitle">Know your fertile window—the optimal time for conception is 2 days before ovulation.</p>

                <div className={styles.visualizerContainer}>
                    <div className={styles.visualizerLeft}>
                        <div className={styles.cycleCenter}>
                            <div className={styles.dayDisplay}>Day {selectedDay}</div>
                            <div className={styles.phaseName} style={{ color: currentPhase.color }}>{currentPhase.emoji} {currentPhase.name}</div>
                        </div>
                        {/* Interactive Phase Indicator */}
                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {PHASES.map(p => (
                                <button
                                    key={p.name}
                                    onClick={() => setSelectedDay(p.start)}
                                    style={{
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        border: 'none',
                                        background: currentPhase.name === p.name ? p.color : '#eee',
                                        color: currentPhase.name === p.name ? 'white' : '#666',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.visualizerRight}>
                        <h3 className={styles.phaseName} style={{ color: currentPhase.color }}>{currentPhase.name} Phase</h3>
                        <p className={styles.phaseDesc}>{currentPhase.desc}</p>
                        <input
                            type="range"
                            min="1"
                            max="28"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                            className={styles.slider}
                        />
                        <div style={{ background: 'rgba(255,193,7,0.1)', padding: '1.5rem', borderRadius: '15px', marginTop: '1.5rem', borderLeft: '4px solid #ffc107' }}>
                            <div style={{ fontWeight: 800, color: '#f57c00', marginBottom: '0.5rem' }}>💡 Pro Tip</div>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Sperm can live up to 5 days, but eggs only last 12-24 hours. Start trying 2 days BEFORE your expected ovulation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nutrition */}
            <section className="hfSection">
                <h2 className="hfSectionTitle">Essential Pre-Conception Nutrients</h2>
                <p className="hfSectionSubtitle">Prepare your body for healthy conception and a resilient pregnancy with these vital nutrients.</p>
                <div className="nutrientGrid">
                    {nutrients.map(n => (
                        <div key={n.name} className="nutrientCard" style={{ '--nutrient-color': n.color } as any}>
                            <div className="nutrientHeader">
                                <div className="nutrientIcon">{n.icon}</div>
                                <div className="nutrientName">{n.name}</div>
                            </div>
                            <p className="nutrientBenefit">{n.benefit}</p>
                            <div className="dailyNeedBox" style={{ background: `${n.color}15`, color: n.color }}>Daily Need: {n.daily}</div>
                            <div className="foodList">
                                {n.foods.map(f => <span key={f} className="foodItem">{f}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Habits Simulator */}
            <section className="hfSectionSimulator" style={{ background: '#fff', padding: '80px 0' }}>
                <div className="hfSection">
                    <h2 className="hfSectionTitle">Conception Simulator</h2>
                    <p className="hfSectionSubtitle">Adjust your biological and lifestyle markers to see your pre-conception preparedness.</p>
                    <div className={styles.simGrid}>
                        <div className={styles.controls}>
                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}><span>Stress Level</span><span>{stressLevel}%</span></div>
                                <input type="range" min="0" max="100" value={stressLevel} onChange={(e) => setStressLevel(parseInt(e.target.value))} className={styles.slider} />
                            </div>
                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}><span>Cervical Mucus</span><span>{mucus}%</span></div>
                                <input type="range" min="0" max="100" value={mucus} onChange={(e) => setMucus(parseInt(e.target.value))} className={styles.slider} />
                            </div>
                            <div className={styles.controlGroup}>
                                <div className={styles.sliderHeader}><span>Basal Temp</span><span>{temp}°C</span></div>
                                <input type="range" min="35" max="38" step="0.1" value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} className={styles.slider} />
                            </div>
                        </div>
                        <div className={styles.visualization}>
                            <div className={styles.feedbackCard} style={{ borderTop: `5px solid ${architectureStatus.isIdeal ? '#2e7d32' : '#f57c00'}` }}>
                                <h3>Biological Architecture</h3>
                                <p style={{ color: architectureStatus.stressWarning ? '#d32f2f' : '#2e7d32', fontWeight: 700 }}>
                                    {architectureStatus.stressWarning ? "⚠️ High Stress: Hormone balance impacted." : "✅ Balanced State: Optimal for signaling."}
                                </p>
                                <p style={{ color: architectureStatus.mucusReady ? '#2e7d32' : '#666', fontWeight: 700, marginTop: '10px' }}>
                                    {architectureStatus.mucusReady ? "🌟 Fertile Mucus: Sperm-friendly environment." : "○ Baseline Mucus: Keep tracking."}
                                </p>
                                <div style={{ marginTop: '20px', padding: '15px', background: '#fdf2f7', borderRadius: '12px', fontSize: '0.9rem' }}>
                                    <strong>AI Insights:</strong> {architectureStatus.insight}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dos & Donts */}
            <section className="hfSection">
                <div className="habitsGrid">
                    <div className="habitsCard doCard">
                        <h3 className="habitTitle"><span>✅</span> DEFINITELY DO</h3>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#4caf50' }}>💧</div>
                            <div className="habitInfo">
                                <h4>Stay Hydrated</h4>
                                <p>8-10 glasses daily. Improves cervical mucus quality for sperm transport.</p>
                            </div>
                        </div>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#4caf50' }}>🧘</div>
                            <div className="habitInfo">
                                <h4>Manage Stress</h4>
                                <p>Yoga and meditation. High cortisol can block ovulation hormones.</p>
                            </div>
                        </div>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#4caf50' }}>💊</div>
                            <div className="habitInfo">
                                <h4>Prenatal Vitamins</h4>
                                <p>Start 3 months before trying. Vital for preventing neural tube defects.</p>
                            </div>
                        </div>
                    </div>
                    <div className="habitsCard dontCard">
                        <h3 className="habitTitle"><span>❌</span> ABSOLUTELY AVOID</h3>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#f44336' }}>🚬</div>
                            <div className="habitInfo">
                                <h4>No Smoking</h4>
                                <p>Damages eggs permanently. Increases miscarriage risk by over 50%.</p>
                            </div>
                        </div>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#f44336' }}>🍷</div>
                            <div className="habitInfo">
                                <h4>Limit Alcohol</h4>
                                <p>Even moderate drinking reduces conception probability by 18%.</p>
                            </div>
                        </div>
                        <div className="habitItem">
                            <div className="habitIcon" style={{ background: '#f44336' }}>☕</div>
                            <div className="habitInfo">
                                <h4>Reduce Caffeine</h4>
                                <p>Max 200mg/day. High intake is clinically linked to delayed conception.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loss Education */}
            <section className="hfSection">
                <h2 className="hfSectionTitle">Understanding Pregnancy Loss Types</h2>
                <p className="hfSectionSubtitle">Evidence-based education to help you identify warning signs and seek timely support.</p>
                <div className="lossGrid">
                    {lossTypes.map(l => (
                        <div key={l.name} className="lossCard" style={{ '--loss-color': l.color } as any}>
                            <div className="lossHeader">
                                <div className="lossIcon">{l.icon}</div>
                                <div>
                                    <h4>{l.name}</h4>
                                    <span className="stat">{l.stat}</span>
                                </div>
                            </div>
                            <p>{l.desc}</p>
                            <div className="warningBox">
                                <h5>Warning Signs:</h5>
                                <ul>{l.signs.map(s => <li key={s}>• {s}</li>)}</ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="hfSection">
                <h2 className="hfSectionTitle">3-Month Pre-Conception Timeline</h2>
                <p className="hfSectionSubtitle">A step-by-step roadmap to prepare your biological architecture for a healthy pregnancy.</p>
                <div className="hfTimeline">
                    {timelineItems.map((item, idx) => (
                        <div key={idx} className="timelineItem">
                            <div className="timelineLeft">
                                {idx % 2 === 0 && (
                                    <div className="timelineCard" style={{ '--m-color': item.color } as any}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                )}
                            </div>
                            <div className="timelineMarker" style={{ '--m-color': item.color } as any}>
                                <div className="markerIcon">{item.icon}</div>
                                <div className="markerLabel">{item.month}</div>
                            </div>
                            <div className="timelineRight">
                                {idx % 2 !== 0 && (
                                    <div className="timelineCard" style={{ '--m-color': item.color } as any}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Doctor Section */}
            <section className="hfSection">
                <div className="doctor-section">
                    <h2 className="hfSectionTitle" style={{ color: 'inherit', textAlign: 'left', margin: 0 }}>🏥 When to See a Doctor</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Don't wait too long—early intervention improves success rates significantly.</p>

                    <div className="triggerGrid">
                        {[
                            { icon: "⏰", text: "After 12 months of trying (under age 35) without conception", color: "#f44336" },
                            { icon: "🎂", text: "After 6 months of trying if you're 35-40 years old", color: "#ff9800" },
                            { icon: "📅", text: "Immediately if you're over 40 and want to conceive", color: "#9c27b0" },
                            { icon: "🩸", text: "Irregular periods or cycles outside 21-35 days", color: "#e91e63" },
                            { icon: "🚫", text: "Absent periods for 3+ months (not pregnant)", color: "#2196f3" },
                            { icon: "💔", text: "2+ miscarriages—testing can identify causes", color: "#4caf50" },
                            { icon: "⚠️", text: "Painful periods with heavy bleeding (Endometriosis)", color: "#00bcd4" },
                            { icon: "🩺", text: "Known conditions like PCOS, thyroid, or diabetes", color: "#ff5722" }
                        ].map((t, i) => (
                            <div key={i} className="triggerCard" style={{ '--t-color': t.color } as any}>
                                <div className="triggerIcon">{t.icon}</div>
                                <p>{t.text}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: 'white', borderRadius: '25px', padding: '2rem', marginTop: '2.5rem', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '1.5rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', flexShrink: 0 }}>💡</div>
                            <div>
                                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>What to Expect at Fertility Doctor Visit</h4>
                                <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.7 }}>
                                    <strong>Blood tests:</strong> Hormone levels (FSH, LH, AMH, thyroid, prolactin)<br />
                                    <strong>Ultrasound:</strong> Check ovaries, uterus, antral follicle count<br />
                                    <strong>Semen analysis:</strong> Partner's sperm count, motility, morphology<br />
                                    <strong>HSG test:</strong> X-ray to check if fallopian tubes are open
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2 className="cta-title">Ready to Start Your Journey?</h2>
                <p className="cta-text">Trust your body, stay consistent with healthy habits, and be patient. We're here with you every step of the way.</p>
                <button className="cta-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to Top</button>
            </section>
        </div>
    );
};

export default FertilityJourney;
