import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../landing/landing.module.css";
import intStyles from "../../styles/common/StaticIntegration.module.css";
import { ROUTES } from "../routes/Routes";
import InnerPageHero from "../shared/InnerPageHero";

interface Vaccine {
    name: string;
    icon: string;
    who: string;
    when?: string;
    why: string;
    badge: string;
    badgeType: 'success' | 'info' | 'warning';
}

interface TimelineItem {
    title: string;
    icon: string;
    points: string[];
    warning?: string;
}

const Vaccination: React.FC = () => {
    const navigate = useNavigate();

    const vaccines: Vaccine[] = [
        {
            name: "HPV",
            icon: "🦠",
            who: "Typically 9–26 years (catch-up to 45)",
            why: "Reduces risk of cervical cancer significantly",
            badge: "High Impact",
            badgeType: "success"
        },
        {
            name: "Influenza (Flu)",
            icon: "🫁",
            who: "All adults",
            when: "Yearly (seasonal)",
            why: "Prevents flu complications, especially during pregnancy",
            badge: "Annual",
            badgeType: "info"
        },
        {
            name: "Tdap (Pregnancy)",
            icon: "👶",
            who: "Pregnant women",
            when: "27–36 weeks (each pregnancy)",
            why: "Protects baby from whooping cough (pertussis)",
            badge: "Pregnancy Essential",
            badgeType: "warning"
        },
        {
            name: "COVID-19",
            icon: "🦠",
            who: "All adults",
            when: "Per latest recommendations",
            why: "Reduces severe illness and complications",
            badge: "Boosters Available",
            badgeType: "warning"
        },
        {
            name: "MMR (Measles, Mumps, Rubella)",
            icon: "💉",
            who: "Non-immune adults",
            when: "Before pregnancy if not immune",
            why: "Prevents birth defects from rubella infection",
            badge: "Pre-conception",
            badgeType: "info"
        },
        {
            name: "Varicella (Chickenpox)",
            icon: "🌡️",
            who: "Non-immune adults",
            when: "Before pregnancy if not immune",
            why: "Prevents congenital varicella syndrome",
            badge: "Pre-conception",
            badgeType: "info"
        }
    ];

    const pregnancyTimeline: TimelineItem[] = [
        {
            title: "Before Pregnancy",
            icon: "📋",
            points: [
                "Confirm immunity: MMR, Varicella (if missing, vaccinate before conception)",
                "Consider HPV vaccine if eligible and not completed",
                "Review vaccination history with your provider",
                "Allow 4 weeks after live vaccines before conception"
            ]
        },
        {
            title: "During Pregnancy",
            icon: "🤰",
            points: [
                "Flu vaccine: Any trimester (seasonal availability)",
                "Tdap: 27–36 weeks gestation",
                "COVID-19: Per current recommendations"
            ],
            warning: "Live vaccines (MMR, Varicella) are NOT given during pregnancy."
        },
        {
            title: "Postpartum",
            icon: "💗",
            points: [
                "Catch-up on missed vaccines (MMR, Varicella if not immune)",
                "Continue flu and COVID boosters as recommended",
                "Safe while breastfeeding - consult your clinician"
            ]
        }
    ];

    const quickTips = [
        {
            icon: "📄",
            title: "What to Bring",
            content: "Past vaccine records, pregnancy card, current medications list"
        },
        {
            icon: "💊",
            title: "Common Mild Effects",
            content: "Arm soreness, fatigue, mild fever — typically 1–2 days"
        },
        {
            icon: "📍",
            title: "Where to Get Vaccinated",
            content: "Clinic, hospital, pharmacy, community vaccination drives"
        }
    ];

    const getBadgeStyle = (type: string) => {
        switch (type) {
            case 'success':
                return { background: 'var(--accent-light-green)', color: 'var(--accent-green)' };
            case 'info':
                return { background: 'var(--accent-light-blue)', color: '#1565C0' };
            case 'warning':
                return { background: 'var(--accent-light-orange)', color: 'var(--accent-orange)' };
            default:
                return { background: 'var(--pink-soft)', color: 'var(--pink-primary)' };
        }
    };

    return (
        <div className="app-container theme-blue">
            <InnerPageHero
                title="Vaccination Guide"
                subtitle="Stay protected with recommended vaccines for women through all life stages — including pregnancy and postpartum."
                badge="Prevention"
            />

            {/* Back Navigation */}
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
                        e.currentTarget.style.color = "var(--pink-primary)";
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

                {/* Action Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(240,147,251,0.1))',
                    border: '1px solid rgba(102,126,234,0.2)',
                    borderRadius: '20px',
                    padding: '24px',
                    marginBottom: '40px'
                }}>
                    <h2 style={{ margin: '0 0 8px', fontSize: '20px', color: 'var(--text-primary)' }}>
                        🔔 Make it actionable
                    </h2>
                    <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>
                        Track your vaccination schedule, set reminders, and stay on top of your immunization calendar.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate(ROUTES.APPOINTMENTS)}
                            className={styles.primaryCta}
                            style={{ padding: '12px 20px', fontSize: '14px' }}
                        >
                            Schedule Vaccination
                        </button>
                    </div>
                </div>

                {/* Recommended Vaccines */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Recommended Vaccines</h2>
                    <p className={intStyles.sectionSubtitle}>Use this as guidance; always confirm with your clinician for your personal history.</p>
                </section>

                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {vaccines.map((vaccine, idx) => (
                        <div key={idx} className={intStyles.methodCard}>
                            <div className={intStyles.methodIcon}>{vaccine.icon}</div>
                            <h3>{vaccine.name}</h3>
                            <span style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                fontWeight: '700',
                                marginBottom: '12px',
                                ...getBadgeStyle(vaccine.badgeType)
                            }}>
                                {vaccine.badge}
                            </span>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                <p style={{ margin: '0 0 8px' }}><strong>Who:</strong> {vaccine.who}</p>
                                {vaccine.when && <p style={{ margin: '0 0 8px' }}><strong>When:</strong> {vaccine.when}</p>}
                                <p style={{ margin: 0 }}><strong>Why:</strong> {vaccine.why}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pregnancy Timeline */}
                <section className={intStyles.sectionHeader} style={{ marginBottom: '30px' }}>
                    <h2 className={intStyles.sectionTitle}>Pregnancy Vaccination Timeline</h2>
                    <p className={intStyles.sectionSubtitle}>Clear trimester-based guidance with safe/unsafe notes.</p>
                </section>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    marginBottom: '60px'
                }}>
                    {pregnancyTimeline.map((item, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            borderLeft: '4px solid var(--pink-primary)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '32px' }}>{item.icon}</span>
                                <h4 style={{ fontSize: '18px', margin: 0, color: 'var(--text-primary)' }}>{item.title}</h4>
                            </div>
                            <ul style={{ margin: '0 0 16px', paddingLeft: '20px' }}>
                                {item.points.map((point, i) => (
                                    <li key={i} style={{
                                        marginBottom: '10px',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            {item.warning && (
                                <div style={{
                                    background: '#FFF3E0',
                                    border: '1px solid #FFB74D',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    fontSize: '13px',
                                    color: '#E65100',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span>⚠️</span>
                                    {item.warning}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quick Tips */}
                <div className={intStyles.methodsGrid} style={{ marginBottom: '60px' }}>
                    {quickTips.map((tip, idx) => (
                        <div key={idx} style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '20px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-light)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '24px' }}>{tip.icon}</span>
                                <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>{tip.title}</h4>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {tip.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className={intStyles.ctaSection}>
                    <h3>Ready to schedule your vaccinations?</h3>
                    <p>Connect with healthcare providers for personalized vaccination guidance.</p>
                    <button
                        onClick={() => navigate(ROUTES.APPOINTMENTS)}
                        className={styles.primaryCta}
                        style={{ padding: '14px 28px', fontSize: '15px' }}
                    >
                        Book Appointment
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Vaccination;
