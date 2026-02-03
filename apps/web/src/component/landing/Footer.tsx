import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import logo from "../../assets/logo.svg";
import { useI18n } from "../../hooks/useI18n";
import { LanguageMeta } from "../../i18n/languages";

const Footer: React.FC = () => {
  const { t, language, setLanguage, languages } = useI18n();

  const exploreLinks = [
    { label: t("hero.nav.home"), path: ROUTES.LANDING },
    { label: "Journeys", path: ROUTES.JOURNEYS },
    { label: "Products", path: ROUTES.PRODUCTS },
    { label: "Gov. Schemes", path: ROUTES.GOVERNMENT_SCHEMES },
    // { label: t("hero.nav.knowledge"), path: ROUTES.STORIES },
    { label: t("hero.nav.track"), path: ROUTES.SYMPTOM_CHECKER }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📷", href: "#!" },
    { name: "LinkedIn", icon: "💼", href: "#!" },
    { name: "YouTube", icon: "▶️", href: "#!" },
    { name: "X", icon: "✕", href: "#!" }
  ];

  const legalLinks = [
    { label: t("footer.legal.privacy"), href: "#!" },
    { label: t("footer.legal.terms"), href: "#!" },
    { label: t("footer.legal.cookies"), href: "#!" },
    { label: t("footer.legal.accessibility"), href: "#!" }
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Content */}
      <div className={styles.footerContent}>
        {/* Column 1: Brand / Vision */}
        <div className={styles.brandColumn}>
          <div className={styles.brandWrapper}>
            <img src={logo} alt="Nari Sangha Logo" className={styles.logo} />
            <span className={styles.brandText}>{t("hero.brand")}</span>
          </div>
          <p className={styles.mission}>
            {t("footer.brand") || "Empowering women's health journeys with personalized care and expert guidance."}
          </p>
        </div>

        {/* Column 2: Explore */}
        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>Explore</h4>
          <nav>
            <ul className={styles.linksList}>
              {exploreLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 3: Community */}
        <div className={styles.socialColumn}>
          <h4 className={styles.columnTitle}>Community</h4>
          <div className={styles.socialIcons}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={styles.socialIcon}
                aria-label={social.name}
                title={social.name}
              >
                <span className={styles.iconSymbol}>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Preferences */}
        <div className={styles.preferencesColumn}>
          <h4 className={styles.columnTitle}>Preferences</h4>
          <div className={styles.preferences}>
            <div className={styles.preference}>
              <label htmlFor="language-select" className={styles.preferenceLabel}>
                Language
              </label>
              <select
                id="language-select"
                className={styles.languageSelect}
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
            <div className={styles.preference}>
              <span className={styles.preferenceLabel}>Theme</span>
              <span className={styles.preferenceValue}>Auto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className={styles.divider}></div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <nav className={styles.legalLinks}>
          {legalLinks.map((link, idx) => (
            <a key={idx} href={link.href} className={styles.legalLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Nari Sangha. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
