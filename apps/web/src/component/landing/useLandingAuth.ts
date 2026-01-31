import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../routes/Routes";
// import { useAuth } from "../../context/AuthContext";

interface UseLandingAuthProps {
  onSignInSuccess?: (data: any) => void;
}

export const useLandingAuth = ({ onSignInSuccess }: UseLandingAuthProps) => {
  // const navigate = useNavigate(); // Unused
  // const { isAuthenticated } = useAuth(); // Unused
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSignUpModalOpen || isSignInModalOpen) {
      document.body.classList.add("signup-modal-open");
    } else {
      document.body.classList.remove("signup-modal-open");
    }
    return () => {
      document.body.classList.remove("signup-modal-open");
    };
  }, [isSignUpModalOpen, isSignInModalOpen]);

  // Removed automatic redirect to keep users on the current page after login.
  // If redirect is needed, it should be done on login success action, not strictly on state.

  const handleSignUpClick = useCallback(() => {
    setIsSignUpModalOpen(true);
  }, []);

  const handleSignInClick = useCallback(() => {
    setIsSignInModalOpen(true);
  }, []);

  const handleCloseSignUpModal = useCallback(() => {
    setIsSignUpModalOpen(false);
  }, []);

  const handleSignInModalClose = useCallback(() => {
    setIsSignInModalOpen(false);
  }, []);

  const handleSignInSuccess = useCallback(
    (userData: any) => {
      if (onSignInSuccess) {
        onSignInSuccess(userData);
      }
      setIsSignInModalOpen(false);
      window.location.reload(); // Refresh to ensure clean state
    },
    [onSignInSuccess]
  );

  return {
    isSignUpModalOpen,
    isSignInModalOpen,
    handleSignUpClick,
    handleSignInClick,
    handleCloseSignUpModal,
    handleSignInModalClose,
    handleSignInSuccess,
  };
};

