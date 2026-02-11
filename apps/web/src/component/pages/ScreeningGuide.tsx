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


        </div>
    );
};

export default ScreeningGuide;
