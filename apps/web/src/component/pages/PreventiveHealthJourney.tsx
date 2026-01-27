import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const PreventiveHealthJourney: React.FC = () => {
    const navigate = useNavigate();

    const screeningsByAge = [
        {
            ageGroup: "20s",
            screenings: ["Pap smear (every 3 years)", "STI screening", "Blood pressure", "Cholesterol (if risk factors)"],
            color: "#E3F2FD"
        },
        {
            ageGroup: "30s",
            screenings: ["Pap + HPV test (every 5 years)", "Blood pressure annually", "Diabetes screening", "Skin checks"],
            color: "#F3E5F5"
        },
        {
            ageGroup: "40s",
            screenings: ["Mammogram (baseline at 40)", "Diabetes screening", "Thyroid check", "Bone density (if risk)"],
            color: "#FCE4EC"
        },
        {
            ageGroup: "50+",
            screenings: ["Mammogram (every 1-2 years)", "Colonoscopy", "Bone density", "Heart health assessment"],
            color: "#FFF8E1"
        }
    ];

    const vaccinations = [
        { vaccine: "HPV", ageRange: "Up to age 26 (catch-up to 45)", benefit: "Prevents cervical cancer" },
        { vaccine: "Flu", ageRange: "Annually", benefit: "Reduces flu complications" },
        { vaccine: "Tdap", ageRange: "Every 10 years", benefit: "Tetanus, diphtheria, pertussis protection" },
        { vaccine: "COVID-19", ageRange: "As recommended", benefit: "Prevents severe illness" }
    ];

    const healthChecklist = [
        "Know your family health history",
        "Track your menstrual cycle patterns",
        "Perform monthly breast self-exams",
        "Maintain a healthy weight through nutrition and exercise",
        "Manage stress and prioritize mental health",
        "Limit alcohol and avoid smoking"
    ];

    return (
        <div className="app-container">
            <InnerPageHero
                title="Preventive Health"
                subtitle="Stay ahead of potential health issues with age-appropriate screenings, vaccinations, and proactive care."
                badge="Prevention & Wellness"
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
                        Preventive health is for <strong>every woman</strong>, regardless of age or current health status.
                        By staying proactive with screenings, vaccines, and healthy habits, you can catch potential issues early
                        and maintain your wellbeing for years to come.
                    </p>
                </div>

                {/* Screenings by Age */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Age-Based Screening Guidelines
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {screeningsByAge.map((group, idx) => (
                        <div key={idx} style={{
                            background: group.color,
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: '#2A2A2A' }}>
                                Ages {group.ageGroup}
                            </h3>
                            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
                                {group.screenings.map((screening, sidx) => (
                                    <li key={sidx} style={{ marginBottom: '6px' }}>{screening}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Vaccinations */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Important Vaccinations
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {vaccinations.map((vax, idx) => (
                        <div key={idx} className={styles.productCard} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                            <h4 style={{ fontSize: '18px', color: 'var(--pink)', marginBottom: '8px' }}>{vax.vaccine}</h4>
                            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px', fontWeight: '600' }}>
                                {vax.ageRange}
                            </p>
                            <p style={{ fontSize: '14px', color: '#666' }}>{vax.benefit}</p>
                        </div>
                    ))}
                </div>

                {/* Health Checklist */}
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '30px' }}>
                    Your Preventive Health Checklist
                </h2>
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: '60px'
                }}>
                    <ul style={{ paddingLeft: '24px', fontSize: '16px', color: '#555', lineHeight: '2' }}>
                        {healthChecklist.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--pink)', fontWeight: '700', marginRight: '8px' }}>✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* When to Seek Help */}
                <div style={{
                    padding: '30px',
                    background: '#E3F2FD',
                    borderRadius: '20px',
                    border: '1px solid #90CAF9',
                    marginBottom: '60px'
                }}>
                    <h2 style={{ color: '#1565C0', marginBottom: '16px', fontSize: '24px', fontWeight: 'bold' }}>
                        💡 Proactive Health Tips
                    </h2>
                    <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
                        Don't wait for symptoms to appear. Regular check-ups and screenings can detect issues before they become serious.
                        If you have a family history of certain conditions (breast cancer, heart disease, diabetes), talk to your doctor
                        about earlier or more frequent screenings.
                    </p>
                </div>

                {/* Support CTA */}
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
                    borderRadius: '24px'
                }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#2A2A2A' }}>
                        Schedule Your Preventive Screenings
                    </h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px' }}>
                        Talk to a healthcare provider about which screenings are right for you based on your age and health history.
                    </p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Book an Appointment
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PreventiveHealthJourney;
