import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { welcomeStyles, buttons } from '../styles';

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
  const handleGetStarted = () => {
    // Navigate to region selection screen
    if (navigation) {
      navigation.navigate('RegionSelection');
    }
  };

  const handleSignInClick = () => {
    // Navigate to sign in screen
    if (navigation) {
      navigation.navigate('SignIn');
    }
  };

  // Get status bar height for Android, use safe default for iOS
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const paddingTop = statusBarHeight + 40; // 40 is the base padding

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={welcomeStyles.container}>
        <View style={[welcomeStyles.content, { paddingTop }]}>
          {/* Logo Container */}
          <View style={welcomeStyles.logoContainer}>
            <View style={welcomeStyles.appLogo}>
              <Text style={welcomeStyles.logoEmoji}>🌸</Text>
            </View>
            <Text style={welcomeStyles.appName}>
              Nari Swasthya{'\n'}Samuday
            </Text>
            <Text style={welcomeStyles.appTagline}>
              Your Trusted Women's Health Community
            </Text>
          </View>

          {/* Welcome Content */}
          <View style={welcomeStyles.welcomeContent}>
            <Text style={welcomeStyles.welcomeTitle}>Welcome!</Text>
            <Text style={welcomeStyles.welcomeDescription}>
              Join a safe, supportive community for women's health, wellness, and empowerment
            </Text>
          </View>

          {/* Buttons */}
          <View style={welcomeStyles.buttonsContainer}>
            <TouchableOpacity
              style={[buttons.buttonFullWidth, welcomeStyles.primaryButton]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={welcomeStyles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttons.buttonFullWidth, welcomeStyles.secondaryButton]}
              onPress={handleSignInClick}
              activeOpacity={0.8}
            >
              <Text style={welcomeStyles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative Circles */}
        <View style={welcomeStyles.decorativeCircle1} />
        <View style={welcomeStyles.decorativeCircle2} />
      </View>
    </>
  );
};

export default Welcome;

