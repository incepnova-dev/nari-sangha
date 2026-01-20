import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { routePaths, ROUTES } from './Routes';
import Welcome from '../Welcome/Welcome';
// Import other components as we port them
// import SignIn from '../SignIn/SignIn';
// import HomeLanding from '../HomeLanding/HomeLanding';
// ... etc

interface AppRoutesProps {
  currentUser?: any;
  language?: string;
  onSignInSuccess?: (userData: any) => void;
  onSignOut?: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  currentUser,
  language = 'en',
  onSignInSuccess,
}) => {
  const location = useLocation();

  // Determine initial route based on user state
  useEffect(() => {
    if (location.pathname === '/' && currentUser) {
      // Redirect authenticated users to home
      window.location.href = routePaths[ROUTES.HOME_LANDING];
    }
  }, [currentUser, location.pathname]);

  return (
    <Routes>
      {/* Welcome/Home route */}
      <Route
        path={routePaths[ROUTES.WELCOME]}
        element={
          <Welcome
            language={language}
            onSignInSuccess={onSignInSuccess}
          />
        }
      />

      {/* Add other routes as we port components */}
      {/* Example structure:
      <Route
        path={routePaths[ROUTES.SIGN_IN]}
        element={<SignIn />}
      />
      <Route
        path={routePaths[ROUTES.HOME_LANDING]}
        element={
          currentUser ? (
            <HomeLanding
              user={currentUser}
              onSignOut={onSignOut}
            />
          ) : (
            <Navigate to={routePaths[ROUTES.WELCOME]} replace />
          )
        }
      />
      */}

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={routePaths[ROUTES.WELCOME]} replace />} />
    </Routes>
  );
};

export default AppRoutes;

