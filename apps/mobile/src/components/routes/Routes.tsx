import React, { useState } from 'react';
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
import DiseaseListing from '../DiseaseListing';
import DiseaseDetails from '../DiseaseDetails';
import TrackOptions from '../TrackOptions';
import VaccineTracking from '../VaccineTracking';
import ScreeningTracking from '../ScreeningTracking';
import CycleTracking from '../CycleTracking';

type RouteName =
  | 'Welcome'
  | 'SignUpIndiaPhone'
  | 'SignUpGlobalEmail'
  | 'Success'
  | 'AccountRecovery'
  | 'OTPVerification'
  | 'PasswordPinSetup'
  | 'ProfileSetup'
  | 'RegionSelection'
  | 'SignIn'
  | 'HealthProfileSetup'
  | 'HomeLanding'
  | 'TermsConditions'
  | 'SuccessAccountRecovery'
  | 'Profile'
  | 'ProductsOption'
  | 'HealthProducts'
  | 'Insurance'
  | 'WomensInsuranceListing'
  | 'InsuranceComparison'
  | 'WomenProductListing'
  | 'ProductComparison'
  | 'AboutUs'
  | 'DiscoverOptions'
  | 'ClinicListing'
  | 'DoctorListing'
  | 'HospitalListing'
  | 'DiseaseListing'
  | 'DiseaseDetails'
  | 'TrackOptions'
  | 'VaccineTracking'
  | 'ScreeningTracking'
  | 'CycleTracking';

interface RoutesProps {
  initialRoute?: RouteName;
  currentUser?: any;
  language?: string;
  onSignInSuccess?: (userData: any) => void;
  onSignOut?: () => void;
}

