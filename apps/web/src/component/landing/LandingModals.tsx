import React from "react";
import { createPortal } from "react-dom";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";

interface LandingModalsProps {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  language: string;
  onSignInClose: () => void;
  onSignUpClose: () => void;
  onSignInSuccess: (userData: any) => void;
}

const LandingModals: React.FC<LandingModalsProps> = ({
  isSignInModalOpen,
  isSignUpModalOpen,
  language,
  onSignInClose,
  onSignUpClose,
  onSignInSuccess,
}) => {
  return createPortal(
    <>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={onSignInClose}
        language={language}
        onSignInSuccess={onSignInSuccess}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={onSignUpClose}
        language={language}
      />
    </>,
    document.body
  );
};

export default LandingModals;

