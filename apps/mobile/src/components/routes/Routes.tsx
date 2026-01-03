import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Welcome from '../Welcome';
import SignUpIndiaPhone from '../SignUpIndiaPhone';
import SignUpGlobalEmail from '../SignUpGlobalEmail';
import Success from '../Success';
import AccountRecovery from '../AccountRecovery';
import OTPVerification from '../OTPVerification';
import PasswordPinSetup from '../PasswordPinSetup';
import ProfileSetup from '../ProfileSetup';
import RegionSelection from '../RegionSelection';
import SignIn from '../SignIn';
import HealthProfileSetup from '../HealthProfileSetup';
import HomeLanding from '../HomeLanding';
import TermsConditions from '../TermsConditions';
import SuccessAccountRecovery from '../SuccessAccountRecovery';
import Profile from '../Profile';
import ProductsOption from '../ProductsOption';
import HealthProducts from '../HealthProducts';
import Insurance from '../Insurance';
import WomensInsuranceListing from '../WomensInsuranceListing';
import InsuranceComparison from '../InsuranceComparison';
import WomenProductListing from '../WomenProductListing';
import ProductComparison from '../ProductComparison';
import AboutUs from '../AboutUs';
import DiscoverOptions from '../DiscoverOptions';
import ClinicListing from '../ClinicListing';
import DoctorListing from '../DoctorListing';
import HospitalListing from '../HospitalListing';
import KnowledgeHub from '../KnowledgeHub';
import KnowledgeArticle from '../KnowledgeArticle';
import ExpertAdviceListing from '../ExpertAdviceListing';
import TrackOptions from '../TrackOptions';
import VaccineTracking from '../VaccineTracking';
import ScreeningTracking from '../ScreeningTracking';
import CycleTracking from '../CycleTracking';
import WomenStories from '../WomenStories';
import ResearchArticles from '../ResearchArticles';

// Centralized route name constants
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

// Route name type derived from constants
export type RouteName = typeof ROUTES[keyof typeof ROUTES];

// Route component props factory type
type RouteComponentPropsFactory = (props: {
  navigation: any;
  user?: any;
  language?: string;
  routeParams?: any;
  flow?: 'signup' | 'reset' | null;
  handlers: {
    handleSignInSuccess: (userData: any) => void;
    handleSignOut: () => void;
    handleSignUpContinue: (data: any) => void;
    setCurrentRoute: (route: RouteName) => void;
  };
}) => React.ReactElement;

// Route definition interface
interface RouteDefinition {
  name: RouteName;
  component: React.ComponentType<any>;
  backRoute: RouteName;
  requiresAuth?: boolean;
  flow?: 'signup' | 'reset' | null;
  defaultParams?: Record<string, any>;
  renderProps: RouteComponentPropsFactory;
}

interface RoutesProps {
  initialRoute?: RouteName;
  currentUser?: any;
  language?: string;
  onSignInSuccess?: (userData: any) => void;
  onSignOut?: () => void;
}

