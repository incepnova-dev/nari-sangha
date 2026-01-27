import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const FertilityJourney: React.FC = () => {
    const navigate = useNavigate();

    const cyclePhases = [
        {
            title: "Menstrual Phase",
            days: "Days 1-5",
            description: "Period begins, hormone levels reset",
            color: "#FCE4EC"
        },
        {
            title: "Follicular Phase",
            days: "Days 6-14",
            description: "Follicles develop, estrogen rises",
            color: "#F3E5F5"
        },
        {
            title: "Ovulation",
            days: "Day 14 (±2)",
            description: "Egg released, peak fertility window",
            color: "#E8F5E9"
        },
        {
            title: "Luteal Phase",
            days: "Days 15-28",
            description: "Progesterone rises, preparing for pregnancy",
            color: "#FFF8E1"
        }
    ];

    const lifestyleFactors = [
        { factor: "Nutrition", tip: "Folate, iron, healthy fats" },
        { factor: "Exercise", tip: "Moderate activity, avoid extremes" },
        { factor: "Stress", tip: "Mindfulness, adequate sleep" },
        { factor: "Weight", tip: "Maintain healthy BMI" },
        { factor: "Avoid", tip: "Smoking, excessive alcohol, toxins" }
    ];

    const whenToConsult = [
        "Trying for over 12 months without success (or 6 months if over 35)",
        "Irregular or absent periods",
        "Known fertility conditions (PCOS, endometriosis)",
        "History of miscarriage",
        "Male partner fertility concerns"
    ];

    return (
        <div className="app-container">
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
                        This journey is designed for women who are trying to conceive, want to understand their fertility better,
                        or are preparing for pregnancy. Whether you're just starting to think about conception or have been trying
                        for a while, we're here to support you with knowledge, tools, and compassionate guidance.
                    </p>
                </div>

                {/* Understanding Your Cycle */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Understanding Your Menstrual Cycle
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {cyclePhases.map((phase, idx) => (
                        <div key={idx} style={{
                            background: phase.color,
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>{phase.title}</h3>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '12px' }}>
                                {phase.days}
                            </div>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{phase.description}</p>
                        </div>
                    ))}
                </div>

                {/* Lifestyle Optimization */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Optimizing for Fertility
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {lifestyleFactors.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '8px' }}>{item.factor}</h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>{item.tip}</p>
                        </div>
                    ))}
                </div>

                {/* When to Seek Help */}
                <div style={{
                    padding: '30px',
                    background: '#FFF8E1',
                    borderRadius: '20px',
                    border: '1px solid #FFE082',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#F57C00', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                        👩‍⚕️ When to Consult a Specialist
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        {whenToConsult.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Remember: Every fertility journey is unique. There's no shame in seeking help early.
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
                        Ready to Start Your Fertility Journey?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with fertility specialists who understand your goals and can provide personalized guidance.
                    </p>
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
