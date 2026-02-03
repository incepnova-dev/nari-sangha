import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";
import HormoneTimeline from "../shared/HormoneTimeline";
import CognitiveDistortions from "../shared/CognitiveDistortions";

const MentalWellnessJourney: React.FC = () => {
    const navigate = useNavigate();

    const focusAreas = [
        {
            title: "Mood Tracking",
            description: "Monitor emotional patterns and identify triggers",
            icon: "📊",
            color: "#E3F2FD"
        },
        {
            title: "Stress Management",
            description: "Learn coping strategies and relaxation techniques",
            icon: "🧘‍♀️",
            color: "#F3E5F5"
        },
        {
            title: "Sleep Health",
            description: "Improve sleep quality for better mental health",
            icon: "😴",
            color: "#E8F5E9"
        },
        {
            title: "Self-Care",
            description: "Build sustainable self-care routines",
            icon: "💆‍♀️",
            color: "#FFF8E1"
        }
    ];

    const copingStrategies = [
        { strategy: "Breathing Exercises", benefit: "Calms anxiety, reduces stress response" },
        { strategy: "Journaling", benefit: "Processes emotions, identifies patterns" },
        { strategy: "Physical Activity", benefit: "Releases endorphins, improves mood" },
        { strategy: "Mindfulness & Meditation", benefit: "Increases present-moment awareness" },
        { strategy: "Social Connection", benefit: "Reduces isolation, builds support" },
        { strategy: "Creative Outlets", benefit: "Expresses emotions, provides joy" }
    ];

    const hormonalConnections = [
        "PMS/PMDD mood changes linked to progesterone fluctuations",
        "Perimenopause can trigger anxiety and depression",
        "Postpartum depression affects 1 in 7 new mothers",
        "PCOS and thyroid disorders impact mental health",
        "Birth control can influence mood for some women"
    ];

    const brainChemistry = [
        { name: "Serotonin", icon: "💎", color: "#00bcd4", desc: "The 'Stability' molecule. Regulates mood, sleep, and appetite." },
        { name: "Oxytocin", icon: "❤️", color: "#e91e63", desc: "The 'Connection' hormone. Vital for bonding and reducing stress." },
        { name: "GABA", icon: "🧘", color: "#9c27b0", desc: "The 'Calm' molecule. Helps quiet the mind and reduce anxiety." },
        { name: "Cortisol", icon: "⚡", color: "#ff5722", desc: "The 'Stress' hormone. Useful for survival but harmful when chronically high." },
    ];

    const severityScale = [
        { level: "Mild", color: "#4caf50", cases: ["Baby blues", "Occasional worry"], action: "Self-care + Group support" },
        { level: "Moderate", color: "#ff9800", cases: ["Persistent fatigue", "Anxiety affecting sleep"], action: "Counseling + Routine" },
        { level: "Serious", color: "#9c27b0", cases: ["Intense sadness", "Difficulty bonding"], action: "Specialized Therapy" },
        { level: "Critical", color: "#f44336", cases: ["Self-harm thoughts", "Hallucinations"], action: "Urgent Medical Care" },
    ];

    const whenToSeek = [
        "Persistent sadness or hopelessness lasting 2+ weeks",
        "Loss of interest in activities you once enjoyed",
        "Difficulty functioning in daily life",
        "Thoughts of self-harm or suicide",
        "Severe anxiety or panic attacks",
        "Extreme mood swings affecting relationships"
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Mental Wellness & Mood"
                subtitle="Your mental health is a journey, not a destination. Find tools, support, and resources to nurture your emotional wellbeing."
                badge="Mental Health Support"
            >
                <div style={{ marginBottom: '15px' }}>
                    <button
                        onClick={() => navigate(ROUTES.JOURNEYS)}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.4)',
                            color: 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 600,
                            backdropFilter: 'blur(5px)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        ← Back to Paths
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🥗 Holistic Approach</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🧪 Science-Backed</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>🤝 Family Guide</span>
                </div>
            </InnerPageHero>

            {/* Back Button Moved to Hero */}

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Who This Is For */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px' }}>
                        Who This Journey Is For
                    </h2>
                    <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#555' }}>
                        This journey supports women navigating emotional challenges, stress, anxiety, depression, or hormonal mood changes.
                        Mental health is just as important as physical health, and seeking support is a sign of strength, not weakness.
                        You deserve to feel emotionally well.
                    </p>
                </div>

                {/* Focus Areas */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    What This Journey Helps With
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {focusAreas.map((area, idx) => (
                        <div key={idx} style={{
                            background: area.color,
                            padding: '28px',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{area.icon}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>{area.title}</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>{area.description}</p>
                        </div>
                    ))}
                </div>

                {/* Coping Strategies */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Healthy Coping Strategies
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '80px' }}>
                    {copingStrategies.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left', padding: '24px' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '8px', fontWeight: '800' }}>{item.strategy}</h4>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{item.benefit}</p>
                        </div>
                    ))}
                </div>

                {/* Hormone Journey Timeline */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Interactive Hormone Journey
                </h2>
                <HormoneTimeline />

                {/* Brain Chemistry Visual */}
                <div style={{ background: 'white', padding: '60px 40px', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>🧪 Understanding Your Chemistry</h2>
                    <p style={{ color: '#666', textAlign: 'center', marginBottom: '40px' }}>Mood is often a reflection of biological balances we can support.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        {brainChemistry.map(c => (
                            <div key={c.name} style={{ textAlign: 'center', padding: '32px', borderRadius: '24px', background: c.color + '08', border: `1px solid ${c.color}22` }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{c.icon}</div>
                                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: c.color }}>{c.name}</h3>
                                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cognitive Distortions Module */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Mindset Support: Reframing Thinking Traps
                </h2>
                <p style={{ fontSize: '16px', color: '#555', marginBottom: '24px', lineHeight: '1.6' }}>
                    Depression often creates "thinking traps" that distort how we see ourselves and our babies. Learning to identify and reframe these patterns is a key part of recovery.
                </p>
                <CognitiveDistortions />

                {/* Severity Guide */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>📊 Emotional Severity Scale</h2>
                    <p style={{ color: '#666', textAlign: 'center', marginBottom: '40px' }}>Understand where you are and what care you might need.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                        {severityScale.map(s => (
                            <div key={s.level} style={{ background: 'white', padding: '32px', borderRadius: '24px', border: `1px solid ${s.color}44`, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: s.color, borderRadius: '24px 24px 0 0' }}></div>
                                <h3 style={{ fontSize: '20px', fontWeight: '900', color: s.color, marginBottom: '16px' }}>{s.level}</h3>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '800', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>Common Signs</p>
                                    <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', color: '#555' }}>
                                        {s.cases.map(c => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                                <div style={{ background: s.color + '11', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '13px', fontWeight: '700', color: s.color, margin: 0 }}>{s.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hormonal Connection */}
                <div style={{
                    background: '#F3E5F5',
                    padding: '32px',
                    borderRadius: '20px',
                    marginBottom: '60px',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px', color: '#6A1B9A' }}>
                        💜 The Hormone-Mental Health Connection
                    </h2>
                    <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                        Women's mental health is deeply connected to hormonal fluctuations. Understanding this connection can help validate
                        your experiences and guide treatment:
                    </p>
                    <ul style={{ paddingLeft: '24px', fontSize: '15px', color: '#555', lineHeight: '1.9' }}>
                        {hormonalConnections.map((connection, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{connection}</li>
                        ))}
                    </ul>
                </div>

                {/* When to Seek Professional Help */}
                <div style={{
                    padding: '30px',
                    background: '#FFEBEE',
                    borderRadius: '20px',
                    border: '1px solid #FFCDD2',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#D32F2F', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                        🆘 When to Seek Professional Help
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        {whenToSeek.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                        ))}
                    </ul>
                    <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #FFCDD2'
                    }}>
                        <p style={{ fontSize: '14px', color: '#D32F2F', fontWeight: '700', marginBottom: '8px' }}>
                            Crisis Resources:
                        </p>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                            If you're in crisis, please call a crisis helpline or go to your nearest emergency room. You are not alone.
                        </p>
                    </div>
                </div>

                {/* Family Guide CTA */}
                <div style={{
                    marginBottom: '80px',
                    padding: '60px 40px',
                    background: 'linear-gradient(135deg, #1A237E 0%, #311B92 100%)',
                    borderRadius: '40px',
                    color: 'white',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    alignItems: 'center'
                }}>
                    <div>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '16px', display: 'inline-block' }}>FOR PARTNERS & FAMILY</span>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px' }}>How to be a lifeline</h2>
                        <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.6', marginBottom: '24px' }}>
                            Supporting a loved one through mental health challenges can be difficult. Our family guide helps you understand, communicate, and support without burnout.
                        </p>
                        <button
                            style={{ background: 'white', color: '#1A237E', border: 'none', padding: '14px 32px', borderRadius: '30px', fontWeight: '800', cursor: 'pointer' }}
                            onClick={() => navigate(ROUTES.PERINATAL_FAMILY)}
                        >
                            Get Family Guide
                        </button>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h4 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '800' }}>Quick Tips for Support:</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '15px', opacity: 0.9, lineHeight: '2' }}>
                            <li>Listen without trying to "fix" immediately</li>
                            <li>Help with daily chores to reduce stress</li>
                            <li>Validate her feelings as real and biologically rooted</li>
                            <li>Encourage professional help gently</li>
                        </ul>
                    </div>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '60px 40px',
                    background: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
                    borderRadius: '40px'
                }}>
                    <h3 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', color: '#2A2A2A' }}>
                        Talk to a Women's Health Therapist
                    </h3>
                    <p style={{ fontSize: '17px', color: '#555', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                        Connect with specialized therapists and counselors who understand the unique intersection of hormonal health and mental wellness.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '18px 40px', fontSize: '18px' }}
                    >
                        Book a Private Session
                    </button>
                </div>

                {/* RELATED JOURNEYS */}
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>Shared Resilience</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                        <div
                            style={{ background: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #eee', cursor: 'pointer', textAlign: 'left' }}
                            onClick={() => navigate(ROUTES.LOSS_SUPPORT)}
                        >
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎗️</div>
                            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>Loss & Grief Support</h4>
                            <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>Compassionate guidance and therapeutic tools for navigating difficult periods of loss.</p>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--pink)' }}>View Suppport Path &rarr;</span>
                        </div>
                        <div
                            style={{ background: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #eee', cursor: 'pointer', textAlign: 'left' }}
                            onClick={() => navigate(ROUTES.COMMUNITY)}
                        >
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🤝</div>
                            <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>Safe Communities</h4>
                            <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>Join moderated safe spaces to share experiences and receive support from peers.</p>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--pink)' }}>Join Community &rarr;</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MentalWellnessJourney;
