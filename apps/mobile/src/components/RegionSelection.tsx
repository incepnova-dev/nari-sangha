import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  containerStyles,
  headerStyles,
  buttons,
  regionSelectionStyles,
  colors,
} from '../styles';

interface RegionSelectionProps {
  navigation?: any;
  onBack?: () => void;
  onContinue?: (region: 'india' | 'global') => void;
}

const RegionSelection: React.FC<RegionSelectionProps> = ({
  navigation,
  onBack,
  onContinue,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'india' | 'global'>('india');

  const handleContinue = () => {
    onContinue?.(selectedRegion);
    if (selectedRegion === 'india') {
      navigation?.navigate('SignUpIndiaPhone');
    } else {
      navigation?.navigate('SignUpGlobalEmail');
    }
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={[containerStyles.scrollContentSmall, { paddingTop: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Select Your Region</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Where are you from?</Text>
        <Text style={headerStyles.sectionSubtitle}>
          We'll customize your experience based on your location
        </Text>

        {/* Region Cards */}
        <View style={regionSelectionStyles.regionCards}>
          <TouchableOpacity
            style={[
              regionSelectionStyles.regionCard,
              selectedRegion === 'india' && regionSelectionStyles.regionCardSelected,
            ]}
            onPress={() => setSelectedRegion('india')}
          >
            <View style={regionSelectionStyles.regionHeader}>
              <Text style={regionSelectionStyles.regionFlag}>🇮🇳</Text>
              <View style={regionSelectionStyles.regionInfo}>
                <Text style={regionSelectionStyles.regionName}>India</Text>
                <Text style={regionSelectionStyles.regionSubtext}>भारतीय उपयोगकर्ता</Text>
              </View>
            </View>
            <View style={regionSelectionStyles.regionFeatures}>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>Phone number + OTP (Primary)</Text>
              </View>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>Regional language support</Text>
              </View>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>Aadhaar verification (optional)</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              regionSelectionStyles.regionCard,
              selectedRegion === 'global' && regionSelectionStyles.regionCardSelected,
            ]}
            onPress={() => setSelectedRegion('global')}
          >
            <View style={regionSelectionStyles.regionHeader}>
              <Text style={regionSelectionStyles.regionFlag}>🌍</Text>
              <View style={regionSelectionStyles.regionInfo}>
                <Text style={regionSelectionStyles.regionName}>Global</Text>
                <Text style={regionSelectionStyles.regionSubtext}>International users</Text>
              </View>
            </View>
            <View style={regionSelectionStyles.regionFeatures}>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>Email or phone signup</Text>
              </View>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>Multi-language support</Text>
              </View>
              <View style={regionSelectionStyles.featureItem}>
                <Text style={regionSelectionStyles.featureIcon}>✓</Text>
                <Text style={regionSelectionStyles.featureText}>International standards</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={regionSelectionStyles.btnContainer}>
          <TouchableOpacity style={[buttons.buttonFullWidth, buttons.primaryButton]} onPress={handleContinue}>
            <Text style={buttons.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegionSelection;

