import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const EventsSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.events}>
      <div className={styles.eventsImage} aria-hidden />
      <div className={styles.eventsContent}>
        <h3>{t("events.title")}</h3>
        <p>{t("events.body")}</p>
        <button className={styles.primaryCta}>{t("events.cta")}</button>
      </div>
    </section>
  );
};

export default EventsSection;
