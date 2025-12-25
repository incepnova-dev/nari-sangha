import React from "react";
import { getProperty } from "../../i18";

interface LandingActionsProps {
  language: string;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const LandingActions: React.FC<LandingActionsProps> = ({
  language,
  onSignInClick,
  onSignUpClick,
}) => {
  return (
    <div className="landing-actions">
      <span className="landing-explore-text">
        {getProperty("landing.explore", language)}
      </span>
      <div className="landing-buttons">
        <button
          className="btn secondary"
          onClick={onSignInClick}
        >
          {getProperty("button.signin", language)}
        </button>
        <button
          className="btn primary"
          onClick={onSignUpClick}
        >
          {getProperty("button.signup", language)}
        </button>
      </div>
    </div>
  );
};

export default LandingActions;

