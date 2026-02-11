import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

const PreventiveHealthJourney: React.FC = () => {
    const navigate = useNavigate();
    const [selectedAge, setSelectedAge] = React.useState<string | null>(null);

    const screenings = [
        {
            title: "Cervical Cancer",
            icon: "🔬",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            guidelines: [
                { age: "21-29", freq: "Pap smear every 3 years" },
                { age: "30-65", freq: "Pap + HPV test every 5 years" }
            ],
            badge: "Life-saving"
        },
        {
            title: "Breast Cancer",
            icon: "🎀",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            guidelines: [
                { age: "40-44", freq: "Optional annual mammogram" },
                { age: "45-54", freq: "Annual mammogram" }
            ],
            badge: "Critical After 40"
        },
        {
            title: "Heart Health",
            icon: "❤️",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            guidelines: [
                { age: "All ages", freq: "BP check every 2 years" },
                { age: "20+", freq: "Lipid panel every 5 years" }
            ],
            badge: "Vital"
        }
    ];

    const ageTimeline = [
        { age: "18-39", label: "Foundation", icon: "🌸", color: "#e30b5d", details: ["Pap smear (21+)", "STI screening", "BP & Cholesterol baseline"] },
        { age: "40-49", label: "Prime", icon: "🌺", color: "#7c3aed", details: ["Annual Mammograms", "Diabetes screening (35+)", "Colorectal check (45+)"] },
        { age: "50-64", label: "Maturity", icon: "🌻", color: "#6366f1", details: ["Colonoscopy", "Bone density (if risk)", "Cardiac assessment"] },
        { age: "65+", label: "Wisdom", icon: "🌹", color: "#10b981", details: ["Bone density baseline", "Medicare wellness visits", "Vision/Hearing checks"] },
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
                        Preventive health is for <strong>every woman</strong>, regardless of age or current health status.
                        By staying proactive with screenings, vaccines, and healthy habits, you can catch potential issues early
                        and maintain your wellbeing for years to come.
                    </p>
                </div>

                {/* Interactive Age Timeline */}
                <div style={{ marginBottom: '80px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px' }}>Your Health Timeline</h2>
                    <p style={{ color: '#666', marginBottom: '40px' }}>Select an age group to see specific preventive priorities.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', position: 'relative' }}>
                        {/* Connecting Line */}
                        <div style={{ position: 'absolute', top: '50px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, #e30b5d, #7c3aed, #10b981)', opacity: 0.2, zIndex: 0 }}></div>

                        {ageTimeline.map(group => (
                            <div
                                key={group.age}
                                onClick={() => setSelectedAge(selectedAge === group.age ? null : group.age)}
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    margin: '0 auto 16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `3px solid ${selectedAge === group.age ? group.color : '#eee'}`,
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                }}>
                                    <span style={{ fontSize: '24px' }}>{group.icon}</span>
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#888' }}>{group.age}</span>
                                </div>
                                <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0 }}>{group.label}</h4>

                                {selectedAge === group.age && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '120px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '240px',
                                        background: 'white',
                                        padding: '20px',
                                        borderRadius: '20px',
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                                        border: `1px solid ${group.color}44`,
                                        textAlign: 'left',
                                        zIndex: 10
                                    }}>
                                        <h5 style={{ margin: '0 0 10px', fontSize: '14px', color: group.color }}>Key Priorities:</h5>
                                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                                            {group.details.map(d => <li key={d}>{d}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Screening Grid */}
                <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', textAlign: 'center' }}>Essential Screenings</h2>
                <p style={{ color: '#666', textAlign: 'center', marginBottom: '50px' }}>Evidence-based markers for long-term health.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '80px' }}>
                    {screenings.map((s, idx) => (
                        <div key={idx} style={{ background: 'white', padding: '32px', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div style={{ width: '50px', height: '50px', background: s.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white' }}>{s.icon}</div>
                                <span style={{ background: '#F5F5F5', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: '#777' }}>{s.badge}</span>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>{s.title}</h3>
                            <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '20px', marginBottom: '20px' }}>
                                {s.guidelines.map(g => (
                                    <div key={g.age} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ fontWeight: '700', color: '#888' }}>{g.age}:</span>
                                        <span style={{ color: '#555', textAlign: 'right' }}>{g.freq}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate(ROUTES.SCREENING)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'white',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    color: 'var(--pink)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--pink)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = 'var(--pink)';
                                }}
                            >
                                View Detailed {s.title} Guide →
                            </button>
                        </div>
                    ))}
                </div>

                {/* Vaccinations Timeline */}
                <div style={{ background: 'white', padding: '60px 40px', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>💉 Vaccination Life-Stages</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                        {[
                            { title: "General Protection", icon: "🛡️", vax: ["HPV (Up to 45)", "Flu (Annual)", "Tdap (Every 10 yrs)"] },
                            { title: "Pregnancy Essential", icon: "🤰", vax: ["Tdap (27-36 weeks)", "Flu (Safe anytime)", "COVID-19 (Safe anytime)"] },
                            { title: "Maturity Focus", icon: "🦴", vax: ["Shingles (50+)", "Pneumococcal (65+)", "Flu (High-dose)"] }
                        ].map(col => (
                            <div key={col.title}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '24px' }}>{col.icon}</span>
                                    <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{col.title}</h4>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {col.vax.map(v => (
                                        <li key={v} style={{ padding: '12px 0', borderBottom: '1px solid #F0F0F0', fontSize: '14px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: 'var(--pink)' }}>✦</span> {v}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => navigate(ROUTES.VACCINATION)}
                            style={{
                                padding: '16px 40px',
                                background: 'linear-gradient(135deg, var(--pink), #f06292)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '16px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(216, 27, 96, 0.2)'
                            }}
                        >
                            Explore Comprehensive Vaccination Guide
                        </button>
                    </div>
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

                {/* Preparation Checklist & Why Screening Matters - Moved from Screening Guide */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px' }}>
                    <div style={{
                        background: 'white',
                        padding: '32px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: '#1a1a1a' }}>
                            📋 Preparation Checklist
                        </h3>
                        <ul style={{ paddingLeft: '20px', fontSize: '15px', color: '#555', lineHeight: '2' }}>
                            <li style={{ marginBottom: '8px' }}>Track your menstrual cycle (best for Pap/Mammograms)</li>
                            <li style={{ marginBottom: '8px' }}>Gather family medical history records</li>
                            <li style={{ marginBottom: '8px' }}>List any current medications or supplements</li>
                            <li style={{ marginBottom: '8px' }}>Note any new or persistent symptoms</li>
                            <li>Prepare questions regarding risk and frequency</li>
                        </ul>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #f8f4f6 0%, #fce4ec 100%)',
                        padding: '32px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: '#1a1a1a' }}>
                            🛡️ Why Screening Matters
                        </h3>
                        <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8' }}>
                            Early detection through regular screening significantly improves treatment outcomes for conditions like cervical and breast cancer. Preventive care isn't just about finding problems—it's about the peace of mind that comes with knowing you're taking charge of your long-term wellness.
                        </p>
                    </div>
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
                        onClick={() => navigate(ROUTES.TELECONSULTATION)}
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

export default PreventiveHealthJourney;
