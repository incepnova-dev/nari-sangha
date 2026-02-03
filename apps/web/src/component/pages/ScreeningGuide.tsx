import React from "react";
import styles from "./ScreeningGuide.module.css";
import InnerPageHero from "../shared/InnerPageHero";
import ScreeningExplorer from "../shared/ScreeningExplorer";


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
                            <h2>Personalized Screening Roadmap</h2>
                            <p style={{ color: '#666' }}>Select your life stage to see essential preventive checkups.</p>
                        </div>

                        <ScreeningExplorer />
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
