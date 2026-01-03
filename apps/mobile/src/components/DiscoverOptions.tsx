import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import BottomMenuBar from './BottomMenuBar';
import WelcomeHeader from './WelcomeHeader';
import {
  containerStyles,
  headerStyles,
  buttons,
  discoverOptionsStyles,
  colors,
} from '../styles';

interface DiscoverOptionsProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
  onContinue?: (option: 'clinics' | 'doctors' | 'hospitals' | 'diseases') => void;
}

const DiscoverOptions: React.FC<DiscoverOptionsProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<'clinics' | 'doctors' | 'hospitals' | 'diseases'>('clinics');

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const handleContinue = () => {
    onContinue?.(selectedOption);
    // Navigate to appropriate screen based on selection
    switch (selectedOption) {
      case 'clinics':
        navigation?.navigate('ClinicListing');
        break;
      case 'doctors':
        navigation?.navigate('DoctorListing');
        break;
      case 'hospitals':
        navigation?.navigate('HospitalListing');
        break;
      case 'diseases':
        navigation?.navigate('KnowledgeHub');
        break;
      default:
        console.log('Selected option:', selectedOption);
    }
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'discover') {
      // Already on discover screen
      return;
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="light-content" />

      <WelcomeHeader
        userName={userName}
        navigation={navigation}
        user={user}
        {...(onSignOut ? { onSignOut } : {})}
        onProfilePress={() => {
          navigation?.navigate('Profile');
        }}
      />

      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Discover</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>What are you looking for?</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose the type of healthcare service you want to explore
        </Text>

        {/* Option Cards */}
        <View style={discoverOptionsStyles.optionCards}>
          {/* Clinics */}
          <TouchableOpacity
            style={[
              discoverOptionsStyles.optionCard,
              selectedOption === 'clinics' && discoverOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('clinics')}
          >
            <View style={discoverOptionsStyles.optionHeader}>
              <Text style={discoverOptionsStyles.optionIcon}>🏥</Text>
              <View style={discoverOptionsStyles.optionInfo}>
                <Text style={discoverOptionsStyles.optionName}>Clinics</Text>
                <Text style={discoverOptionsStyles.optionSubtext}>Medical Clinics & Centers</Text>
              </View>
            </View>
            <View style={discoverOptionsStyles.optionFeatures}>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>General Practice Clinics</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Specialty Clinics</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Women's Health Centers</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Doctors */}
          <TouchableOpacity
            style={[
              discoverOptionsStyles.optionCard,
              selectedOption === 'doctors' && discoverOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('doctors')}
          >
            <View style={discoverOptionsStyles.optionHeader}>
              <Text style={discoverOptionsStyles.optionIcon}>👩‍⚕️</Text>
              <View style={discoverOptionsStyles.optionInfo}>
                <Text style={discoverOptionsStyles.optionName}>Doctors</Text>
                <Text style={discoverOptionsStyles.optionSubtext}>Find Healthcare Professionals</Text>
              </View>
            </View>
            <View style={discoverOptionsStyles.optionFeatures}>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Gynecologists</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>General Practitioners</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Specialists</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Hospitals */}
          <TouchableOpacity
            style={[
              discoverOptionsStyles.optionCard,
              selectedOption === 'hospitals' && discoverOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('hospitals')}
          >
            <View style={discoverOptionsStyles.optionHeader}>
              <Text style={discoverOptionsStyles.optionIcon}>🏨</Text>
              <View style={discoverOptionsStyles.optionInfo}>
                <Text style={discoverOptionsStyles.optionName}>Hospitals</Text>
                <Text style={discoverOptionsStyles.optionSubtext}>Multi-Specialty Hospitals</Text>
              </View>
            </View>
            <View style={discoverOptionsStyles.optionFeatures}>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Emergency Services</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Maternity Wards</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Specialized Care Units</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Diseases */}
          <TouchableOpacity
            style={[
              discoverOptionsStyles.optionCard,
              selectedOption === 'diseases' && discoverOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('diseases')}
          >
            <View style={discoverOptionsStyles.optionHeader}>
              <Text style={discoverOptionsStyles.optionIcon}>🩺</Text>
              <View style={discoverOptionsStyles.optionInfo}>
                <Text style={discoverOptionsStyles.optionName}>Health Knowledge Hub</Text>
                <Text style={discoverOptionsStyles.optionSubtext}>Health Conditions & Information</Text>
              </View>
            </View>
            <View style={discoverOptionsStyles.optionFeatures}>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Women's Health Conditions</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Symptoms & Diagnosis</Text>
              </View>
              <View style={discoverOptionsStyles.featureItem}>
                <Text style={discoverOptionsStyles.featureIcon}>✓</Text>
                <Text style={discoverOptionsStyles.featureText}>Treatment Information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={discoverOptionsStyles.btnContainer}>
          <TouchableOpacity style={[buttons.buttonFullWidth, buttons.primaryButton]} onPress={handleContinue}>
            <Text style={buttons.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="discover"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default DiscoverOptions;

