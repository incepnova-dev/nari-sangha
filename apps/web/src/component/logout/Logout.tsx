import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services";
import { ROUTES } from "../routes/Routes";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // Clear all authentication tokens
      await signOut();
      
      // Clear any additional user state from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('currentUser');
      
      // Clear sessionStorage
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('currentUser');
      
      // Clear all localStorage (optional - more aggressive cleanup)
      // localStorage.clear();
      
      // Redirect to landing page
      navigate(ROUTES.LANDING, { replace: true });
    };

    performLogout();
  }, [navigate]);

  // Return null while logging out
  return null;
};

export default Logout;

