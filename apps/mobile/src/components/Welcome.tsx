import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import LoginModal from './auth/LoginModal';
import SignUpModal from './auth/SignUpModal';

type RouteName = 'Welcome' | 'Home' | 'SignUpIndiaPhone' | 'SignUpGlobalEmail' | 'Success';

interface WelcomeProps {
  language?: string;
  onSignInSuccess?: (userData: any) => void;
  navigation?: {
    navigate: (route: RouteName | string) => void;
    goBack: () => void;
  };
}

const Welcome: React.FC<WelcomeProps> = ({
  language = 'en',
  onSignInSuccess,
  navigation,
}) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);

  const handleGetStarted = () => {
    // Navigate to region selection screen
    if (navigation) {
      navigation.navigate('RegionSelection');
    } else {
      setIsSignUpModalOpen(true);
    }
  };

  const handleSignInClick = () => {
    // Navigate to sign in screen
    if (navigation) {
      navigation.navigate('SignIn');
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignInSuccess = (userData: any) => {
    setIsSignInModalOpen(false);
    if (onSignInSuccess) {
      onSignInSuccess(userData);
    }
  };

  // Get status bar height for Android, use safe default for iOS
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const paddingTop = statusBarHeight + 40; // 40 is the base padding

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={[styles.content, { paddingTop }]}>
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <View style={styles.appLogo}>
              <Text style={styles.logoEmoji}>🌸</Text>
            </View>
            <Text style={styles.appName}>
              Nari Swasthya{'\n'}Samuday
            </Text>
            <Text style={styles.appTagline}>
              Your Trusted Women's Health Community
            </Text>
          </View>

          {/* Welcome Content */}
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeDescription}>
              Join a safe, supportive community for women's health, wellness, and empowerment
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleSignInClick}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative Circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>

      <LoginModal
        isOpen={isSignInModalOpen}
        onClose={handleCloseSignInModal}
        language={language}
        onLogInSuccess={handleSignInSuccess}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        language={language}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E91E63', // Primary pink color as fallback
    // For gradient effect, you can install react-native-linear-gradient
    // or use expo-linear-gradient if using Expo
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  appLogo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  appTagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    width: '100%',
    zIndex: 1,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 0,
  },
  primaryButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default Welcome;

