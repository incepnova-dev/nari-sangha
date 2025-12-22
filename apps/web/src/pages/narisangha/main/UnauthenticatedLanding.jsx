import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getProperty } from "../../../languages";
import SignUpModal from "../../auth/SignUpModal";
import SignInModal from "../../auth/SignInModal";
import "../../../styles/narisangha/UnauthenticatedLanding.css";

const UnauthenticatedLanding = ({ language = "en", onSignInSuccess }) => {
  const message = getProperty("landing.welcome", language);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    if (isSignUpModalOpen || isSignInModalOpen) {
      document.body.classList.add("signup-modal-open");
    } else {
      document.body.classList.remove("signup-modal-open");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("signup-modal-open");
    };
  }, [isSignUpModalOpen, isSignInModalOpen]);

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignInSuccess = (userData) => {
    setIsSignInModalOpen(false);
    if (onSignInSuccess) {
      onSignInSuccess(userData);
    }
  };

  return (
    <>
      <main className="main unauth-landing">
        <div className="landing-container">
          <h1 className="landing-title">
            <span className="landing-gradient">{message}</span>
          </h1>
          <p className="landing-subtitle">
            {getProperty("landing.subtitle", language)}
          </p>
          <div className="landing-actions">
            <span className="landing-explore-text">
              {getProperty("landing.explore", language)}
            </span>
            <div className="landing-buttons">
              <button
                className="btn secondary"
                onClick={handleSignInClick}
              >
                {getProperty("button.signin", language)}
              </button>
              <button
                className="btn primary"
                onClick={handleSignUpClick}
              >
                {getProperty("button.signup", language)}
              </button>
            </div>
          </div>
        </div>
      </main>
      {createPortal(
        <>
          <SignInModal
            isOpen={isSignInModalOpen}
            onClose={handleCloseSignInModal}
            language={language}
            onSignInSuccess={handleSignInSuccess}
          />
          <SignUpModal
            isOpen={isSignUpModalOpen}
            onClose={handleCloseSignUpModal}
            language={language}
          />
        </>,
        document.body
      )}
    </>
  );
};

export default UnauthenticatedLanding;


