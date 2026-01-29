import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../home/Dashboard";
import Landing from "../landing/Landing";
import Logout from "../logout/Logout";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../layout/PublicLayout";

import Community from "../pages/Community";
import HealthHub from "../pages/HealthHub";
import Appointments from "../pages/Appointments";
import Safety from "../pages/Safety";
import Support from "../pages/Support";
import Stories from "../pages/Stories";
import Journeys from "../pages/Journeys";
import PregnancyJourney from "../pages/PregnancyJourney";
import FertilityJourney from "../pages/FertilityJourney";
import MenopauseJourney from "../pages/MenopauseJourney";
import PreventiveHealthJourney from "../pages/PreventiveHealthJourney";
import MenstrualHealthJourney from "../pages/MenstrualHealthJourney";
import ChronicConditionsJourney from "../pages/ChronicConditionsJourney";
import MentalWellnessJourney from "../pages/MentalWellnessJourney";
import PostpartumJourney from "../pages/PostpartumJourney";
import AdolescentHealthJourney from "../pages/AdolescentHealthJourney";
import SymptomChecker from "../pages/SymptomChecker";
import Products from "../pages/Products";
import Vaccination from "../pages/Vaccination";

// Centralized route paths
export const ROUTES = {
  LANDING: "/",
  HOME: "/home",
  LOGOUT: "/logout",
  JOURNEYS: "/journeys",
  PREGNANCY: "/journeys/pregnancy",
  FERTILITY: "/journeys/fertility",
  MENOPAUSE: "/journeys/menopause",
  PREVENTIVE_HEALTH: "/journeys/preventive-health",
  MENSTRUAL_HEALTH: "/journeys/menstrual-health",
  CHRONIC_CONDITIONS: "/journeys/chronic-conditions",
  MENTAL_WELLNESS: "/journeys/mental-wellness",
  POSTPARTUM: "/journeys/postpartum",
  ADOLESCENT_HEALTH: "/journeys/adolescent-health",
  PRODUCTS: "/products",
  APPOINTMENTS: "/appointments",
  COMMUNITY: "/community",
  SYMPTOM_CHECKER: "/symptom-checker",
  HEALTH_HUB: "/health-hub", // Resources
  SAFETY: "/safety",
  SUPPORT: "/support",
  STORIES: "/stories",
  VACCINATION: "/vaccination",
} as const;

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const renderHome = () => {
    if (isLoading) return null;
    return isAuthenticated ? <Dashboard /> : <Navigate to={ROUTES.LANDING} replace />;
  };

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.COMMUNITY} element={<Community />} />
        <Route path={ROUTES.HEALTH_HUB} element={<HealthHub />} />
        <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
        <Route path={ROUTES.SAFETY} element={<Safety />} />
        <Route path={ROUTES.SUPPORT} element={<Support />} />
        <Route path={ROUTES.STORIES} element={<Stories />} />
        <Route path={ROUTES.JOURNEYS} element={<Journeys />} />
        <Route path={ROUTES.PREGNANCY} element={<PregnancyJourney />} />
        <Route path={ROUTES.FERTILITY} element={<FertilityJourney />} />
        <Route path={ROUTES.MENOPAUSE} element={<MenopauseJourney />} />
        <Route path={ROUTES.PREVENTIVE_HEALTH} element={<PreventiveHealthJourney />} />
        <Route path={ROUTES.MENSTRUAL_HEALTH} element={<MenstrualHealthJourney />} />
        <Route path={ROUTES.CHRONIC_CONDITIONS} element={<ChronicConditionsJourney />} />
        <Route path={ROUTES.MENTAL_WELLNESS} element={<MentalWellnessJourney />} />
        <Route path={ROUTES.POSTPARTUM} element={<PostpartumJourney />} />
        <Route path={ROUTES.ADOLESCENT_HEALTH} element={<AdolescentHealthJourney />} />
        <Route path={ROUTES.SYMPTOM_CHECKER} element={<SymptomChecker />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.VACCINATION} element={<Vaccination />} />
      </Route>

      <Route path={ROUTES.HOME} element={renderHome()} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
};

export default AppRoutes;
