import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../home/Dashboard";
import Landing from "../landing/Landing";
import Logout from "../logout/Logout";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../layout/PublicLayout";

import Community from "../pages/Community";
import Appointments from "../pages/Appointments";
import Safety from "../pages/Safety";
import Support from "../pages/Support";
import Stories from "../pages/Stories";
import Journeys from "../pages/Journeys";
import PregnancyJourney from "../pages/PregnancyJourney";
import FertilityJourney from "../pages/FertilityJourney";
import PreventiveHealthJourney from "../pages/PreventiveHealthJourney";
import MenstrualHealthJourney from "../pages/MenstrualHealthJourney";
import ChronicConditionsJourney from "../pages/ChronicConditionsJourney";
import MentalWellnessJourney from "../pages/MentalWellnessJourney";
import PostpartumJourney from "../pages/PostpartumJourney";
import AdolescentHealthJourney from "../pages/AdolescentHealthJourney";
import SymptomChecker from "../pages/SymptomChecker";
import Products from "../pages/Products";
import MenopauseJourney from "../pages/MenopauseJourney";
import PerinatalJourney from "../pages/PerinatalJourney";
import About from "../pages/About";
import GovernmentSchemes from "../pages/GovernmentSchemes";
import ResearchHub from "../pages/ResearchHub";
import CosmeticSurgeryGuide from "../pages/CosmeticSurgeryGuide";
import PerinatalFamilyGuide from "../pages/PerinatalFamilyGuide";
import FindDoctors from "../pages/FindDoctors";
import Teleconsultation from "../pages/Teleconsultation";
import ScreeningGuide from "../pages/ScreeningGuide";
import VaccinationGuide from "../pages/VaccinationGuide";
import Services from "../pages/Services";
import InsuranceGuide from "../pages/InsuranceGuide";

// Centralized route paths
export const ROUTES = {
  LANDING: "/",
  HOME: "/home",
  LOGOUT: "/logout",
  JOURNEYS: "/journeys",
  PREGNANCY: "/journeys/pregnancy",
  FERTILITY: "/journeys/fertility",
  PREVENTIVE_HEALTH: "/journeys/preventive-health",
  MENSTRUAL_HEALTH: "/journeys/menstrual-health",
  CHRONIC_CONDITIONS: "/journeys/chronic-conditions",
  MENTAL_WELLNESS: "/journeys/mental-wellness",
  POSTPARTUM: "/journeys/postpartum",
  ADOLESCENT_HEALTH: "/journeys/adolescent-health",
  MENOPAUSE: "/journeys/menopause",
  PRODUCTS: "/products",
  APPOINTMENTS: "/appointments",
  COMMUNITY: "/community",
  SYMPTOM_CHECKER: "/symptom-checker",
  SAFETY: "/safety",
  SUPPORT: "/support",
  STORIES: "/stories",
  ABOUT: "/about",
  PERINATAL: "/journeys/perinatal",
  GOVERNMENT_SCHEMES: "/government-schemes",
  RESEARCH: "/research",
  COSMETIC_SURGERY: "/cosmetic-surgery",
  PERINATAL_FAMILY: "/perinatal-family-guide",
  TELECONSULTATION: "/teleconsultation",
  FIND_DOCTORS: "/find-doctors",
  SCREENING: "/screening",
  VACCINATION: "/vaccination",
  SERVICES: "/services",
  INSURANCE_GUIDE: "/insurance-guide",
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
        <Route path="/health-hub" element={<Navigate to={ROUTES.JOURNEYS} replace />} />
        <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
        <Route path={ROUTES.SAFETY} element={<Safety />} />
        <Route path={ROUTES.SUPPORT} element={<Support />} />
        <Route path={ROUTES.STORIES} element={<Stories />} />
        <Route path={ROUTES.JOURNEYS} element={<Journeys />} />
        <Route path={ROUTES.PREGNANCY} element={<PregnancyJourney />} />
        <Route path={ROUTES.FERTILITY} element={<FertilityJourney />} />
        <Route path={ROUTES.PREVENTIVE_HEALTH} element={<PreventiveHealthJourney />} />
        <Route path={ROUTES.MENSTRUAL_HEALTH} element={<MenstrualHealthJourney />} />
        <Route path={ROUTES.CHRONIC_CONDITIONS} element={<ChronicConditionsJourney />} />
        <Route path={ROUTES.MENTAL_WELLNESS} element={<MentalWellnessJourney />} />
        <Route path={ROUTES.POSTPARTUM} element={<PostpartumJourney />} />
        <Route path={ROUTES.ADOLESCENT_HEALTH} element={<AdolescentHealthJourney />} />
        <Route path={ROUTES.SYMPTOM_CHECKER} element={<SymptomChecker />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.MENOPAUSE} element={<MenopauseJourney />} />
        <Route path={ROUTES.PERINATAL} element={<PerinatalJourney />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.GOVERNMENT_SCHEMES} element={<GovernmentSchemes />} />
        <Route path={ROUTES.RESEARCH} element={<ResearchHub />} />
        <Route path={ROUTES.COSMETIC_SURGERY} element={<CosmeticSurgeryGuide />} />
        <Route path={ROUTES.PERINATAL_FAMILY} element={<PerinatalFamilyGuide />} />
        <Route path={ROUTES.TELECONSULTATION} element={<Teleconsultation />} />
        <Route path={ROUTES.FIND_DOCTORS} element={<FindDoctors />} />
        <Route path={ROUTES.SCREENING} element={<ScreeningGuide />} />
        <Route path={ROUTES.VACCINATION} element={<VaccinationGuide />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.INSURANCE_GUIDE} element={<InsuranceGuide />} />
      </Route>

      <Route path={ROUTES.HOME} element={renderHome()} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
};

export default AppRoutes;
