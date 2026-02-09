import React, { useState, useRef, useEffect } from "react";
import styles from "./landing.module.css";
import logo from "../../assets/logo.svg";
import { useI18n } from "../../hooks/useI18n";
import ModernLanguageSelector from "../header/ModernLanguageSelector";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onSignInClick: () => void;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSignInClick, isAuthenticated }) => {
  const { t, language, setLanguage, languages } = useI18n();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  // const navigate = useNavigate(); // Unused since we use window.location
  const { signOut } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    // Instant Sign Out: Clear local state immediately without waiting for server
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('authToken');

    // Fire and forget server signout (browser may cancel it on reload, which is fine)
    signOut();

    setIsProfileOpen(false);
    window.location.href = ROUTES.LANDING; // Force full reload/navigation
  };

  const menuItems = [
    { key: "hero.nav.home", path: ROUTES.LANDING },
    { key: "hero.nav.journeys", path: ROUTES.JOURNEYS },
    { key: "hero.nav.products", path: ROUTES.PRODUCTS },
    { key: "hero.nav.consult", path: ROUTES.APPOINTMENTS },
    { key: "hero.nav.symptoms", path: ROUTES.SYMPTOM_CHECKER },
    { key: "hero.nav.about", path: ROUTES.ABOUT },
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
                      item.path === ROUTES.SYMPTOM_CHECKER ? styles.hoverSymptoms : ''
                }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className={styles.navRight}>
          {/* Cart icon only visible on Products page */}
          {location.pathname === ROUTES.PRODUCTS && (
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
          )}
          <ModernLanguageSelector
            language={language}
            setLanguage={setLanguage}
            languages={languages}
            variant="light"
          />
          {isAuthenticated ? (
            /* Profile Dropdown */
            <div className={styles.profileWrapper} ref={profileRef}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile Menu"
              >
                <img
                  src="https://ui-avatars.com/api/?name=User&background=E30B5D&color=fff&size=36"
                  alt="Profile"
                  className={styles.profileImage}
                />
              </button>

              {isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <Link
                    to={ROUTES.DASHBOARD || "/dashboard"}
                    className={styles.dropdownItem}
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <span>👤</span> Profile Dashboard
                  </Link>
                  <button
                    className={`${styles.dropdownItem} ${styles.dropdownSignOut}`}
                    onClick={handleSignOut}
                  >
                    <span>🔒</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Sign In Button - Only visible when NOT authenticated */
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
