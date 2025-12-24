import React, { useEffect } from "react";
import AuthenticatedMainLayout, { AuthenticatedMainLayoutProps } from "./AuthenticatedMainLayout";
import UnauthenticatedLanding from "./UnauthenticatedLanding";

interface MainSectionProps extends AuthenticatedMainLayoutProps {
  currentUser: any;
  language?: string;
  setCurrentUser: (user: any) => void;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
  const { currentUser, language = "en", setCurrentUser } = props;

  useEffect(() => {
    console.log('[MainSection] currentUser changed:', currentUser);
    console.log('[MainSection] currentUser is truthy?', !!currentUser);
  }, [currentUser]);

  console.log('[MainSection] Rendering with currentUser:', currentUser);

  if (!currentUser) {
    console.log('[MainSection] Rendering UnauthenticatedLanding');
    return <UnauthenticatedLanding language={language} onSignInSuccess={setCurrentUser} />;
  }

  console.log('[MainSection] Rendering AuthenticatedMainLayout');
  return <AuthenticatedMainLayout {...props} />;
};

export default MainSection;

