import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";

const AppDownloadSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className={styles.appDownload}>
      <div className={styles.appDownloadContent}>
        <h3>{t("app.title")}</h3>
        <p>{t("app.body")}</p>
        <div className={styles.appButtons}>
          <button className={styles.secondaryCta}>{t("app.ios")}</button>
          <button className={styles.secondaryCta}>{t("app.android")}</button>
        </div>
      </div>
      <div className={styles.appDownloadVisuals}>
        <div className={styles.qrMock} aria-label="QR code placeholder" />
        <div className={styles.phoneMock} aria-hidden />
        <div className={styles.phoneMockAlt} aria-hidden />
      </div>
    </section>
  );
};

export default AppDownloadSection;
