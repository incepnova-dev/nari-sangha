import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import BottomMenuBar from './BottomMenuBar';
import WelcomeHeader from './WelcomeHeader';

interface DiscoverOptionsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
  onContinue?: (option: 'clinics' | 'doctors' | 'hospitals' | 'diseases') => void;
}

const DiscoverOptions: React.FC<DiscoverOptionsProps> = ({
  navigation,
  user,
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
        navigation?.navigate('DiseaseListing');
        break;
      default:
        console.log('Selected option:', selectedOption);
    }
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'discover') {
      // Already on discover screen
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else {
      console.log('Navigate to:', screen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <WelcomeHeader
        userName={userName}
        onProfilePress={() => {
          navigation?.navigate('Profile');
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>What are you looking for?</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the type of healthcare service you want to explore
        </Text>

        {/* Option Cards */}
        <View style={styles.optionCards}>
          {/* Clinics */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'clinics' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('clinics')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>🏥</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Clinics</Text>
                <Text style={styles.optionSubtext}>Medical Clinics & Centers</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>General Practice Clinics</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Specialty Clinics</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Women's Health Centers</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Doctors */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'doctors' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('doctors')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>👩‍⚕️</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Doctors</Text>
                <Text style={styles.optionSubtext}>Find Healthcare Professionals</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Gynecologists</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>General Practitioners</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Specialists</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Hospitals */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'hospitals' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('hospitals')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>🏨</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Hospitals</Text>
                <Text style={styles.optionSubtext}>Multi-Specialty Hospitals</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Emergency Services</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Maternity Wards</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Specialized Care Units</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Diseases */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'diseases' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('diseases')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>🩺</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Diseases</Text>
                <Text style={styles.optionSubtext}>Health Conditions & Information</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Women's Health Conditions</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Symptoms & Diagnosis</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Treatment Information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleContinue}>
            <Text style={styles.btnText}>Continue</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 100, // Adjusted for BottomMenuBar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  optionCards: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF5F7',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  optionIcon: {
    fontSize: 40,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  optionFeatures: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureIcon: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#555',
  },
  btnContainer: {
    marginTop: 20,
    paddingTop: 20,
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#E91E63',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default DiscoverOptions;

