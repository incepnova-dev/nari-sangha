import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Landing from "../landing/Landing";
import Logout from "../logout/Logout";

// Centralized route paths
export const ROUTES = {
  LANDING: "/",
  HOME: "/home",
  LOGOUT: "/logout",
} as const;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<Landing />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      
      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
};

export default AppRoutes;

