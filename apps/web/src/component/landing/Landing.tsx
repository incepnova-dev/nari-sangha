import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import LandingContent from "./LandingContent";
import LandingModals from "./LandingModals";
import { useLandingAuth } from "./useLandingAuth";
import "styles/narisangha";

interface LandingProps {
  language?: string;
  onSignInSuccess?: (data: any) => void;
}

const Landing: React.FC<LandingProps> = ({
  language: initialLanguage = "en",
  onSignInSuccess,
}) => {
  const [language, setLanguage] = useState<string>(initialLanguage);

  const {
    currentUser,
    setCurrentUser,
    isSignUpModalOpen,
    isSignInModalOpen,
    handleSignUpClick,
    handleSignInClick,
    handleCloseSignUpModal,
    handleSignInModalClose,
    handleSignInSuccess,
  } = useLandingAuth({ onSignInSuccess });

  return (
    <>
      <div className="page-shell">
        <Header
          mode="create"
          setMode={() => {}}
          language={language}
          setLanguage={setLanguage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <LandingContent
          language={language}
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
        />

        <Footer />
      </div>

      <LandingModals
        isSignInModalOpen={isSignInModalOpen}
        isSignUpModalOpen={isSignUpModalOpen}
        language={language}
        onSignInClose={handleSignInModalClose}
        onSignUpClose={handleCloseSignUpModal}
        onSignInSuccess={handleSignInSuccess}
      />
    </>
  );
};

export default Landing;

