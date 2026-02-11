import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Landing from "../landing/Landing";
import Logout from "../logout/Logout";
import { useAuth } from "../../context/AuthContext";
import PublicLayout from "../layout/PublicLayout";

import Community from "../pages/Community";

import Safety from "../pages/Safety";
import Support from "../pages/Support";
// import Stories from "../pages/Stories";
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
import PerinatalWellnessJourney from "../pages/PerinatalWellnessJourney";
import CancerVisualization from "../pages/CancerVisualization";
import AutoimmuneHealthJourney from "../pages/AutoimmuneHealthJourney";
import BoneHealthJourney from "../pages/BoneHealthJourney";
import About from "../pages/About";
import GovernmentSchemes from "../pages/GovernmentSchemes";
import ResearchHub from "../pages/ResearchHub";
import CosmeticSurgeryGuide from "../pages/CosmeticSurgeryGuide";
import PerinatalFamilyGuide from "../pages/PerinatalFamilyGuide";
import FindDoctors from "../pages/FindDoctors";
import Teleconsultation from "../pages/Teleconsultation";
import ScreeningGuide from "../pages/ScreeningGuide";
import VaccinationGuide from "../pages/VaccinationGuide";
import BreastfeedingJourney from "../pages/BreastfeedingJourney";
import LossSupport from "../pages/LossSupport";
import OTCGUIDE from "../pages/OTCGUIDE";
import NutritionGuide from "../pages/NutritionGuide";
import AestheticSimulator from "../pages/AestheticSimulator";
import GynaecologyOB from "../pages/GynaecologyOB";
import GestationalDiabetes from "../pages/GestationalDiabetes";
import PreeclampsiaEducation from "../pages/PreeclampsiaEducation";
import FertilityJourneyEnhanced from "../pages/FertilityJourney";
import ConceptionGuide from "../pages/ConceptionGuide";
import MilkSupplyGuide from "../pages/MilkSupplyGuide";


import InsuranceGuide from "../pages/InsuranceGuide";
import NavigationAudit from "../pages/NavigationAudit";
import SystemMap from "../pages/SystemMap";


import { ROUTES } from "./routeConstants";
export { ROUTES };


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
        <Route path={ROUTES.APPOINTMENTS} element={<Teleconsultation />} />
        <Route path={ROUTES.SAFETY} element={<Safety />} />
        <Route path={ROUTES.SUPPORT} element={<Support />} />
        {/* <Route path={ROUTES.STORIES} element={<Stories />} /> */}
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
        <Route path={ROUTES.PERINATAL_WELLNESS} element={<PerinatalWellnessJourney />} />
        <Route path={ROUTES.AUTOIMMUNE_HEALTH} element={<AutoimmuneHealthJourney />} />
        <Route path={ROUTES.BONE_HEALTH} element={<BoneHealthJourney />} />
        <Route path={ROUTES.CANCER_VISUALIZATION} element={<CancerVisualization />} />
        <Route path={ROUTES.GOVERNMENT_SCHEMES} element={<GovernmentSchemes />} />
        <Route path={ROUTES.RESEARCH} element={<ResearchHub />} />
        <Route path={ROUTES.COSMETIC_SURGERY} element={<CosmeticSurgeryGuide />} />
        <Route path={ROUTES.PERINATAL_FAMILY} element={<PerinatalFamilyGuide />} />
        <Route path={ROUTES.TELECONSULTATION} element={<Teleconsultation />} />
        <Route path={ROUTES.FIND_DOCTORS} element={<FindDoctors />} />
        <Route path={ROUTES.SCREENING} element={<ScreeningGuide />} />
        <Route path={ROUTES.VACCINATION} element={<VaccinationGuide />} />
        <Route path={ROUTES.SERVICES} element={<Navigate to={ROUTES.JOURNEYS + "#services"} replace />} />
        <Route path={ROUTES.INSURANCE_GUIDE} element={<InsuranceGuide />} />
        <Route path={ROUTES.OTC_GUIDE} element={<OTCGUIDE />} />
        <Route path={ROUTES.NUTRITION_GUIDE} element={<NutritionGuide />} />
        <Route path={ROUTES.AESTHETIC_SIMULATOR} element={<AestheticSimulator />} />
        <Route path={ROUTES.BREASTFEEDING} element={<BreastfeedingJourney />} />
        <Route path={ROUTES.LOSS_SUPPORT} element={<LossSupport />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.GYNAECOLOGY_OB} element={<GynaecologyOB />} />
        <Route path={ROUTES.HORMONAL_HEALTH} element={<MenstrualHealthJourney />} />
        <Route path={ROUTES.GESTATIONAL_DIABETES} element={<GestationalDiabetes />} />
        <Route path={ROUTES.PREECLAMPSIA_EDUCATION} element={<PreeclampsiaEducation />} />
        <Route path={ROUTES.FERTILITY_JOURNEY} element={<FertilityJourneyEnhanced />} />
        <Route path={ROUTES.CONCEPTION_GUIDE} element={<ConceptionGuide />} />
        <Route path={ROUTES.MILK_SUPPLY_GUIDE} element={<MilkSupplyGuide />} />


        {/* Internal Developer Routes */}
        <Route path="/navigation-tasks" element={<NavigationAudit />} />
        <Route path="/system-map" element={<SystemMap />} />
      </Route>


      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.HOME} element={renderHome()} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
};

export default AppRoutes;
