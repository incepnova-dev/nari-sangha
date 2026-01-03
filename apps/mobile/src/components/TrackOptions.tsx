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
  trackOptionsStyles,
  colors,
  icons,
} from '../styles';

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
        contentContainerStyle={[containerStyles.scrollContent, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Track</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>What would you like to track?</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose the type of health tracking you want to manage
        </Text>

        {/* Option Cards */}
        <View style={trackOptionsStyles.optionCards}>
          {/* Vaccine */}
          <TouchableOpacity
            style={[
              trackOptionsStyles.optionCard,
              selectedOption === 'vaccine' && trackOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('vaccine')}
          >
            <View style={trackOptionsStyles.optionHeader}>
              <Text style={trackOptionsStyles.optionIcon}>{icons.vaccine}</Text>
              <View style={trackOptionsStyles.optionInfo}>
                <Text style={trackOptionsStyles.optionName}>Vaccine</Text>
                <Text style={trackOptionsStyles.optionSubtext}>Vaccination Schedule & Records</Text>
              </View>
            </View>
            <View style={trackOptionsStyles.optionFeatures}>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Track vaccination history</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Get reminders for upcoming vaccines</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Maintain vaccination records</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Screening */}
          <TouchableOpacity
            style={[
              trackOptionsStyles.optionCard,
              selectedOption === 'screening' && trackOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('screening')}
          >
            <View style={trackOptionsStyles.optionHeader}>
              <Text style={trackOptionsStyles.optionIcon}>{icons.screening}</Text>
              <View style={trackOptionsStyles.optionInfo}>
                <Text style={trackOptionsStyles.optionName}>Screening</Text>
                <Text style={trackOptionsStyles.optionSubtext}>Health Screening & Checkups</Text>
              </View>
            </View>
            <View style={trackOptionsStyles.optionFeatures}>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Schedule health screenings</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Track screening results</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Get reminders for checkups</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Cycle */}
          <TouchableOpacity
            style={[
              trackOptionsStyles.optionCard,
              selectedOption === 'cycle' && trackOptionsStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('cycle')}
          >
            <View style={trackOptionsStyles.optionHeader}>
              <Text style={trackOptionsStyles.optionIcon}>{icons.calendar}</Text>
              <View style={trackOptionsStyles.optionInfo}>
                <Text style={trackOptionsStyles.optionName}>Cycle</Text>
                <Text style={trackOptionsStyles.optionSubtext}>Menstrual Cycle Tracking</Text>
              </View>
            </View>
            <View style={trackOptionsStyles.optionFeatures}>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Track menstrual cycles</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Monitor cycle patterns</Text>
              </View>
              <View style={trackOptionsStyles.featureItem}>
                <Text style={trackOptionsStyles.featureIcon}>{icons.checkmark}</Text>
                <Text style={trackOptionsStyles.featureText}>Predict periods and ovulation</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={trackOptionsStyles.btnContainer}>
          <TouchableOpacity style={[buttons.buttonFullWidth, buttons.primaryButton]} onPress={handleContinue}>
            <Text style={buttons.primaryButtonText}>Continue</Text>
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

export default TrackOptions;

