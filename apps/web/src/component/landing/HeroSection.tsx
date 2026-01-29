import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

import heroImg from "../../assets/hero_premium.png";

interface HeroSectionProps {
  onSignInClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSignInClick }) => {
  const { t } = useI18n();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroTag}>{t("hero.tagline")}</div>
        <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
        <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
        <div className={styles.heroActions}>
          <button className={styles.primaryCta} onClick={onSignInClick}>{t("hero.cta.primary")}</button>
          <button className={styles.secondaryCta}>{t("hero.cta.secondary")}</button>
        </div>
      </div>
      <div className={styles.heroMedia}>
        <img src={heroImg} alt="Nari Sangha Community" className={styles.heroImage} />
      </div>
    </section>
  );
};

export default HeroSection;
