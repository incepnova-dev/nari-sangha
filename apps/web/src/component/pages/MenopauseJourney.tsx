import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";
import { useMenopauseLogic } from "../hooks/useMenopauseLogic";
import { WholeBodyScanner } from "../canvas/MenopauseCanvas";
import './legacy/menopause.css';

const MenopauseJourney: React.FC = () => {
    const navigate = useNavigate();
    const {
        stagingInput,
        updateStagingInput,
        showResult,
        revealSeason,
        seasonResult,
        scannerPhase,
        setScannerPhase,
        activeOrgan,
        setActiveOrgan,
        activeJourneyStage,
        setActiveJourneyStage
    } = useMenopauseLogic();

    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const toggleFlip = (index: number) => {
        setFlippedCards(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const journeyStages: any = {
        lateRepro: {
            kicker: "Stage -3a / -3b",
            title: "Late Reproductive",
            oneLiner: "Cycles are mostly regular, but your hormones may start to feel less predictable.",
            badges: ["Cycles mostly regular", "Subtle changes"],
            steps: [
                { q: "What you might notice", a: "Sleep feels lighter, PMS shifts, anxiety may rise, or periods change slightly." },
                { q: "What's happening (simple)", a: "Your ovulation hormones begin to wobble—small swings can feel big in the brain." },
                { q: "What to bring to a visit", a: "Cycle calendar, sleep notes, new mood symptoms, and any heavy bleeding changes." }
            ]
        },
        peri: {
            kicker: "Stage -2 / -1",
            title: "Perimenopause",
            oneLiner: "This is the 'hormone rollercoaster' phase—symptoms often peak here.",
            badges: ["Cycle skipping", "Hot flashes", "Mood/sleep changes"],
            steps: [
                { q: "What you might notice", a: "Hot flashes, night sweats, brain fog, heavier or irregular bleeding, more anxiety." },
                { q: "What's happening (simple)", a: "Estrogen rises and falls unpredictably; progesterone often drops earlier." },
                { q: "What to ask your clinician", a: "Symptom relief options, sleep plan, mood support, and bleeding red flags." }
            ]
        },
        post: {
            kicker: "Stage +1 / +2",
            title: "Postmenopause",
            oneLiner: "The 'new baseline' begins—health prevention matters most now.",
            badges: ["12+ months no period", "Bone + heart focus"],
            steps: [
                { q: "What you might notice", a: "Vaginal dryness, sleep issues, or libido changes can persist as tissues adapt." },
                { q: "What's happening (simple)", a: "Estrogen stays low; bones and heart require active protection." },
                { q: "Smart check-ins", a: "Blood pressure, bone density, strength training, and GSM treatment if needed." }
            ]
        }
    };

    const journeySymptoms = [
        { tag: "Heat Waves", front: "Sudden Hot Flashes", back: "Your brain's thermostat is resetting.", ask: "Check BP & Cholesterol" },
        { tag: "Joints", front: "Aches & Stiffness", back: "Estrogen supports joints & bones.", ask: "Strength plan & DEXA" },
        { tag: "GSM", front: "Vaginal Dryness", back: "Tissues thin without estrogen.", ask: "Local treatment is key" },
        { tag: "Brain", front: "Wired but Tired", back: "Hormones affect focus & sleep.", ask: "Mood support is available" }
    ];

    const currentStageData = journeyStages[activeJourneyStage];

    return (
        <div className="menopause-page">
            <InnerPageHero
                title="Menopause Journey"
                subtitle="Navigate the change with confidence. An interactive guide to understanding your body's transition."
                badge="Premium Care Guide"
            >
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button className="btn-primary" onClick={() => navigate(ROUTES.TELECONSULTATION)}>Consult Specialist</button>
                    <button className="btn-secondary" onClick={() => navigate(ROUTES.JOURNEYS)}>← Back to Paths</button>
                </div>
            </InnerPageHero>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>

                {/* Journey Staging Section */}
                <section className="journey-section">
                    <div className="section-header" style={{ textAlign: 'center' }}>
                        <h2>Guided Journey Paths</h2>
                        <p>Identify your stage and follow the clinical recommendations.</p>
                    </div>

                    <div className="journey-track">
                        {Object.keys(journeyStages).map(key => (
                            <button
                                key={key}
                                className={`track-dot ${activeJourneyStage === key ? 'active' : ''}`}
                                onClick={() => setActiveJourneyStage(key)}
                            >
                                {journeyStages[key].title}
                            </button>
                        ))}
                    </div>

                    <div className="journey-stage-card">
                        <div className="stage-kicker">{currentStageData.kicker}</div>
                        <h3 className="stage-title">{currentStageData.title}</h3>
                        <p className="stage-one-liner">{currentStageData.oneLiner}</p>

                        <div style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0' }}>
                            {currentStageData.badges.map((b: string) => (
                                <span key={b} className="stage-badge">{b}</span>
                            ))}
                        </div>

                        <div className="stage-steps">
                            {currentStageData.steps.map((s: any, i: number) => (
                                <details key={i} className="step" style={{ marginBottom: i === 0 ? '0' : '1rem' }} open={i === 0}>
                                    <summary style={{ padding: '1rem', fontWeight: 700, cursor: 'pointer' }}>{s.q}</summary>
                                    <div style={{ padding: '0 1rem 1rem', color: '#666' }}>{s.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Symptom Flip Cards */}
                <section style={{ marginTop: '6rem' }}>
                    <div className="section-header">
                        <h3>Navigating Common Symptoms</h3>
                        <p>Click each card to understand the biological 'why' behind the symptom.</p>
                    </div>
                    <div className="symptom-flip-grid">
                        {journeySymptoms.map((s, i) => (
                            <div key={i} className={`flip ${flippedCards.includes(i) ? 'is-flipped' : ''}`} onClick={() => toggleFlip(i)}>
                                <div className="flip-inner">
                                    <div className="flip-face flip-front">
                                        <div className="card-kicker" style={{ fontSize: '0.75rem', color: 'var(--pink)' }}>{s.tag}</div>
                                        <strong>{s.front}</strong>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--deep-pink)', marginTop: 'auto' }}>Tap to decode →</div>
                                    </div>
                                    <div className="flip-face flip-back">
                                        <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{s.back}</div>
                                        <div style={{ background: '#fff3e0', padding: '8px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>💡 {s.ask}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#999', marginTop: 'auto' }}>Tap to flip back</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Whole Body Scanner */}
                <section className="scanner-section" style={{ marginTop: '8rem' }}>
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2>The Whole-Body Scanner</h2>
                        <p>See how estrogen changes impact every system over time.</p>
                    </div>
                    <div className="scanner-dashboard">
                        <div className="timeline-bar" style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem', background: '#f8f9fa', gap: '1rem' }}>
                            <button className={`track-dot ${scannerPhase === 'repro' ? 'active' : ''}`} onClick={() => setScannerPhase('repro')}>Reproductive</button>
                            <button className={`track-dot ${scannerPhase === 'peri' ? 'active' : ''}`} onClick={() => setScannerPhase('peri')}>Perimenopause</button>
                            <button className={`track-dot ${scannerPhase === 'post' ? 'active' : ''}`} onClick={() => setScannerPhase('post')}>Postmenopause</button>
                        </div>
                        <div className="scanner-body">
                            <WholeBodyScanner phase={scannerPhase} activeOrgan={activeOrgan} onOrganClick={setActiveOrgan} />
                            <div className="organ-info">
                                {activeOrgan === 'none' ? (
                                    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                                        <i className="fa-solid fa-person-rays" style={{ fontSize: '4rem', color: 'var(--pink)', marginBottom: '1.5rem' }}></i>
                                        <h3>Select a System</h3>
                                        <p>Tap on the brain, heart, bones, or pelvic area to see the biological shift.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <span style={{ color: 'var(--pink)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem' }}>Target System: {activeOrgan}</span>
                                        <h3 style={{ margin: '1rem 0' }}>{activeOrgan.charAt(0).toUpperCase() + activeOrgan.slice(1)} Health</h3>
                                        <p style={{ lineHeight: 1.7 }}>
                                            {activeOrgan === 'brain' && (scannerPhase === 'peri' ? "Extreme fluctuations can cause 'the thermostat' to reset, leading to hot flashes and brain fog." : "Estrogen supports neurotransmission and cognitive focus.")}
                                            {activeOrgan === 'heart' && (scannerPhase === 'post' ? "Loss of estrogen protector can lead to increased arterial stiffness and cholesterol shifts." : "Estrogen keeps blood vessels elastic and supports healthy lipid profiles.")}
                                            {activeOrgan === 'bones' && (scannerPhase === 'post' ? "Bone resorption speeds up. Strength training and Vitamin D are critical now." : "Estrogen maintains a healthy balance between bone creation and loss.")}
                                            {activeOrgan === 'vagina' && (scannerPhase === 'post' ? "Tissues may thin and lose moisture. Local treatment is highly effective." : "Estrogen maintains healthy lubrication and pelvic floor tissue integrity.")}
                                        </p>
                                        <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate(ROUTES.APPOINTMENTS)}>Discuss with a Specialist</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seasonal Checker */}
                <section className="seasonal-checker-section" style={{ marginTop: '8rem' }}>
                    <div className="section-header" style={{ textAlign: 'center' }}>
                        <h2>Season Identity Checker</h2>
                        <p>Discover which metabolic 'season' you are traversing based on the STRAW+10 protocol.</p>
                    </div>
                    <div className="seasonal-checker">
                        <div className="checker-form">
                            <h4>1. Select Age Range</h4>
                            <div className="option-grid">
                                {['35-40', '41-45', '46-50', '51-55', '56+'].map(a => (
                                    <button
                                        key={a}
                                        className={`option-btn ${stagingInput.ageRange === a ? 'selected' : ''}`}
                                        onClick={() => updateStagingInput('ageRange', a)}
                                    >
                                        {a} Years
                                    </button>
                                ))}
                            </div>

                            <h4>2. Period Pattern</h4>
                            <div className="option-grid">
                                {[
                                    { id: 'regular', label: 'Regular (Every 24-35 days)' },
                                    { id: 'irregular', label: 'Irregular (differs by 7+ days)' },
                                    { id: 'skipped_brief', label: 'Skipped a few (but < 60 days)' },
                                    { id: 'skipped_long', label: 'Skipped 60+ days consecutively' },
                                    { id: 'none_12', label: 'No periods in last 12 months' }
                                ].map(p => (
                                    <button
                                        key={p.id}
                                        className={`option-btn ${stagingInput.periodPattern === p.id ? 'selected' : ''}`}
                                        onClick={() => updateStagingInput('periodPattern', p.id)}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>

                            <h4>3. Main Concern</h4>
                            <select
                                className="option-btn"
                                style={{ width: '100%' }}
                                value={stagingInput.mainSymptom}
                                onChange={(e) => updateStagingInput('mainSymptom', e.target.value)}
                            >
                                <option value="">Select Priority concern...</option>
                                <option value="hotflash">Hot Flashes / Night Sweats</option>
                                <option value="sleep">Sleep / Mood Shifts</option>
                                <option value="bleeding">Heavy / Flood Bleeding</option>
                                <option value="dryness">Dryness / Discomfort</option>
                            </select>

                            <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={revealSeason}>Reveal My Season</button>
                        </div>

                        <div className={`result-card ${showResult ? '' : 'placeholder'}`}>
                            {showResult ? (
                                <div>
                                    <span className="weather-emoji">{seasonResult.weather}</span>
                                    <span style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Current Season</span>
                                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{seasonResult.season}</h2>
                                    <h4 style={{ color: '#ffca28' }}>{seasonResult.title}</h4>
                                    <p style={{ marginTop: '1.5rem', borderLeft: '3px solid #ffca28', paddingLeft: '1rem' }}>{seasonResult.description}</p>

                                    <div style={{ marginTop: '2rem' }}>
                                        <p style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem' }}>SEASONAL FORECAST:</p>
                                        {seasonResult.forecast.map(f => (
                                            <div key={f} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                <i className="fa-solid fa-check-circle" style={{ color: '#4caf50' }}></i>
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                                    <i className="fa-solid fa-sun-cloud" style={{ fontSize: '4rem', marginBottom: '2rem' }}></i>
                                    <h3>Your Personal Climate Awaits</h3>
                                    <p>Complete the form to discover which season you're in and how to thrive.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MenopauseJourney;
