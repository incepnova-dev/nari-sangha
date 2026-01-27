import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useAuth } from "../../context/AuthContext";

interface UseLandingAuthProps {
  onSignInSuccess?: (data: any) => void;
}

export const useLandingAuth = ({ onSignInSuccess }: UseLandingAuthProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

