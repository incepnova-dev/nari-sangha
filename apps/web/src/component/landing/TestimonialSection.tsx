import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const TestimonialSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.testimonial}>
      <div className={styles.testimonialQuote}>{t("testimonial.quote")}</div>
      <div className={styles.testimonialMeta}>
        <div className={styles.testimonialAvatar} aria-hidden />
        <div>
          <div className={styles.testimonialName}>{t("testimonial.name")}</div>
          <div className={styles.testimonialRole}>{t("testimonial.role")}</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
