import React from "react";
import BrandBlock from "./BrandBlock";
import Navigation from "./Navigation";
import TopBarCTA from "./TopBarCTA";
import LanguageSwitcher from "./LanguageSwitcher";
import { getProperty } from "../../../languages";
import { signOut } from "../../../services/api";
import "../../../styles/narisangha/header/Header.css";

const Header = ({ mode, setMode, language, setLanguage, setViewMode, currentUser, setCurrentUser }) => {
  const handleLogout = async () => {
    await signOut();
    setCurrentUser(null);
  };

  const userName = currentUser?.user?.name || currentUser?.name || "";

  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <BrandBlock language={language} />
        <Navigation setViewMode={setViewMode} language={language} />

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
            setMode={setMode}
            language={language}
            currentUser={currentUser}
            onSignInSuccess={setCurrentUser}
            onLogout={handleLogout}
          />
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </header>
  );
};

export default Header;

