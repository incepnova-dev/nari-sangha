import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const PostpartumJourney: React.FC = () => {
    const navigate = useNavigate();

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
            <InnerPageHero
                title="Postpartum Care"
                subtitle="Navigate the 'fourth trimester' with guidance on physical recovery, emotional wellbeing, and caring for your new baby."
                badge="Postpartum Support"
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
                        This journey supports new mothers in the first year after giving birth. The postpartum period (often called the
                        "fourth trimester") is a time of profound physical, emotional, and lifestyle changes. You're not just recovering
                        from birth—you're becoming a mother, and that takes time, patience, and support.
                    </p>
                </div>

                {/* Recovery Timeline */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Postpartum Recovery Timeline
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                    {recoveryTimeline.map((phase, idx) => (
                        <div key={idx} style={{
                            background: phase.color,
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{phase.period}</h3>
                            <div style={{ marginBottom: '12px' }}>
                                <strong style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>
                                    What to Expect:
                                </strong>
                                <p style={{ fontSize: '14px', color: '#666' }}>{phase.whatToExpect}</p>
                            </div>
                            <div>
                                <strong style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>
                                    Focus On:
                                </strong>
                                <p style={{ fontSize: '14px', color: '#666' }}>{phase.focus}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Emotional Health */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Postpartum Emotional Health
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {emotionalHealth.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '6px' }}>{item.condition}</h4>
                            <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px', fontWeight: '600' }}>
                                Affects: {item.prevalence}
                            </p>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                <strong>Symptoms:</strong> {item.symptoms}
                            </p>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                <strong>Support:</strong> {item.support}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Self-Care */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Postpartum Self-Care Essentials
                </h2>
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '60px'
                }}>
                    <ul style={{ paddingLeft: '24px', fontSize: '15px', color: '#555', lineHeight: '2' }}>
                        {selfCareIdeas.map((idea, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{idea}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '20px', fontSize: '15px', color: '#777', fontStyle: 'italic' }}>
                        Remember: You can't pour from an empty cup. Taking care of yourself <strong>is</strong> taking care of your baby.
                    </p>
                </div>

                {/* When to Seek Help */}
                <div style={{
                    padding: '30px',
                    background: '#FFEBEE',
                    borderRadius: '20px',
                    border: '1px solid #FFCDD2',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#D32F2F', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                        ⚠️ When to Contact Your Doctor Immediately
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        {redFlags.map((flag, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{flag}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Postpartum complications are serious. Don't hesitate to seek help—your health is essential for you and your baby.
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Need Postpartum Support?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with postpartum specialists for physical recovery, breastfeeding support, or mental health care.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Get Support
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PostpartumJourney;
