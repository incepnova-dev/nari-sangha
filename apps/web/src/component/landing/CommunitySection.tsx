import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const CommunitySection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.community}>
      <div className={styles.communityCard}>
        <div className={styles.communityImage} aria-hidden />
        <div className={styles.communityContent}>
          <h3>{t("community.title")}</h3>
          <p>{t("community.body")}</p>
          <button className={styles.primaryCta}>{t("community.cta")}</button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
