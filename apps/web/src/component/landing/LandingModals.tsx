import React from "react";
import { createPortal } from "react-dom";
import AuthModal from "../auth/AuthModal";

interface LandingModalsProps {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  onSignInClose: () => void;
  onSignUpClose: () => void;
  onSignInSuccess: (userData: any) => void;
  onSignUpClick: () => void;
  onSignInClick: () => void;
}

const LandingModals: React.FC<LandingModalsProps> = ({
  isSignInModalOpen,
  isSignUpModalOpen,
  onSignInClose,
  onSignUpClose,
  onSignInSuccess,
}) => {
  // Determine if any modal is open and which mode to start with
  const isOpen = isSignInModalOpen || isSignUpModalOpen;
  const initialMode = isSignUpModalOpen ? 'signup' : 'signin';
  const handleClose = isSignUpModalOpen ? onSignUpClose : onSignInClose;

  return createPortal(
    <AuthModal
      isOpen={isOpen}
      onClose={handleClose}
      initialMode={initialMode}
      onSignInSuccess={onSignInSuccess}
    />,
    document.body
  );
};

export default LandingModals;



