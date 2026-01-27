import React from "react";
import styles from "./landing.module.css";
import logo from "../../assets/logo.svg";
import { useI18n } from "../../hooks/useI18n";
import ModernLanguageSelector from "../header/ModernLanguageSelector";

import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useCart } from "../../context/CartContext";

interface NavbarProps {
  onSignInClick: () => void;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSignInClick, isAuthenticated }) => {
  const { t, language, setLanguage, languages } = useI18n();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const menuItems = [
    { key: "hero.nav.home", path: ROUTES.LANDING },
    { key: "hero.nav.journeys", path: ROUTES.JOURNEYS },
    { key: "hero.nav.products", path: ROUTES.PRODUCTS },
    { key: "hero.nav.consult", path: ROUTES.APPOINTMENTS },
    { key: "hero.nav.community", path: ROUTES.COMMUNITY },
    { key: "hero.nav.symptoms", path: ROUTES.SYMPTOM_CHECKER },
  ];

  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link to={ROUTES.LANDING} className={styles.brandWrapper}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <span className={styles.brandText}>{t("hero.brand")}</span>
          </Link>
        </div>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`${styles.menuItem} ${(item.path === ROUTES.LANDING && location.pathname === ROUTES.LANDING) ||
                (item.path !== ROUTES.LANDING && location.pathname.startsWith(item.path))
                ? styles.active
                : ''
                } ${item.path === ROUTES.JOURNEYS ? styles.hoverJourneys :
                  item.path === ROUTES.PRODUCTS ? styles.hoverProducts :
                    item.path === ROUTES.APPOINTMENTS ? styles.hoverConsult :
                      item.path === ROUTES.COMMUNITY ? styles.hoverCommunity :
                        item.path === ROUTES.SYMPTOM_CHECKER ? styles.hoverSymptoms : ''
                }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className={styles.navRight}>
          <button
            className={styles.cartTrigger}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open cart with ${cartCount} items`}
          >
            <span>🛒</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          <ModernLanguageSelector
            language={language}
            setLanguage={setLanguage}
            languages={languages}
            variant="light"
          />
          {!isAuthenticated && (
            <button className={styles.signInButton} onClick={onSignInClick}>
              {t("hero.nav.signIn")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
