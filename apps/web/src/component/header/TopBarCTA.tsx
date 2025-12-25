import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import SignUpModal from "../auth/SignUpModal";
import SignInModal from "../auth/SignInModal";
import { getProperty } from "../../i18";

interface TopBarCTAProps {
  language?: string;
  currentUser: any;
  onSignInSuccess?: (data: any) => void;
}

const TopBarCTA: React.FC<TopBarCTAProps> = ({
  language = "en",
  currentUser,
  onSignInSuccess,
}) => {
  const navigate = useNavigate();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

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

  const handleLogoutClick = () => {
    // Navigate to /logout route which will handle cleanup and redirect
    navigate("/logout");
  };

  return (
    <>
      <div className="top-bar-cta">
        {/* <div className="pill-tag"> Agentic setup · Discord · Facebook · In-app </div> */}
        {currentUser ? (
          <button
            className="btn secondary"
            onClick={handleLogoutClick}
          >
            {getProperty("button.logout", language)}
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
      {!currentUser && createPortal(
        <>
          <SignInModal
            isOpen={isSignInModalOpen}
            onClose={handleCloseSignInModal}
            language={language}
            onSignInSuccess={onSignInSuccess}
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

export default TopBarCTA;

