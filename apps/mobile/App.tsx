import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import UnauthenticatedLanding from './src/components/UnauthenticatedLanding';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [language, setLanguage] = useState<string>('en');

  const handleSignInSuccess = (userData: any) => {
    setCurrentUser(userData);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#030718" />
      <UnauthenticatedLanding
        language={language}
        onSignInSuccess={handleSignInSuccess}
      />
    </>
  );
};

export default App;


