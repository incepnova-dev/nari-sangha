import React from "react";
import { getProperty } from "../../i18";
import LandingActions from "./LandingActions";

interface LandingContentProps {
  language: string;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const LandingContent: React.FC<LandingContentProps> = ({
  language,
  onSignInClick,
  onSignUpClick,
}) => {
  const message = getProperty("landing.welcome", language);

  return (
    <main className="main unauth-landing">
      <div className="landing-container">
        <h1 className="landing-title">
          <span className="landing-gradient">{message}</span>
        </h1>
        <p className="landing-subtitle">
          {getProperty("landing.subtitle", language)}
        </p>
        <LandingActions
          language={language}
          onSignInClick={onSignInClick}
          onSignUpClick={onSignUpClick}
        />
      </div>
    </main>
  );
};

export default LandingContent;

