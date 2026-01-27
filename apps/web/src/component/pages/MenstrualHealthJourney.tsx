import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const MenstrualHealthJourney: React.FC = () => {
    const navigate = useNavigate();

    const cycleBasics = [
        {
            title: "Normal Period Length",
            detail: "3-7 days",
            color: "#FCE4EC"
        },
        {
            title: "Cycle Length",
            detail: "21-35 days (avg 28)",
            color: "#F3E5F5"
        },
        {
            title: "Blood Loss",
            detail: "30-40ml per cycle",
            color: "#E8F5E9"
        },
        {
            title: "PMS Window",
            detail: "1-2 weeks before period",
            color: "#FFF8E1"
        }
    ];

    const commonConcerns = [
        { concern: "Irregular Periods", causes: "Stress, hormones, PCOS, thyroid" },
        { concern: "Heavy Bleeding", causes: "Fibroids, adenomyosis, hormonal imbalance" },
        { concern: "Painful Cramps", causes: "Endometriosis, fibroids, normal cramping" },
        { concern: "Missing Periods", causes: "Pregnancy, stress, low weight, PCOS" },
        { concern: "PMS/PMDD", causes: "Hormonal sensitivity, serotonin fluctuations" }
    ];

    const trackingTips = [
        "Note period start and end dates",
        "Track flow heaviness (light/medium/heavy)",
        "Record pain levels and location",
        "Note mood changes and PMS symptoms",
        "Track any spotting between periods",
        "Monitor cycle length patterns over time"
    ];

    const whenToSeek = [
        "Periods lasting longer than 7 days",
        "Soaking through a pad/tampon every hour",
        "Severe pain that interferes with daily life",
        "Missing periods for 3+ months (not pregnant)",
        "Bleeding between periods or after sex",
        "Any sudden changes in your normal pattern"
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Menstrual Health"
                subtitle="Understand your cycle, track patterns, and manage period-related concerns with knowledge and support."
                badge="Period Care"
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
                        This journey supports women navigating period-related concerns, from understanding what's normal to
                        managing symptoms like heavy bleeding, irregular cycles, or painful cramps. Whether you're experiencing
                        your first period or dealing with changes later in life, knowledge is power.
                    </p>
                </div>

                {/* Cycle Basics */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    What's Considered Normal?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {cycleBasics.map((item, idx) => (
                        <div key={idx} style={{
                            background: item.color,
                            padding: '24px',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--pink)', marginBottom: '8px' }}>
                                {item.detail}
                            </div>
                            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#555' }}>{item.title}</h4>
                        </div>
                    ))}
                </div>

                {/* Common Concerns */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Common Period Concerns
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {commonConcerns.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '8px' }}>{item.concern}</h4>
                            <p style={{ fontSize: '13px', color: '#888', marginBottom: '4px', fontWeight: '600' }}>
                                Possible causes:
                            </p>
                            <p style={{ fontSize: '14px', color: '#666' }}>{item.causes}</p>
                        </div>
                    ))}
                </div>

                {/* Tracking Tips */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    How to Track Your Cycle
                </h2>
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '60px'
                }}>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                        Tracking your menstrual cycle helps you understand your body's patterns and identify any irregularities early.
                        Use a period tracking app or journal to log:
                    </p>
                    <ul style={{ paddingLeft: '24px', fontSize: '15px', color: '#555', lineHeight: '2' }}>
                        {trackingTips.map((tip, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
                        ))}
                    </ul>
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
                        🩺 When to See a Doctor
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        {whenToSeek.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                        ))}
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Trust your instincts. If something feels wrong, it's always okay to consult a healthcare provider.
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Concerned About Your Period?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Talk to a women's health specialist about your menstrual concerns and get personalized care.
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

export default MenstrualHealthJourney;
