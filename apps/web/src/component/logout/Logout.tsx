import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { useAuth } from "../../context/AuthContext";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await signOut();
      navigate(ROUTES.LANDING, { replace: true });
    };

    performLogout();
  }, [navigate]);

  // Return null while logging out
  return null;
};

export default Logout;

