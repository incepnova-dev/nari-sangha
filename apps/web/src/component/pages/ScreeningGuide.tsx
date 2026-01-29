import React from "react";
import styles from "./ScreeningGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface ScreeningCard {
    title: string;
    icon: string;
    color: string;
    desc21: string;
    desc30: string;
    desc65: string;
    badge: string;
}

const SCREENINGS: ScreeningCard[] = [
    {
        title: "Cervical Cancer Screening",
        icon: "🔬",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        desc21: "Ages 21-29: Pap smear every 3 years",
        desc30: "Ages 30-65: Pap + HPV test every 5 years",
        desc65: "After 65: May stop if history is normal",
        badge: "Life-saving"
    },
    {
        title: "Breast Cancer Screening",
        icon: "🎗️",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        desc21: "Under 40: Annual clinical exams",
        desc30: "Ages 40-54: Annual mammogram suggested",
        desc65: "Ages 55+: Every 1-2 years based on risk",
        badge: "Critical After 40"
    },
    {
        title: "Bone Density (DEXA)",
        icon: "🦴",
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        desc21: "Younger: Only if risk factors exist",
        desc30: "Perimenopause: Baseline scan possible",
        desc65: "Age 65+: All women regularly",
        badge: "Osteoporosis Detection"
    },
    {
        title: "Heart Health (BP/Lipids)",
        icon: "💓",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        desc21: "All ages: BP every 2 years",
        desc30: "Lipids: Every 4-6 years starting at 20",
        desc65: "Annual monitoring of cardiovascular health",
        badge: "Essential Annual"
    }
];

const ScreeningGuide: React.FC = () => {
    return (
        <div className={styles.screeningPage}>
            <InnerPageHero
                title="Preventive Screening Guide"
                subtitle="Stay ahead with age-appropriate health screenings and early detection strategies. Targeted prevention tailored to your life stage."
                badge="Proactive Health"
                centered
            />

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.contentCard} style={{ marginTop: '-40px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2>Essential Women's Health Screenings</h2>
                            <p style={{ color: '#666' }}>Recommended preventive tests by age and specific risk factors.</p>
                        </div>

                        <div className={styles.screeningGrid}>
                            {SCREENINGS.map((s, idx) => (
                                <div key={idx} className={styles.card}>
                                    <div className={styles.iconBox} style={{ background: s.color }}>{s.icon}</div>
                                    <div className={styles.cardHeader}>
                                        <h3>{s.title}</h3>
                                        <span className={styles.badge}>{s.badge}</span>
                                    </div>
                                    <div className={styles.scheduleRow}>
                                        <div className={styles.ageLabel}>20s</div>
                                        <p>{s.desc21}</p>
                                    </div>
                                    <div className={styles.scheduleRow}>
                                        <div className={styles.ageLabel}>40s</div>
                                        <p>{s.desc30}</p>
                                    </div>
                                    <div className={styles.scheduleRow}>
                                        <div className={styles.ageLabel}>65+</div>
                                        <p>{s.desc65}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#fcf8fa' }}>
                <div className={styles.container}>
                    <div className={styles.infoSplit}>
                        <div className={styles.infoBox}>
                            <h3>📋 Preparation Checklist</h3>
                            <ul className={styles.checklist}>
                                <li>Track your menstrual cycle (best for Pap/Mammograms)</li>
                                <li>Gather family medical history records</li>
                                <li>List any current medications or supplements</li>
                                <li>Note any new or persistent symptoms</li>
                                <li>Prepare questions regarding risk and frequency</li>
                            </ul>
                        </div>
                        <div className={styles.infoBox}>
                            <h3>🛡️ Why Screening Matters</h3>
                            <p>Early detection through regular screening significantly improves treatment outcomes for conditions like cervical and breast cancer. Preventive care isn't just about finding problems—it's about the peace of mind that comes with knowing you're taking charge of your long-term wellness.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScreeningGuide;
