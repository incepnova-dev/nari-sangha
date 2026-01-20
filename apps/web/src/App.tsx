import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./component/mobile-routes/AppRoutes";
import "./styles/global/index.css";

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [language] = useState<string>('en');

  const handleSignInSuccess = (userData: any) => {
    setCurrentUser(userData);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <AppRoutes
          currentUser={currentUser}
          language={language}
          onSignInSuccess={handleSignInSuccess}
          onSignOut={handleSignOut}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;


