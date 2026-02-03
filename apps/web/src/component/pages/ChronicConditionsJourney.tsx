import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const ChronicConditionsJourney: React.FC = () => {
    const navigate = useNavigate();

    const conditions = [
        {
            name: "PCOS",
            fullName: "Polycystic Ovary Syndrome",
            symptoms: "Irregular periods, excess hair growth, acne, weight gain",
            management: "Lifestyle changes, birth control, metformin, fertility support",
            color: "#F3E5F5"
        },
        {
            name: "Endometriosis",
            fullName: "Endometriosis",
            symptoms: "Painful periods, pelvic pain, pain during sex, heavy bleeding",
            management: "Pain management, hormonal therapy, surgery in severe cases",
            color: "#FCE4EC"
        },
        {
            name: "Thyroid Disorders",
            fullName: "Hypothyroidism / Hyperthyroidism",
            symptoms: "Fatigue, weight changes, mood swings, irregular periods",
            management: "Thyroid medication, regular monitoring, lifestyle support",
            color: "#E3F2FD"
        },
        {
            name: "Fibroids",
            fullName: "Uterine Fibroids",
            symptoms: "Heavy periods, pelvic pressure, frequent urination, back pain",
            management: "Monitoring, hormonal treatment, minimally invasive procedures",
            color: "#E8F5E9"
        }
    ];

    const managementPillars = [
        { pillar: "Education", description: "Understand your condition thoroughly" },
        { pillar: "Medication", description: "Follow prescribed treatment plans" },
        { pillar: "Lifestyle", description: "Nutrition, exercise, stress management" },
        { pillar: "Tracking", description: "Monitor symptoms and triggers" },
        { pillar: "Support", description: "Connect with specialists and community" },
        { pillar: "Self-Care", description: "Prioritize rest and mental health" }
    ];

    const trackingIdeas = [
        "Symptom diary (pain levels, locations, triggers)",
        "Medication log and side effects",
        "Menstrual cycle patterns",
        "Energy and mood fluctuations",
        "Diet and exercise impact",
        "Questions for your doctor"
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Chronic Conditions Management"
                subtitle="Living with PCOS, endometriosis, thyroid disorders, or fibroids? Get ongoing support, education, and tools for managing your condition."
                badge="Chronic Care"
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

            {/* Back Button Moved to Hero */}

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Who This Is For */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '20px' }}>
                        Who This Journey Is For
                    </h2>
                    <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#555' }}>
                        This journey is for women living with diagnosed chronic conditions such as PCOS, endometriosis,
                        thyroid disorders, or fibroids. Managing a chronic condition can feel overwhelming, but you're not alone.
                        With the right knowledge, support, and specialist care, you can lead a full, healthy life.
                    </p>
                </div>

                {/* Common Conditions */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Common Chronic Conditions
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {conditions.map((condition, idx) => (
                        <div key={idx} style={{
                            background: condition.color,
                            padding: '28px',
                            borderRadius: '20px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px', color: '#2A2A2A' }}>
                                {condition.name}
                            </h3>
                            <p style={{ fontSize: '13px', color: '#777', marginBottom: '16px', fontStyle: 'italic' }}>
                                {condition.fullName}
                            </p>
                            <div style={{ marginBottom: '16px' }}>
                                <strong style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>
                                    Common Symptoms:
                                </strong>
                                <p style={{ fontSize: '14px', color: '#666' }}>{condition.symptoms}</p>
                            </div>
                            <div>
                                <strong style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '4px' }}>
                                    Management:
                                </strong>
                                <p style={{ fontSize: '14px', color: '#666' }}>{condition.management}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Management Pillars */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Six Pillars of Chronic Condition Management
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {managementPillars.map((item, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '16px', color: 'var(--pink)', marginBottom: '8px' }}>{item.pillar}</h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Tracking & Monitoring */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    What to Track
                </h2>
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '60px'
                }}>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                        Keeping a detailed record of your symptoms, treatments, and lifestyle factors can help you and your doctor
                        identify patterns, adjust treatments, and improve your quality of life.
                    </p>
                    <ul style={{ paddingLeft: '24px', fontSize: '15px', color: '#555', lineHeight: '2' }}>
                        {trackingIdeas.map((idea, idx) => (
                            <li key={idx} style={{ marginBottom: '8px' }}>{idea}</li>
                        ))}
                    </ul>
                </div>

                {/* When to Escalate Care */}
                <div style={{
                    padding: '30px',
                    background: '#FFF3E0',
                    borderRadius: '20px',
                    border: '1px solid #FFE082',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#EF6C00', marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
                        ⚠️ When to Contact Your Specialist
                    </h2>
                    <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                        <li style={{ marginBottom: '8px' }}>Symptoms suddenly worsen or don't respond to treatment</li>
                        <li style={{ marginBottom: '8px' }}>New or unusual symptoms appear</li>
                        <li style={{ marginBottom: '8px' }}>Medication side effects become severe</li>
                        <li style={{ marginBottom: '8px' }}>You're considering pregnancy and need to adjust treatment</li>
                        <li style={{ marginBottom: '8px' }}>You need emotional support or mental health resources</li>
                    </ul>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#777', fontStyle: 'italic' }}>
                        Regular follow-ups with your healthcare team are essential for managing chronic conditions effectively.
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Need Specialist Care?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with specialists who understand chronic conditions and can provide ongoing, personalized care.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Find a Specialist
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ChronicConditionsJourney;
