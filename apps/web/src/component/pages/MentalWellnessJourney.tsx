import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

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
                title="Mental Wellness"
                subtitle="Your mental health matters. Find tools, support, and resources to nurture your emotional wellbeing."
                badge="Mental Health Support"
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
                        e.currentTarget.style.color = "var(--pink)";
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {copingStrategies.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '8px' }}>{item.strategy}</h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>{item.benefit}</p>
                        </div>
                    ))}
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

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Talk to a Mental Health Professional
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with therapists and counselors who specialize in women's mental health.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Find Support
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MentalWellnessJourney;
