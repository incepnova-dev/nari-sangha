import React from "react";
import AuthenticatedMainLayout from "./AuthenticatedMainLayout";
import UnauthenticatedLanding from "./UnauthenticatedLanding";

const MainSection = (props) => {
  const { currentUser, language = "en", setCurrentUser } = props;

  if (!currentUser) {
    return <UnauthenticatedLanding language={language} onSignInSuccess={setCurrentUser} />;
  }

  return <AuthenticatedMainLayout {...props} />;
};

export default MainSection;

