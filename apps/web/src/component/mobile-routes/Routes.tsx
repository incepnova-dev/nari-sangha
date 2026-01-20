import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// We'll import other components as we port them

// Centralized route name constants - matching mobile app
export const ROUTES = {
  WELCOME: 'Welcome',
  SIGN_UP_INDIA_PHONE: 'SignUpIndiaPhone',
  SIGN_UP_GLOBAL_EMAIL: 'SignUpGlobalEmail',
  SUCCESS: 'Success',
  ACCOUNT_RECOVERY: 'AccountRecovery',
  OTP_VERIFICATION: 'OTPVerification',
  PASSWORD_PIN_SETUP: 'PasswordPinSetup',
  PROFILE_SETUP: 'ProfileSetup',
  REGION_SELECTION: 'RegionSelection',
  SIGN_IN: 'SignIn',
  HEALTH_PROFILE_SETUP: 'HealthProfileSetup',
  HOME_LANDING: 'HomeLanding',
  TERMS_CONDITIONS: 'TermsConditions',
  SUCCESS_ACCOUNT_RECOVERY: 'SuccessAccountRecovery',
  PROFILE: 'Profile',
  PRODUCTS_OPTION: 'ProductsOption',
  HEALTH_PRODUCTS: 'HealthProducts',
  INSURANCE: 'Insurance',
  WOMENS_INSURANCE_LISTING: 'WomensInsuranceListing',
  INSURANCE_COMPARISON: 'InsuranceComparison',
  WOMEN_PRODUCT_LISTING: 'WomenProductListing',
  PRODUCT_COMPARISON: 'ProductComparison',
  ABOUT_US: 'AboutUs',
  DISCOVER_OPTIONS: 'DiscoverOptions',
  CLINIC_LISTING: 'ClinicListing',
  DOCTOR_LISTING: 'DoctorListing',
  HOSPITAL_LISTING: 'HospitalListing',
  KNOWLEDGE_HUB: 'KnowledgeHub',
  KNOWLEDGE_ARTICLE: 'KnowledgeArticle',
  EXPERT_ADVICE_LISTING: 'ExpertAdviceListing',
  TRACK_OPTIONS: 'TrackOptions',
  VACCINE_TRACKING: 'VaccineTracking',
  SCREENING_TRACKING: 'ScreeningTracking',
  CYCLE_TRACKING: 'CycleTracking',
  WOMEN_STORIES: 'WomenStories',
  RESEARCH_ARTICLES: 'ResearchArticles',
} as const;

// Route name type
export type RouteName = typeof ROUTES[keyof typeof ROUTES];

// Route path mapping
const routePaths: Record<RouteName, string> = {
  [ROUTES.WELCOME]: '/',
  [ROUTES.SIGN_UP_INDIA_PHONE]: '/signup/india-phone',
  [ROUTES.SIGN_UP_GLOBAL_EMAIL]: '/signup/global-email',
  [ROUTES.SUCCESS]: '/success',
  [ROUTES.ACCOUNT_RECOVERY]: '/account-recovery',
  [ROUTES.OTP_VERIFICATION]: '/otp-verification',
  [ROUTES.PASSWORD_PIN_SETUP]: '/password-pin-setup',
  [ROUTES.PROFILE_SETUP]: '/profile-setup',
  [ROUTES.REGION_SELECTION]: '/region-selection',
  [ROUTES.SIGN_IN]: '/signin',
  [ROUTES.HEALTH_PROFILE_SETUP]: '/health-profile-setup',
  [ROUTES.HOME_LANDING]: '/home',
  [ROUTES.TERMS_CONDITIONS]: '/terms-conditions',
  [ROUTES.SUCCESS_ACCOUNT_RECOVERY]: '/success-account-recovery',
  [ROUTES.PROFILE]: '/profile',
  [ROUTES.PRODUCTS_OPTION]: '/products',
  [ROUTES.HEALTH_PRODUCTS]: '/products/health',
  [ROUTES.INSURANCE]: '/products/insurance',
  [ROUTES.WOMENS_INSURANCE_LISTING]: '/products/insurance/womens',
  [ROUTES.INSURANCE_COMPARISON]: '/products/insurance/compare',
  [ROUTES.WOMEN_PRODUCT_LISTING]: '/products/womens',
  [ROUTES.PRODUCT_COMPARISON]: '/products/compare',
  [ROUTES.ABOUT_US]: '/about',
  [ROUTES.DISCOVER_OPTIONS]: '/discover',
  [ROUTES.CLINIC_LISTING]: '/discover/clinics',
  [ROUTES.DOCTOR_LISTING]: '/discover/doctors',
  [ROUTES.HOSPITAL_LISTING]: '/discover/hospitals',
  [ROUTES.KNOWLEDGE_HUB]: '/knowledge',
  [ROUTES.KNOWLEDGE_ARTICLE]: '/knowledge/article/:id',
  [ROUTES.EXPERT_ADVICE_LISTING]: '/expert-advice',
  [ROUTES.TRACK_OPTIONS]: '/track',
  [ROUTES.VACCINE_TRACKING]: '/track/vaccines',
  [ROUTES.SCREENING_TRACKING]: '/track/screening',
  [ROUTES.CYCLE_TRACKING]: '/track/cycle',
  [ROUTES.WOMEN_STORIES]: '/stories',
  [ROUTES.RESEARCH_ARTICLES]: '/research',
};

// Get route name from path
export const getRouteFromPath = (pathname: string): RouteName => {
  // Handle parameterized routes
  const entries = Object.entries(routePaths);
  const match = entries.find(([, path]) => {
    if (path.includes(':')) {
      const pathPattern = path.replace(/:[^/]+/g, '[^/]+');
      return new RegExp(`^${pathPattern}$`).test(pathname);
    }
    return path === pathname;
  });
  return (match?.[0] as RouteName) || ROUTES.WELCOME;
};

// Create navigation hook that matches mobile app's navigation API
export const useMobileNavigation = () => {
  const navigate = useNavigate();
  const params = useParams();

  return useMemo(() => ({
    navigate: (route: RouteName | string, params?: any) => {
      const routeName = route as RouteName;
      const path = routePaths[routeName] || '/';
      // Store params in sessionStorage temporarily for route params
      if (params) {
        sessionStorage.setItem(`routeParams_${routeName}`, JSON.stringify(params));
      }
      navigate(path);
    },
    goBack: () => {
      navigate(-1);
    },
    params: params || {},
  }), [navigate, params]);
};

// Get route params from sessionStorage
export const getRouteParams = (routeName: RouteName): any => {
  const stored = sessionStorage.getItem(`routeParams_${routeName}`);
  if (stored) {
    sessionStorage.removeItem(`routeParams_${routeName}`);
    return JSON.parse(stored);
  }
  return {};
};

export { routePaths };
export default routePaths;

