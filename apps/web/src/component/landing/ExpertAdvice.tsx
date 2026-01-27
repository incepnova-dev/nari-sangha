import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const ExpertAdvice: React.FC = () => {
    const { t } = useI18n();

    return (
        <section className={styles.mission}>
            <div className={styles.missionContent} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '60px', boxShadow: 'var(--shadow-soft)' }}>
                <div className={styles.missionText}>
                    <span className={styles.chatbotTag}>GUIDANCE</span>
                    <h2>{t("expert.title")}</h2>
                    <p>{t("expert.subtitle")}</p>
                    <button className={styles.chatbotButton}>{t("hero.nav.support")}</button>
                </div>
                <div className={styles.missionCards}>
                    <div className={styles.missionCard}>
                        <h3>Verified Experts</h3>
                        <p>Consult with certified professionals across all domains.</p>
                    </div>
                    <div className={styles.missionCard}>
                        <h3>Prompt Support</h3>
                        <p>Get your queries resolved with empathy and speed.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertAdvice;
