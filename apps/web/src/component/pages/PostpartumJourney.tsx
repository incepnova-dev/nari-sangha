import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";
import { HealingParticleBackground } from "../canvas/PostpartumCanvas";
import { usePhase2 } from "../phase2/components/Phase2Provider";

const PostpartumJourney: React.FC = () => {
    const navigate = useNavigate();
    const { stage, updateStage } = usePhase2();
    const [scrollProgress, setScrollProgress] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    // Interactive State (Postpartum-Specific)
    const [selfCareChecks, setSelfCareChecks] = useState<Record<number, boolean>>(() => {
        const saved = localStorage.getItem('ns_postpartum_checks');
        return saved ? JSON.parse(saved) : {};
    });
    const [moodReflection, setMoodReflection] = useState<Record<number, boolean>>({});

    useEffect(() => {
        localStorage.setItem('ns_postpartum_checks', JSON.stringify(selfCareChecks));
    }, [selfCareChecks]);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;
            const elementTop = rect.top;

            const start = windowHeight * 0.8;
            const progress = Math.min(1, Math.max(0, (start - elementTop) / (elementHeight + start - windowHeight * 0.2)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSelfCare = (idx: number) => {
        setSelfCareChecks(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const toggleReflection = (idx: number) => {
        setMoodReflection(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const isCurrentStage = (idx: number) => {
        if (stage.type !== 'postpartum') return false;
        if (idx === 0 && stage.week <= 1) return true;
        if (idx === 1 && stage.week > 1 && stage.week <= 6) return true;
        if (idx === 2 && stage.week > 6 && stage.week <= 12) return true;
        if (idx === 3 && stage.week > 12 && stage.week <= 24) return true;
        if (idx === 4 && stage.week > 24) return true;
        return false;
    };

    const getCTAText = () => {
        if (stage.type === 'postpartum' && stage.week <= 6) return "Get Critical Recovery Support";
        if (Object.values(moodReflection).some(v => v)) return "Connect with Mental Wellness Specialist";
        return "Schedule a Postpartum Consultation";
    };

    // Animation Keyframes & Styles
    const animationStyles = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes slideInRight {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .fade-in { animation: fadeIn 1s ease forwards; }
        .pulse-soft { animation: gentlePulse 4s infinite ease-in-out; }
        
        .timeline-progress-line {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
        }
        .timeline-progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: var(--pink);
            transition: height 0.1s ease-out;
        }

        .emotional-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            border: 2px solid transparent;
        }
        .emotional-card.active {
            border-color: var(--pink);
            background: #fff9fb !important;
        }
        .emotional-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important;
        }

        .checklist-item {
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid #f0f0f0;
        }
        .checklist-item:hover {
            background: #fffafa !important;
            border-color: #ffe4e6;
        }
        .checklist-item.checked {
            background: #fdf2f8 !important;
            opacity: 0.7;
        }

        .stage-badge {
            display: inline-block;
            background: var(--pink);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 800;
            margin-bottom: 12px;
            box-shadow: 0 4px 10px rgba(236, 64, 122, 0.2);
        }

        .floating-status {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: white;
            padding: 15px 25px;
            border-radius: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid #f0f0f0;
            animation: slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
                transition: none !important;
            }
        }
    `;

    const recoveryTimeline = [
        {
            period: "First Week",
            whatToExpect: "Bleeding, cramping, fatigue, emotional fluctuations",
            focus: "Rest, hydration, pain management, establishing feeding",
            color: "#FCE4EC"
        },
        {
            period: "Weeks 2-6",
            whatToExpect: "Gradual healing, sleep deprivation, adjustment to new routine",
            focus: "Gentle movement, nutrition, asking for help",
            color: "#F3E5F5"
        },
        {
            period: "6 Weeks - 3 Months",
            whatToExpect: "Checkup milestone, hormonal shifts, learning baby's cues",
            focus: "Returning to activity, mental health check-in",
            color: "#E8F5E9"
        },
        {
            period: "3-6 Months",
            whatToExpect: "Settling into rhythm, sleep may improve (or not!)",
            focus: "Self-care routines, relationship with partner",
            color: "#E3F2FD"
        },
        {
            period: "6-12 Months",
            whatToExpect: "Finding your 'new normal', increased independence",
            focus: "Personal growth, future family planning",
            color: "#FFF8E1"
        }
    ];

    const emotionalHealth = [
        {
            condition: "Baby Blues",
            prevalence: "60-80% of new mothers",
            symptoms: "Mood swings, crying, anxiety (lasts ~2 weeks)",
            support: "Normal and temporary, rest and support help"
        },
        {
            condition: "Postpartum Depression",
            prevalence: "1 in 7 mothers",
            symptoms: "Persistent sadness, hopelessness, difficulty bonding",
            support: "Treatable with therapy and/or medication"
        },
        {
            condition: "Postpartum Anxiety",
            prevalence: "1 in 10 mothers",
            symptoms: "Excessive worry, panic attacks, intrusive thoughts",
            support: "Professional help, coping strategies"
        }
    ];

    const selfCareIdeas = [
        "Accept help from family and friends",
        "Nap when baby naps (really!)",
        "Eat nutritious meals and stay hydrated",
        "Get outside for fresh air and light movement",
        "Connect with other new moms",
        "Lower your expectations and give yourself grace",
        "Ask your partner to take night shifts",
        "Prioritize sleep over housework"
    ];

    const redFlags = [
        "Heavy bleeding (soaking a pad in under an hour)",
        "Fever over 100.4°F",
        "Severe abdominal pain or foul-smelling discharge",
        "Painful, red, or hot areas on breast",
        "Thoughts of harming yourself or your baby",
        "Inability to care for yourself or baby"
    ];

    return (
        <div className="app-container">
            <style>{animationStyles}</style>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <HealingParticleBackground />
                <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                    <InnerPageHero
                        title="Postpartum Care"
                        subtitle="Navigate the 'fourth trimester' with guidance on physical recovery, emotional wellbeing, and caring for your new baby."
                        badge="Postpartum Support"
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
                    </InnerPageHero>
                </div>
            </div>

            {/* Back Button Removed - Moved to Hero */}

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Floating Status Widget */}
                {stage.type === 'postpartum' && (
                    <div className="floating-status">
                        <span style={{ fontSize: '20px' }}>🤱</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '12px', color: '#999', fontWeight: 'bold' }}>CURRENT STAGE</span>
                            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--pink)' }}>Week {stage.week} Recovery</span>
                        </div>
                        <div style={{ width: '1px', height: '30px', background: '#eee', margin: '0 5px' }}></div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                            title="Reset Stage"
                        >
                            ⚙️
                        </button>
                    </div>
                )}

                {/* Who This Is For */}
                <div style={{ marginBottom: '80px', display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px' }}>
                            Who This Journey Is For
                        </h2>
                        <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#555' }}>
                            This journey supports new mothers in the first year after giving birth. The postpartum period (often called the
                            "fourth trimester") is a time of profound physical, emotional, and lifestyle changes. You're not just recovering
                            from birth—you're becoming a mother, and that takes time, patience, and support.
                        </p>
                    </div>

                    <div style={{
                        flex: '1 1 300px',
                        padding: '30px',
                        background: '#fdf2f8',
                        borderRadius: '24px',
                        border: '1px solid #ffe4e6'
                    }}>
                        <h4 style={{ margin: '0 0 15px', color: '#ec407a', fontWeight: '900' }}>Personalize Your View</h4>
                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Identify your current stage to highlight relevant recovery milestones.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select
                                value={stage.type === 'postpartum' ? stage.week : 1}
                                onChange={(e) => updateStage({ type: 'postpartum', week: parseInt(e.target.value) })}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            >
                                {[...Array(52)].map((_, i) => (
                                    <option key={i} value={i + 1}>Week {i + 1}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => updateStage({ type: 'none', week: 1 })}
                                style={{
                                    padding: '12px',
                                    background: 'white',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recovery Timeline */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '40px' }}>
                    Postpartum Recovery Timeline
                </h2>
                <div ref={timelineRef} style={{ position: 'relative', paddingLeft: '60px', marginBottom: '80px' }}>
                    <div className="timeline-progress-line">
                        <div className="timeline-progress-fill" style={{ height: `${scrollProgress * 100}%` }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {recoveryTimeline.map((phase, idx) => {
                            const active = isCurrentStage(idx);
                            return (
                                <div
                                    key={idx}
                                    onClick={() => updateStage({ type: 'postpartum', week: idx === 0 ? 1 : idx === 1 ? 4 : idx === 2 ? 10 : idx === 3 ? 20 : 40 })}
                                    className={`fade-in ${active ? 'phase2-highlight' : ''}`}
                                    style={{
                                        background: phase.color,
                                        padding: '32px',
                                        borderRadius: '24px',
                                        border: active ? '2px solid var(--pink)' : '1px solid rgba(0,0,0,0.05)',
                                        boxShadow: active ? '0 10px 30px rgba(236, 64, 122, 0.15)' : '0 4px 15px rgba(0,0,0,0.02)',
                                        animationDelay: `${idx * 0.2}s`,
                                        position: 'relative',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {active && <div className="phase2-badge">YOU ARE HERE</div>}
                                    <div style={{
                                        position: 'absolute',
                                        left: '-52px',
                                        top: '32px',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: scrollProgress > (idx / recoveryTimeline.length) ? 'var(--pink)' : 'white',
                                        border: '4px solid #eee',
                                        zIndex: 2,
                                        transition: 'background 0.3s ease'
                                    }}></div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#2A2A2A' }}>{phase.period}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                        <div>
                                            <strong style={{ fontSize: '12px', color: '#777', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                                                What to Expect
                                            </strong>
                                            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5' }}>{phase.whatToExpect}</p>
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '12px', color: '#777', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                                                Focus On
                                            </strong>
                                            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.5' }}>{phase.focus}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Emotional Health */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Postpartum Emotional Health
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '80px' }}>
                    {emotionalHealth.map((item, idx) => (
                        <div
                            key={idx}
                            className={`${styles.productCard} emotional-card fade-in ${moodReflection[idx] ? 'active' : ''}`}
                            style={{
                                animationDelay: `${0.4 + idx * 0.1}s`,
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                padding: '32px',
                                background: 'white',
                                borderRadius: '24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '24px', opacity: 0.2 }} className="pulse-soft">
                                {idx === 0 ? '🌸' : idx === 1 ? '☁️' : '🧠'}
                            </div>
                            <h4 style={{ fontSize: '18px', color: 'var(--pink)', marginBottom: '8px', fontWeight: '800' }}>{item.condition}</h4>
                            <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', fontWeight: '700', opacity: 0.8 }}>
                                Affects: {item.prevalence}
                            </p>
                            <div style={{ marginBottom: '12px' }}>
                                <strong style={{ fontSize: '13px', color: '#444' }}>Symptoms:</strong>
                                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{item.symptoms}</p>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <strong style={{ fontSize: '13px', color: '#444' }}>Support:</strong>
                                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{item.support}</p>
                            </div>

                            <div style={{
                                marginTop: 'auto',
                                borderTop: '1px solid #f0f0f0',
                                paddingTop: '15px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666', cursor: 'pointer', paddingTop: '15px' }}>
                                    <input
                                        type="checkbox"
                                        checked={!!moodReflection[idx]}
                                        onChange={() => toggleReflection(idx)}
                                        style={{ accentColor: 'var(--pink)' }}
                                    />
                                    This relates to my current experience
                                </label>
                                {moodReflection[idx] && (
                                    <div style={{ background: '#fff9fb', padding: '12px', borderRadius: '12px', fontSize: '12px', color: '#ec407a', lineHeight: '1.4' }}>
                                        <strong>Gentle Reflection:</strong> Are there 1-2 small ways you could prioritize your rest today? Remember, you are doing a great job.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Self-Care */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', margin: 0 }}>
                        Postpartum Self-Care Essentials
                    </h2>
                    <div style={{
                        background: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: 'var(--pink)',
                        border: '1px solid #ffe4e6'
                    }}>
                        {Object.values(selfCareChecks).filter(Boolean).length} / {selfCareIdeas.length} Completed Today
                    </div>
                </div>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '32px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    marginBottom: '80px',
                    border: '1px solid #f0f0f0'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        {selfCareIdeas.map((idea, idx) => (
                            <div
                                key={idx}
                                onClick={() => toggleSelfCare(idx)}
                                className={`fade-in checklist-item ${selfCareChecks[idx] ? 'checked' : ''}`}
                                style={{
                                    animationDelay: `${0.2 + idx * 0.05}s`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px',
                                    background: '#fcfcfc',
                                    borderRadius: '16px'
                                }}
                            >
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    border: `2px solid ${selfCareChecks[idx] ? 'var(--pink)' : '#ddd'}`,
                                    background: selfCareChecks[idx] ? 'var(--pink)' : 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease'
                                }}>
                                    {selfCareChecks[idx] && '✓'}
                                </div>
                                <span style={{
                                    fontSize: '15px',
                                    color: selfCareChecks[idx] ? '#999' : '#555',
                                    textDecoration: selfCareChecks[idx] ? 'line-through' : 'none'
                                }}>
                                    {idea}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px', background: '#fff9fb', borderRadius: '16px' }}>
                        <p style={{ fontSize: '16px', color: '#ec407a', fontStyle: 'italic', fontWeight: '600' }}>
                            "You can't pour from an empty cup. Taking care of yourself is taking care of your baby."
                        </p>
                    </div>
                </div>

                <div style={{
                    padding: '40px',
                    background: '#FFF5F5',
                    borderRadius: '32px',
                    border: '2px solid #FFE5E5',
                    marginBottom: '80px',
                    boxShadow: '0 20px 50px rgba(229, 62, 62, 0.05)',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ fontSize: '32px' }}>🛑</div>
                            <h2 style={{ color: '#C53030', margin: 0, fontSize: '26px', fontWeight: '900' }}>
                                Emergency Guidance
                            </h2>
                        </div>
                        <button
                            onClick={() => window.open('tel:911', '_self')}
                            style={{
                                background: '#C53030',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(197, 48, 48, 0.3)'
                            }}
                        >
                            GET HELP NOW
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                        {redFlags.map((flag, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                gap: '12px',
                                padding: '16px',
                                background: 'white',
                                borderRadius: '16px',
                                border: `1px solid ${idx < 3 ? '#FEB2B2' : '#FFE5E5'}`,
                                position: 'relative'
                            }}>
                                <span style={{ color: idx < 3 ? '#E53E3E' : '#FC8181', fontWeight: 'bold' }}>{idx < 3 ? '‼️' : '⚠️'}</span>
                                <span style={{ fontSize: '15px', color: '#4A5568', lineHeight: '1.4' }}>{flag}</span>
                            </div>
                        ))}
                    </div>
                    <p style={{ marginTop: '30px', fontSize: '14px', color: '#718096', fontStyle: 'italic', textAlign: 'center' }}>
                        Postpartum complications are serious medical events. Your health is the foundation for your baby's wellbeing.
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '60px 40px',
                    background: 'linear-gradient(-45deg, #E8F5E9, #C8E6C9, #E1F5FE, #F3E5F5)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientMove 15s ease infinite',
                    borderRadius: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '16px', color: '#1A1A1A' }}>
                        You're Not Alone in This Transition
                    </h3>
                    <p style={{ fontSize: '17px', color: '#444', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                        Our postpartum specialists are here to guide you through physical healing, lactation, and emotional wellness.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{
                            padding: '18px 48px',
                            fontSize: '17px',
                            borderRadius: '30px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(236, 64, 122, 0.2)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {getCTAText()}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PostpartumJourney;