const Routes: React.FC<RoutesProps> = ({
  initialRoute = 'Welcome',
  currentUser,
  language = 'en',
  onSignInSuccess,
  onSignOut,
}) => {
  const [currentRoute, setCurrentRoute] = useState<RouteName>(initialRoute);
  const [user, setUser] = useState<any>(currentUser);
  const [flow, setFlow] = useState<'signup' | 'reset' | null>(null);
  const [routeParams, setRouteParams] = useState<any>({});

  const navigation = {
    navigate: (route: RouteName | string, params?: any) => {
      const target = route as RouteName;

      // Track which flow the user is in (signup vs password reset)
      if (target === 'SignUpIndiaPhone' || target === 'SignUpGlobalEmail') {
        setFlow('signup');
      } else if (target === 'AccountRecovery') {
        setFlow('reset');
      } else if (target === 'Welcome') {
        setFlow(null);
      }

      if (params) {
        setRouteParams(params);
      }
      setCurrentRoute(target);
    },
    goBack: () => {
      // Simple back navigation - can be enhanced with a navigation stack
      const backRoutes: Record<RouteName, RouteName> = {
        Welcome: 'Welcome',
        SignUpIndiaPhone: 'RegionSelection',
        SignUpGlobalEmail: 'RegionSelection',
        Success: 'TermsConditions',
        AccountRecovery: 'SignIn',
        OTPVerification: 'AccountRecovery',
        PasswordPinSetup: 'OTPVerification',
        ProfileSetup: 'PasswordPinSetup',
        RegionSelection: 'Welcome',
        SignIn: 'Welcome',
        HealthProfileSetup: 'Success',
        HomeLanding: 'HealthProfileSetup',
        TermsConditions: 'PasswordPinSetup',
        SuccessAccountRecovery: 'PasswordPinSetup',
        Profile: 'HomeLanding',
        ProductsOption: 'HomeLanding',
        HealthProducts: 'ProductsOption',
        Insurance: 'ProductsOption',
        WomensInsuranceListing: 'ProductsOption',
        InsuranceComparison: 'WomensInsuranceListing',
        WomenProductListing: 'ProductsOption',
        ProductComparison: 'WomenProductListing',
        AboutUs: 'HomeLanding',
        DiscoverOptions: 'HomeLanding',
        ClinicListing: 'DiscoverOptions',
        DoctorListing: 'DiscoverOptions',
        HospitalListing: 'DiscoverOptions',
        DiseaseListing: 'DiscoverOptions',
        DiseaseDetails: 'DiseaseListing',
        TrackOptions: 'HomeLanding',
        VaccineTracking: 'TrackOptions',
        ScreeningTracking: 'TrackOptions',
        CycleTracking: 'TrackOptions',
      };
      setCurrentRoute(backRoutes[currentRoute] || 'Welcome');
    },
  };

  const handleSignInSuccess = (userData: any) => {
    setUser(userData);
    onSignInSuccess?.(userData);
    // Don't set route here - let SignIn component handle navigation to HomeLanding
  };

  const handleSignOut = () => {
    setUser(null);
    onSignOut?.();
    setCurrentRoute('Welcome');
  };

  const handleSignUpContinue = (data: any) => {
    // Handle signup data - you can process it here
    console.log('Signup data:', data);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case 'Welcome':
        return (
          <Welcome
            language={language}
            onSignInSuccess={handleSignInSuccess}
            navigation={navigation}
          />
        );
      case 'SignUpIndiaPhone':
        return (
          <SignUpIndiaPhone
            navigation={navigation}
            onContinue={handleSignUpContinue}
          />
        );
      case 'SignUpGlobalEmail':
        return (
          <SignUpGlobalEmail
            navigation={navigation}
            onContinue={handleSignUpContinue}
          />
        );
      case 'Success':
        return (
          <Success
            navigation={navigation}
            onContinue={() => {
              if (user) {
                setCurrentRoute('HomeLanding');
              } else {
                setCurrentRoute('Welcome');
              }
            }}
          />
        );
      case 'AccountRecovery':
        return (
          <AccountRecovery
            navigation={navigation}
            onContinue={(method) => {
              console.log('Recovery method:', method);
            }}
          />
        );
      case 'OTPVerification':
        return (
          <OTPVerification
            navigation={navigation}
            onVerify={(otp) => {
              console.log('OTP verified:', otp);
            }}
          />
        );
      case 'PasswordPinSetup':
        return (
          <PasswordPinSetup
            navigation={navigation}
            flow={flow}
            onComplete={(data) => {
              console.log('Password/PIN setup:', data);
            }}
          />
        );
      case 'ProfileSetup':
        return (
          <ProfileSetup
            navigation={navigation}
            onComplete={(data) => {
              console.log('Profile setup:', data);
            }}
          />
        );
      case 'RegionSelection':
        return (
          <RegionSelection
            navigation={navigation}
            onContinue={(region) => {
              console.log('Region selected:', region);
            }}
          />
        );
      case 'SignIn':
        return (
          <SignIn
            navigation={navigation}
            onSignIn={(data) => {
              console.log('Sign in:', data);
              handleSignInSuccess({ email: data.email, phone: data.phone });
              // Navigation to HomeLanding is handled in SignIn component
            }}
            onSignInWithOTP={() => {
              console.log('Sign in with OTP');
            }}
            onForgotPassword={() => {
              console.log('Forgot password');
            }}
          />
        );
      case 'HealthProfileSetup':
        return (
          <HealthProfileSetup
            navigation={navigation}
            onComplete={(data) => {
              console.log('Health profile setup:', data);
            }}
            onSkip={() => {
              console.log('Health profile skipped');
            }}
          />
        );
      case 'HomeLanding':
        return (
          <HomeLanding
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'TermsConditions':
        return (
          <TermsConditions
            navigation={navigation}
            onAccept={(data) => {
              console.log('Terms accepted:', data);
            }}
          />
        );
      case 'SuccessAccountRecovery':
        return (
          <SuccessAccountRecovery
            navigation={navigation}
            onLogin={() => {
              console.log('Navigate to login');
            }}
          />
        );
      case 'Profile':
        return (
          <Profile
            user={user}
            onSignOut={() => {
              onSignOut?.();
              navigation.navigate('Welcome');
            }}
            onNavigate={(screen) => {
              if (screen === 'home') {
                navigation.navigate('HomeLanding');
              } else {
                navigation.navigate(screen as RouteName);
              }
            }}
          />
        );
      case 'ProductsOption':
        return (
          <ProductsOption
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            onContinue={(option) => {
              console.log('Product option selected:', option);
            }}
          />
        );
      case 'HealthProducts':
        return (
          <HealthProducts
            navigation={navigation}
            user={user}
          />
        );
      case 'Insurance':
        return (
          <Insurance
            navigation={navigation}
            user={user}
          />
        );
      case 'WomensInsuranceListing':
        return (
          <WomensInsuranceListing
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'InsuranceComparison':
        return (
          <InsuranceComparison
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            selectedPlanIds={routeParams.selectedPlanIds || []}
          />
        );
      case 'WomenProductListing':
        return (
          <WomenProductListing
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'ProductComparison':
        return (
          <ProductComparison
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            productId={routeParams.productId}
            productName={routeParams.productName}
            productPrice={routeParams.productPrice}
            productDescription={routeParams.productDescription}
            productCategory={routeParams.productCategory}
          />
        );
      case 'AboutUs':
        return (
          <AboutUs
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'DiscoverOptions':
        return (
          <DiscoverOptions
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            onContinue={(option) => {
              console.log('Discover option selected:', option);
            }}
          />
        );
      case 'ClinicListing':
        return (
          <ClinicListing
            navigation={navigation}
            user={user}
          />
        );
      case 'DoctorListing':
        return (
          <DoctorListing
            navigation={navigation}
            user={user}
          />
        );
      case 'HospitalListing':
        return (
          <HospitalListing
            navigation={navigation}
            user={user}
          />
        );
      case 'DiseaseListing':
        return (
          <DiseaseListing
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'DiseaseDetails':
        return (
          <DiseaseDetails
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            diseaseId={routeParams.diseaseId}
            diseaseName={routeParams.diseaseName}
            diseaseCategory={routeParams.diseaseCategory}
            diseaseDescription={routeParams.diseaseDescription}
            diseaseSymptoms={routeParams.diseaseSymptoms}
            diseasePrevalence={routeParams.diseasePrevalence}
          />
        );
      case 'TrackOptions':
        return (
          <TrackOptions
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
            onContinue={(option) => {
              console.log('Track option selected:', option);
            }}
          />
        );
      case 'VaccineTracking':
        return (
          <VaccineTracking
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'ScreeningTracking':
        return (
          <ScreeningTracking
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'CycleTracking':
        return (
          <CycleTracking
            navigation={navigation}
            user={user}
            onSignOut={handleSignOut}
          />
        );
      default:
        return (
          <Welcome
            language={language}
            onSignInSuccess={handleSignInSuccess}
            navigation={navigation}
          />
        );
    }
  };

  return <View style={styles.container}>{renderRoute()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Routes;