const Routes: React.FC<RoutesProps> = ({
  initialRoute = ROUTES.WELCOME,
  currentUser,
  language = 'en',
  onSignInSuccess,
  onSignOut,
}) => {
  const [currentRoute, setCurrentRoute] = useState<RouteName>(initialRoute);
  const [user, setUser] = useState<any>(currentUser);
  const [flow, setFlow] = useState<'signup' | 'reset' | null>(null);
  const [routeParams, setRouteParams] = useState<any>({});

  // Navigation object
  const navigation = useMemo(() => ({
    navigate: (route: RouteName | string, params?: any) => {
      const target = route as RouteName;

      // Get route definition to check flow
      const routeDef = routeRegistryMap.get(target);
      if (routeDef?.flow !== undefined) {
        setFlow(routeDef.flow);
      }

      if (params) {
        setRouteParams(params);
      }
      setCurrentRoute(target);
    },
    goBack: () => {
      const routeDef = routeRegistryMap.get(currentRoute);
      const backRoute = routeDef?.backRoute || ROUTES.WELCOME;
      setCurrentRoute(backRoute);
    },
  }), [currentRoute]);

  const handleSignInSuccess = (userData: any) => {
    setUser(userData);
    onSignInSuccess?.(userData);
  };

  const handleSignOut = () => {
    setUser(null);
    onSignOut?.();
    setCurrentRoute(ROUTES.WELCOME);
  };

  const handleSignUpContinue = (data: any) => {
    console.log('Signup data:', data);
  };

  // Route registry with complete metadata
  const routeRegistry: RouteDefinition[] = [
    {
      name: ROUTES.WELCOME,
      component: Welcome,
      backRoute: ROUTES.WELCOME,
      flow: null,
      renderProps: ({ navigation, language, handlers }) => (
        <Welcome
          language={language}
          onSignInSuccess={handlers.handleSignInSuccess}
          navigation={navigation}
        />
      ),
    },
    {
      name: ROUTES.SIGN_UP_INDIA_PHONE,
      component: SignUpIndiaPhone,
      backRoute: ROUTES.REGION_SELECTION,
      flow: 'signup',
      renderProps: ({ navigation, handlers }) => (
        <SignUpIndiaPhone
          navigation={navigation}
          onContinue={handlers.handleSignUpContinue}
        />
      ),
    },
    {
      name: ROUTES.SIGN_UP_GLOBAL_EMAIL,
      component: SignUpGlobalEmail,
      backRoute: ROUTES.REGION_SELECTION,
      flow: 'signup',
      renderProps: ({ navigation, handlers }) => (
        <SignUpGlobalEmail
          navigation={navigation}
          onContinue={handlers.handleSignUpContinue}
        />
      ),
    },
    {
      name: ROUTES.SUCCESS,
      component: Success,
      backRoute: ROUTES.TERMS_CONDITIONS,
      renderProps: ({ navigation, user, handlers }) => (
        <Success
          navigation={navigation}
          onContinue={() => {
            if (user) {
              handlers.setCurrentRoute(ROUTES.HOME_LANDING);
            } else {
              handlers.setCurrentRoute(ROUTES.WELCOME);
            }
          }}
        />
      ),
    },
    {
      name: ROUTES.ACCOUNT_RECOVERY,
      component: AccountRecovery,
      backRoute: ROUTES.SIGN_IN,
      flow: 'reset',
      renderProps: ({ navigation }) => (
        <AccountRecovery
          navigation={navigation}
          onContinue={(method) => {
            console.log('Recovery method:', method);
          }}
        />
      ),
    },
    {
      name: ROUTES.OTP_VERIFICATION,
      component: OTPVerification,
      backRoute: ROUTES.ACCOUNT_RECOVERY,
      renderProps: ({ navigation }) => (
        <OTPVerification
          navigation={navigation}
          onVerify={(otp) => {
            console.log('OTP verified:', otp);
          }}
        />
      ),
    },
    {
      name: ROUTES.PASSWORD_PIN_SETUP,
      component: PasswordPinSetup,
      backRoute: ROUTES.OTP_VERIFICATION,
      renderProps: ({ navigation, flow }) => (
        <PasswordPinSetup
          navigation={navigation}
          flow={flow}
          onComplete={(data) => {
            console.log('Password/PIN setup:', data);
          }}
        />
      ),
    },
    {
      name: ROUTES.PROFILE_SETUP,
      component: ProfileSetup,
      backRoute: ROUTES.PASSWORD_PIN_SETUP,
      renderProps: ({ navigation }) => (
        <ProfileSetup
          navigation={navigation}
          onComplete={(data) => {
            console.log('Profile setup:', data);
          }}
        />
      ),
    },
    {
      name: ROUTES.REGION_SELECTION,
      component: RegionSelection,
      backRoute: ROUTES.WELCOME,
      renderProps: ({ navigation }) => (
        <RegionSelection
          navigation={navigation}
          onContinue={(region) => {
            console.log('Region selected:', region);
          }}
        />
      ),
    },
    {
      name: ROUTES.SIGN_IN,
      component: SignIn,
      backRoute: ROUTES.WELCOME,
      renderProps: ({ navigation, handlers }) => (
        <SignIn
          navigation={navigation}
          onSignIn={(data) => {
            console.log('Sign in:', data);
            handlers.handleSignInSuccess({ email: data.email, phone: data.phone });
          }}
          onSignInWithOTP={() => {
            console.log('Sign in with OTP');
          }}
          onForgotPassword={() => {
            console.log('Forgot password');
          }}
        />
      ),
    },
    {
      name: ROUTES.HEALTH_PROFILE_SETUP,
      component: HealthProfileSetup,
      backRoute: ROUTES.SUCCESS,
      renderProps: ({ navigation }) => (
        <HealthProfileSetup
          navigation={navigation}
          onComplete={(data) => {
            console.log('Health profile setup:', data);
          }}
          onSkip={() => {
            console.log('Health profile skipped');
          }}
        />
      ),
    },
    {
      name: ROUTES.HOME_LANDING,
      component: HomeLanding,
      backRoute: ROUTES.HEALTH_PROFILE_SETUP,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <HomeLanding
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.TERMS_CONDITIONS,
      component: TermsConditions,
      backRoute: ROUTES.PASSWORD_PIN_SETUP,
      renderProps: ({ navigation }) => (
        <TermsConditions
          navigation={navigation}
          onAccept={(data) => {
            console.log('Terms accepted:', data);
          }}
        />
      ),
    },
    {
      name: ROUTES.SUCCESS_ACCOUNT_RECOVERY,
      component: SuccessAccountRecovery,
      backRoute: ROUTES.PASSWORD_PIN_SETUP,
      renderProps: ({ navigation }) => (
        <SuccessAccountRecovery
          navigation={navigation}
          onLogin={() => {
            console.log('Navigate to login');
          }}
        />
      ),
    },
    {
      name: ROUTES.PROFILE,
      component: Profile,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <Profile
          user={user}
          onSignOut={() => {
            handlers.handleSignOut();
            navigation.navigate(ROUTES.WELCOME);
          }}
          onNavigate={(screen) => {
            if (screen === 'home') {
              navigation.navigate(ROUTES.HOME_LANDING);
            } else {
              navigation.navigate(screen as RouteName);
            }
          }}
        />
      ),
    },
    {
      name: ROUTES.PRODUCTS_OPTION,
      component: ProductsOption,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <ProductsOption
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          onContinue={(option) => {
            console.log('Product option selected:', option);
          }}
        />
      ),
    },
    {
      name: ROUTES.HEALTH_PRODUCTS,
      component: HealthProducts,
      backRoute: ROUTES.PRODUCTS_OPTION,
      requiresAuth: true,
      renderProps: ({ navigation, user }) => (
        <HealthProducts
          navigation={navigation}
          user={user}
        />
      ),
    },
    {
      name: ROUTES.INSURANCE,
      component: Insurance,
      backRoute: ROUTES.PRODUCTS_OPTION,
      requiresAuth: true,
      renderProps: ({ navigation, user }) => (
        <Insurance
          navigation={navigation}
          user={user}
        />
      ),
    },
    {
      name: ROUTES.WOMENS_INSURANCE_LISTING,
      component: WomensInsuranceListing,
      backRoute: ROUTES.PRODUCTS_OPTION,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <WomensInsuranceListing
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.INSURANCE_COMPARISON,
      component: InsuranceComparison,
      backRoute: ROUTES.WOMENS_INSURANCE_LISTING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers, routeParams }) => (
        <InsuranceComparison
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          selectedPlanIds={routeParams.selectedPlanIds || []}
        />
      ),
    },
    {
      name: ROUTES.WOMEN_PRODUCT_LISTING,
      component: WomenProductListing,
      backRoute: ROUTES.PRODUCTS_OPTION,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <WomenProductListing
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.PRODUCT_COMPARISON,
      component: ProductComparison,
      backRoute: ROUTES.WOMEN_PRODUCT_LISTING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers, routeParams }) => (
        <ProductComparison
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          productId={routeParams.productId}
          productName={routeParams.productName}
          productPrice={routeParams.productPrice}
          productDescription={routeParams.productDescription}
          productCategory={routeParams.productCategory}
        />
      ),
    },
    {
      name: ROUTES.ABOUT_US,
      component: AboutUs,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <AboutUs
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.DISCOVER_OPTIONS,
      component: DiscoverOptions,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <DiscoverOptions
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          onContinue={(option) => {
            console.log('Discover option selected:', option);
          }}
        />
      ),
    },
    {
      name: ROUTES.CLINIC_LISTING,
      component: ClinicListing,
      backRoute: ROUTES.DISCOVER_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user }) => (
        <ClinicListing
          navigation={navigation}
          user={user}
        />
      ),
    },
    {
      name: ROUTES.DOCTOR_LISTING,
      component: DoctorListing,
      backRoute: ROUTES.DISCOVER_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user }) => (
        <DoctorListing
          navigation={navigation}
          user={user}
        />
      ),
    },
    {
      name: ROUTES.HOSPITAL_LISTING,
      component: HospitalListing,
      backRoute: ROUTES.DISCOVER_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user }) => (
        <HospitalListing
          navigation={navigation}
          user={user}
        />
      ),
    },
    {
      name: ROUTES.KNOWLEDGE_HUB,
      component: KnowledgeHub,
      backRoute: ROUTES.DISCOVER_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <KnowledgeHub
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.KNOWLEDGE_ARTICLE,
      component: KnowledgeArticle,
      backRoute: ROUTES.KNOWLEDGE_HUB,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers, routeParams }) => (
        <KnowledgeArticle
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          diseaseId={routeParams.diseaseId}
          diseaseName={routeParams.diseaseName}
          diseaseCategory={routeParams.diseaseCategory}
          diseaseDescription={routeParams.diseaseDescription}
          diseaseSymptoms={routeParams.diseaseSymptoms}
          diseasePrevalence={routeParams.diseasePrevalence}
        />
      ),
    },
    {
      name: ROUTES.EXPERT_ADVICE_LISTING,
      component: ExpertAdviceListing,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <ExpertAdviceListing
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.TRACK_OPTIONS,
      component: TrackOptions,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <TrackOptions
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
          onContinue={(option) => {
            console.log('Track option selected:', option);
          }}
        />
      ),
    },
    {
      name: ROUTES.VACCINE_TRACKING,
      component: VaccineTracking,
      backRoute: ROUTES.TRACK_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <VaccineTracking
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.SCREENING_TRACKING,
      component: ScreeningTracking,
      backRoute: ROUTES.TRACK_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <ScreeningTracking
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.CYCLE_TRACKING,
      component: CycleTracking,
      backRoute: ROUTES.TRACK_OPTIONS,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <CycleTracking
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.WOMEN_STORIES,
      component: WomenStories,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <WomenStories
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
    {
      name: ROUTES.RESEARCH_ARTICLES,
      component: ResearchArticles,
      backRoute: ROUTES.HOME_LANDING,
      requiresAuth: true,
      renderProps: ({ navigation, user, handlers }) => (
        <ResearchArticles
          navigation={navigation}
          user={user}
          onSignOut={handlers.handleSignOut}
        />
      ),
    },
  ];

  // Convert registry array to Map for O(1) lookup
  const routeRegistryMap = useMemo(() => {
    const map = new Map<RouteName, RouteDefinition>();
    routeRegistry.forEach((route) => {
      map.set(route.name, route);
    });
    return map;
  }, []);

  // Handlers object for route components
  const handlers = useMemo(() => ({
    handleSignInSuccess,
    handleSignOut,
    handleSignUpContinue,
    setCurrentRoute,
  }), []);

  // Render current route dynamically using registry
  const renderRoute = () => {
    const routeDef = routeRegistryMap.get(currentRoute);

    if (!routeDef) {
      // Fallback to Welcome if route not found
      const defaultRoute = routeRegistryMap.get(ROUTES.WELCOME)!;
      return defaultRoute.renderProps({
        navigation,
        language,
        handlers,
      });
    }

    // Check authentication requirement
    if (routeDef.requiresAuth && !user) {
      const defaultRoute = routeRegistryMap.get(ROUTES.WELCOME)!;
      return defaultRoute.renderProps({
        navigation,
        language,
        handlers,
      });
    }

    return routeDef.renderProps({
      navigation,
      user,
      language,
      routeParams,
      flow,
      handlers,
    });
  };

  return <View style={styles.container}>{renderRoute()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Routes;
