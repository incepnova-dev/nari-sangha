import React from "react";
import BrandBlock from "./BrandBlock";
import TopBarCTA from "./TopBarCTA";
import ModernLanguageSelector from "./ModernLanguageSelector";
import { getProperty } from "../../i18";
import { languages } from "../../i18n/languages";
import "styles/narisangha/header";

interface HeaderProps {
  mode: string;
  setMode: (mode: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  mode: _mode,
  setMode: _setMode,
  language,
  setLanguage,
  currentUser,
  setCurrentUser
}) => {
  const userName = currentUser?.user?.name || currentUser?.name || "";

  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <BrandBlock language={language} />

        {currentUser && (
          <div className="header-welcome">
            {getProperty("header.welcome", language)},{" "}
            <span className="header-welcome-name">
              {userName}
            </span>
          </div>
        )}

        <div className="header-actions-container">
          <TopBarCTA
            language={language}
            currentUser={currentUser}
            onSignInSuccess={setCurrentUser}
          />
          <ModernLanguageSelector
            language={language}
            setLanguage={setLanguage}
            languages={languages}
            variant="light"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

