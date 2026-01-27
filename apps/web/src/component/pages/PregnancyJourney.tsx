import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const PregnancyJourney: React.FC = () => {
    const navigate = useNavigate();

    const trimesters = [
        {
            title: "First Trimester",
            weeks: "Weeks 1-12",
            symptoms: "Morning sickness, fatigue, breast tenderness",
            action: "Start Prenatal Vitamins, Book First Scan",
            color: "#E3F2FD" // Light Blue
        },
        {
            title: "Second Trimester",
            weeks: "Weeks 13-26",
            symptoms: "Energy boost, baby bump showing",
            action: "Anatomy Scan, Glucose Test",
            color: "#F3E5F5" // Light Purple
        },
        {
            title: "Third Trimester",
            weeks: "Weeks 27-40",
            symptoms: "Braxton Hicks, back pain, nesting",
            action: "Pack Hospital Bag, Kick Counts",
            color: "#FCE4EC" // Light Pink
        }
    ];

    const nutrition = [
        { name: "Folic Acid", source: "Spinach, Lentils", benefit: "Neural tube dev" },
        { name: "Iron", source: "Beans, Fortified Cereals", benefit: "Blood supply" },
        { name: "Calcium", source: "Milk, Yogurt", benefit: "Bone strength" },
        { name: "DHA", source: "Fish, Walnuts", benefit: "Brain development" },
        { name: "Protein", source: "Eggs, Paneer", benefit: "Growth" },
        { name: "Vitamin D", source: "Sunlight, Eggs", benefit: "Immunity" },
    ];

    const redFlags = [
        { title: "Heavy Bleeding", type: "urgent" },
        { title: "Severe Abdominal Pain", type: "urgent" },
        { title: "Reduced Baby Movement", type: "urgent" },
        { title: "Persistent Headache/Vision Changes", type: "warning" },
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Your Pregnancy Journey"
                subtitle="Expert guidance for every step of the way, from bump to baby."
                badge="Pregnancy Care"
            />

            {/* Back Navigation */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px 20px 0'
            }}>
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

                {/* Trimesters */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>Trimester Milestones</h2>
                <div className={styles.discoveryGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {trimesters.map((t, idx) => (
                        <div key={idx} className={styles.resourceCard} style={{ background: t.color, border: 'none', alignItems: 'flex-start', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>{t.title}</h3>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '16px', display: 'block' }}>{t.weeks}</span>
                            <div style={{ marginBottom: '16px' }}>
                                <strong style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', color: '#777' }}>Symptoms</strong>
                                <p>{t.symptoms}</p>
                            </div>
                            <div>
                                <strong style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', color: '#777' }}>Key Actions</strong>
                                <p style={{ fontWeight: '600', color: 'var(--pink)' }}>{t.action}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nutrition */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', margin: '60px 0 30px' }}>Essential Nutrition</h2>
                <div className={styles.productsGrid}>
                    {nutrition.map((n, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '18px', color: 'var(--pink)' }}>{n.name}</h4>
                            <p style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}><strong>Sources:</strong> {n.source}</p>
                            <p style={{ fontSize: '14px', color: '#777' }}><strong>Benefit:</strong> {n.benefit}</p>
                        </div>
                    ))}
                </div>

                {/* Red Flags */}
                <div style={{ marginTop: '60px', padding: '30px', background: '#FFEBEE', borderRadius: '20px', border: '1px solid #FFCDD2' }}>
                    <h2 style={{ color: '#D32F2F', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>⚠️ When to Seek Help</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {redFlags.map((flag, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '20px' }}>{flag.type === 'urgent' ? '🚨' : '⚠️'}</span>
                                <span style={{ fontWeight: '600', color: '#C62828' }}>{flag.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support CTA */}
                <div style={{
                    marginTop: '60px',
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Have questions about your pregnancy?
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Connect with our specialists for personalized guidance.
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

export default PregnancyJourney;

