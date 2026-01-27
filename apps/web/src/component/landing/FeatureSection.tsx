import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const FeatureSection: React.FC = () => {
  const { t } = useI18n();
  const features = [
    {
      title: t("feature1.title"),
      tag: t("feature1.tag"),
      desc: t("feature1.body"),
      cta: t("feature1.cta"),
    },
    {
      title: t("feature2.title"),
      tag: t("feature2.tag"),
      desc: t("feature2.body"),
      cta: t("feature2.cta"),
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.featureCard}>
            <div className={styles.featureMock} aria-hidden />
            <div className={styles.featureBody}>
              <span className={styles.featureTag}>{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <button className={styles.secondaryCta}>{feature.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
