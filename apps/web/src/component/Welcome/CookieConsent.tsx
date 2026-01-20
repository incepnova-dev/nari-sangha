import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieOverlay}>
      <div className={styles.cookieBanner}>
        <div className={styles.cookieContent}>
          <div className={styles.cookieIcon}>🍪</div>
          <div className={styles.cookieText}>
            <h3 className={styles.cookieTitle}>We value your privacy</h3>
            <p className={styles.cookieDescription}>
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
        </div>
        <div className={styles.cookieActions}>
          <button
            className={styles.cookieButtonSecondary}
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            className={styles.cookieButtonPrimary}
            onClick={handleAccept}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

