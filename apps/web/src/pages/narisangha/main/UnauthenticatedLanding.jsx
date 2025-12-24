import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal, flushSync } from "react-dom";
import { getProperty } from "../../../i18";
import SignUpModal from "../../auth/SignUpModal";
import SignInModal from "../../auth/SignInModal";
import "styles/narisangha";

const UnauthenticatedLanding = ({ language = "en", onSignInSuccess }) => {
  const message = getProperty("landing.welcome", language);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const isSigningInRef = useRef(false);

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

  const handleSignInSuccess = useCallback((userData) => {
    console.log('[UnauthenticatedLanding] handleSignInSuccess called with:', userData);
    
    // Prevent multiple calls
    if (isSigningInRef.current) {
      console.log('[UnauthenticatedLanding] Already processing sign-in, ignoring duplicate call');
      return;
    }
    isSigningInRef.current = true;
    
    console.log('[UnauthenticatedLanding] Calling onSignInSuccess callback...');
    // Use flushSync to ensure the state update happens synchronously
    // This forces React to process the state update immediately
    flushSync(() => {
      if (onSignInSuccess) {
        console.log('[UnauthenticatedLanding] onSignInSuccess exists, calling it with:', userData);
        onSignInSuccess(userData);
        console.log('[UnauthenticatedLanding] onSignInSuccess called');
      } else {
        console.warn('[UnauthenticatedLanding] onSignInSuccess is not provided!');
      }
    });
    
    console.log('[UnauthenticatedLanding] Closing modal...');
    // Close the modal after state update is processed
    setIsSignInModalOpen(false);
    
    // Reset the ref after a brief delay
    setTimeout(() => {
      isSigningInRef.current = false;
      console.log('[UnauthenticatedLanding] Reset sign-in ref');
    }, 100);
  }, [onSignInSuccess]);
  
  const handleSignInModalClose = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);

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
            onClose={handleSignInModalClose}
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


