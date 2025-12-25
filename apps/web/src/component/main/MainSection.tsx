import React from "react";
import AuthenticatedMainLayout, { AuthenticatedMainLayoutProps } from "./AuthenticatedMainLayout";
import Landing from "../landing/Landing";

interface MainSectionProps extends AuthenticatedMainLayoutProps {
  currentUser: any;
  language?: string;
  setCurrentUser: (user: any) => void;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
  const { currentUser, language = "en", setCurrentUser } = props;

  if (!currentUser) {
    return <Landing language={language} onSignInSuccess={setCurrentUser} />;
  }

  return <AuthenticatedMainLayout {...props} />;
};

export default MainSection;

