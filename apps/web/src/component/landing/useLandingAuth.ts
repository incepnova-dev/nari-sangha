import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

interface UseLandingAuthProps {
  onSignInSuccess?: (data: any) => void;
}

export const useLandingAuth = ({ onSignInSuccess }: UseLandingAuthProps) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const isSigningInRef = useRef<boolean>(false);

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
      console.log("[Landing] handleSignInSuccess called with:", userData);

      // Prevent multiple calls
      if (isSigningInRef.current) {
        console.log(
          "[Landing] Already processing sign-in, ignoring duplicate call"
        );
        return;
      }
      isSigningInRef.current = true;

      // Verify token is stored before proceeding
      const checkTokenAndProceed = () => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) {
          console.warn("[Landing] Token not found in storage, retrying...");
          // Wait a bit more and check again
          setTimeout(() => {
            const retryToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (retryToken) {
              proceedWithSignIn(userData);
            } else {
              console.error("[Landing] Token still not found after retry");
              isSigningInRef.current = false;
            }
          }, 100);
          return;
        }
        proceedWithSignIn(userData);
      };

      const proceedWithSignIn = (userData: any) => {
        console.log("[Landing] Proceeding with sign-in...");
        
        // Use flushSync to ensure the state update happens synchronously
        // This forces React to process the state update immediately
        flushSync(() => {
          // Update current user state
          setCurrentUser(userData);

          if (onSignInSuccess) {
            console.log(
              "[Landing] onSignInSuccess exists, calling it with:",
              userData
            );
            onSignInSuccess(userData);
            console.log("[Landing] onSignInSuccess called");
          } else {
            console.warn("[Landing] onSignInSuccess is not provided!");
          }
        });

        console.log("[Landing] Closing modal...");
        // Close the modal after state update is processed
        setIsSignInModalOpen(false);

        // Always navigate to home after successful sign-in
        // Use a delay to ensure token is stored in localStorage and state is updated
        // The token should already be stored by SignInModal before calling this callback
        setTimeout(() => {
          const verifyToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
          console.log("[Landing] Verifying token before navigation:", verifyToken ? "Found" : "Not found");
          if (verifyToken) {
            console.log("[Landing] Token verified, navigating to /home");
            navigate("/home", { replace: true });
          } else {
            console.error("[Landing] Token not found before navigation, retrying in 100ms");
            // Retry once more
            setTimeout(() => {
              const retryToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
              if (retryToken) {
                console.log("[Landing] Token found on retry, navigating to /home");
                navigate("/home", { replace: true });
              } else {
                console.error("[Landing] Token still not found, aborting navigation");
                isSigningInRef.current = false;
              }
            }, 100);
          }
        }, 250);

        // Reset the ref after a brief delay
        setTimeout(() => {
          isSigningInRef.current = false;
          console.log("[Landing] Reset sign-in ref");
        }, 500);
      };

      checkTokenAndProceed();
    },
    [onSignInSuccess, navigate, setCurrentUser]
  );

  return {
    currentUser,
    setCurrentUser,
    isSignUpModalOpen,
    isSignInModalOpen,
    handleSignUpClick,
    handleSignInClick,
    handleCloseSignUpModal,
    handleSignInModalClose,
    handleSignInSuccess,
  };
};

