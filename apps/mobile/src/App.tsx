import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import AppRoutes from './components/routes/Routes';

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
      <StatusBar
        barStyle="light-content"
        backgroundColor={currentUser ? '#111827' : '#030718'}
      />
      <AppRoutes
        initialRoute={currentUser ? 'Home' : 'Welcome'}
        currentUser={currentUser}
        language={language}
        onSignInSuccess={handleSignInSuccess}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default App;


