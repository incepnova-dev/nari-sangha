import React from "react";
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import logo from "../../assets/logo.svg";
import { useI18n } from "../../hooks/useI18n";
import { LanguageMeta } from "../../i18n/languages";

const Footer: React.FC = () => {
  const { t, language, setLanguage, languages } = useI18n();
  const socialLinks = ["Instagram", "LinkedIn", "YouTube", "X"];
  const legalKeys = [
    "footer.legal.privacy",
    "footer.legal.terms",
    "footer.legal.cookies",
    "footer.legal.accessibility",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <div className={styles.brandWrapper}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <span className={styles.brandText}>{t("hero.brand")}</span>
          </div>
          <p style={{ marginTop: '12px' }}>{t("footer.brand")}</p>
        </div>
        <div className={styles.footerColumns}>
          <div>
            <h4>{t("footer.sitemap")}</h4>
            <ul>
              <li><Link to={ROUTES.LANDING}>{t("hero.nav.home")}</Link></li>
              <li><Link to={ROUTES.HEALTH_HUB}>{t("hero.nav.products")}</Link></li>
              <li><Link to={ROUTES.STORIES}>{t("hero.nav.knowledge")}</Link></li>
              <li><Link to={ROUTES.APPOINTMENTS}>{t("hero.nav.track")}</Link></li>
              <li><Link to={ROUTES.COMMUNITY}>{t("hero.nav.about")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("footer.social")}</h4>
            <ul>
              {socialLinks.map((item) => (
                <li key={item}>
                  <a href="#!">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t("footer.language")}</h4>
            <select
              className={styles.languageSelect}
              aria-label={t("footer.language")}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((opt: LanguageMeta) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.legal}>
          {legalKeys.map((key) => (
            <a key={key} href="#!">
              {t(key)}
            </a>
          ))}
        </div>
        <div className={styles.copy}>{t("footer.copy", { year: new Date().getFullYear() })}</div>
      </div>
    </footer>
  );
};

export default Footer;
