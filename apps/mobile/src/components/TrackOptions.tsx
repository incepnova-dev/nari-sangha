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

interface TrackOptionsProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
  onContinue?: (option: 'vaccine' | 'screening' | 'cycle') => void;
}

const TrackOptions: React.FC<TrackOptionsProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<'vaccine' | 'screening' | 'cycle'>('vaccine');

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const handleContinue = () => {
    onContinue?.(selectedOption);
    // Navigate to appropriate screen based on selection
    switch (selectedOption) {
      case 'vaccine':
        navigation?.navigate('VaccineTracking');
        break;
      case 'screening':
        navigation?.navigate('ScreeningTracking');
        break;
      case 'cycle':
        navigation?.navigate('CycleTracking');
        break;
      default:
        console.log('Selected option:', selectedOption);
    }
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'track') {
      // Already on track screen
      return;
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <WelcomeHeader
        userName={userName}
        navigation={navigation}
        user={user}
        onSignOut={onSignOut}
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
          <Text style={styles.headerTitle}>Track</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>What would you like to track?</Text>
        <Text style={styles.sectionSubtitle}>
          Choose the type of health tracking you want to manage
        </Text>

        {/* Option Cards */}
        <View style={styles.optionCards}>
          {/* Vaccine */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'vaccine' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('vaccine')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>💉</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Vaccine</Text>
                <Text style={styles.optionSubtext}>Vaccination Schedule & Records</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Track vaccination history</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Get reminders for upcoming vaccines</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Maintain vaccination records</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Screening */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'screening' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('screening')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>🩺</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Screening</Text>
                <Text style={styles.optionSubtext}>Health Screening & Checkups</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Schedule health screenings</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Track screening results</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Get reminders for checkups</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Cycle */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'cycle' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('cycle')}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>📅</Text>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>Cycle</Text>
                <Text style={styles.optionSubtext}>Menstrual Cycle Tracking</Text>
              </View>
            </View>
            <View style={styles.optionFeatures}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Track menstrual cycles</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Monitor cycle patterns</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Predict periods and ovulation</Text>
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
        activeScreen="track"
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

export default TrackOptions;

