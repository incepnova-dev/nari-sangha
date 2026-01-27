import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const MissionSection: React.FC = () => {
  const { t } = useI18n();
  const cards = [
    { title: t("feature1.title"), text: t("feature1.body"), tag: t("feature1.tag") },
    { title: t("feature2.title"), text: t("feature2.body"), tag: t("feature2.tag") },
    { title: t("events.title"), text: t("events.body"), tag: t("hero.nav.events") },
  ];

  return (
    <section className={styles.mission}>
      <div className={styles.missionContent}>
        <div className={styles.missionText}>
          <h2>{t("mission.title")}</h2>
          <p>{t("mission.body")}</p>
          <button className={styles.primaryCta}>{t("mission.cta")}</button>
        </div>
        <div className={styles.missionCards}>
          {cards.map((card, idx) => (
            <div key={idx} className={styles.missionCard}>
              <span className={styles.missionTag}>{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
