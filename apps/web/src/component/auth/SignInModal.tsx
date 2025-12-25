import React, { useState, FormEvent, ChangeEvent } from "react";
import "styles/auth";
import { getProperty } from "../../i18";
import loginImage from "../../assets/login.png";
import { signIn } from "../../services";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onSignInSuccess?: (data: any) => void;
}

interface SignInForm {
  email: string;
  password: string;
}

const SignInModal: React.FC<SignInModalProps> = ({ 
  isOpen, 
  onClose, 
  language = "en", 
  onSignInSuccess 
}) => {
  const [signInForm, setSignInForm] = useState<SignInForm>({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignInChange = (field: keyof SignInForm) => (e: ChangeEvent<HTMLInputElement>) => {
    setSignInForm({ ...signInForm, [field]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn({
        email: signInForm.email.trim(),
        password: signInForm.password
      });

      if (result.success) {
        // Store token if provided
        if (result.data?.token) {
          localStorage.setItem('authToken', result.data.token);
        }
        if (result.data?.refreshToken) {
          localStorage.setItem('refreshToken', result.data.refreshToken);
        }

        // Reset form
        setSignInForm({ email: "", password: "" });
        // Call success callback if provided
        // If callback is provided, let the parent handle closing the modal
        // Otherwise, close it here
        if (onSignInSuccess) {
          onSignInSuccess(result.data);
          // Don't call onClose() here - let the parent component handle it
        } else {
          onClose();
        }
      } else {
        setError(result.error || "Sign in failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError("");
      setSignInForm({ email: "", password: "" });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="wp-modal-backdrop" onClick={handleClose}>
      <div className="wp-modal signup-modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="wp-modal-close" 
          onClick={handleClose}
          disabled={isLoading}
        >
          ✕
        </button>

        <div className="signup-modal-content">
          {/* Image Section - Left Half */}
          <div className="signup-modal-image-section">
            <div className="signup-modal-image-container">
              <img 
                src={loginImage} 
                alt="Women's Health" 
                className="signup-modal-image-preview" 
              />
            </div>
          </div>

          {/* Form Section - Right Half */}
          <div className="signup-modal-form-section">
            <h2 className="wp-modal-title signup-modal-title">
              {getProperty("signin.title", language)}
            </h2>

            {error && (
              <div className="signup-modal-error signup-modal-error-inline">
                {error}
              </div>
            )}

            <form onSubmit={handleSignInSubmit} className="signup-modal-form">
              <div className="field signup-modal-field">
                <label className="signup-modal-label">{getProperty("signin.email.label", language)}</label>
                <input
                  type="email"
                  value={signInForm.email}
                  onChange={handleSignInChange("email")}
                  placeholder={getProperty("signin.email.placeholder", language)}
                  required
                  disabled={isLoading}
                  className="signup-modal-input"
                />
              </div>

              <div className="field signup-modal-field">
                <label className="signup-modal-label">{getProperty("signin.password.label", language)}</label>
                <input
                  type="password"
                  value={signInForm.password}
                  onChange={handleSignInChange("password")}
                  placeholder={getProperty("signin.password.placeholder", language)}
                  required
                  disabled={isLoading}
                  className="signup-modal-input"
                />
              </div>

              <div className="signup-modal-button-container">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="btn secondary small signup-modal-button-cancel"
                >
                  {getProperty("signin.button.cancel", language)}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn primary small signup-modal-button-submit"
                >
                  {isLoading ? (
                    <span className="signup-modal-loading-container">
                      <span className="signup-modal-spinner"></span>
                      {getProperty("signin.button.submitting", language) || "Signing in..."}
                    </span>
                  ) : (
                    getProperty("signin.button.submit", language)
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;

