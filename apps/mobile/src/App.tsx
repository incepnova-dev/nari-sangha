import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Landing from './components/Landing';
import AuthenticatedLanding from './components/AuthenticatedLanding';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [language] = useState<string>('en');

  const handleSignInSuccess = (userData: any) => {
    setCurrentUser(userData);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#030718" />
      {currentUser ? (
        <AuthenticatedLanding
          user={currentUser}
          onSignOut={handleSignOut}
          language={language}
        />
      ) : (
        <Landing language={language} onSignInSuccess={handleSignInSuccess} />
      )}
    </>
  );
};

export default App;


