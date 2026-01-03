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
  buttons,
  healthProfileSetupStyles,
} from '../styles';

interface HealthProfileSetupProps {
  navigation?: any;
  onBack?: () => void;
  onComplete?: (data: {
    trackMenstrualCycle: boolean;
    pregnancyTracking: boolean;
    vaccinationReminders: boolean;
    insuranceInformation: boolean;
    chronicConditions: boolean;
    selectedConditions: string[];
  }) => void;
  onSkip?: () => void;
}

const HealthProfileSetup: React.FC<HealthProfileSetupProps> = ({
  navigation,
  onBack,
  onComplete,
  onSkip,
}) => {
  const [trackMenstrualCycle, setTrackMenstrualCycle] = useState(false);
  const [pregnancyTracking, setPregnancyTracking] = useState(false);
  const [vaccinationReminders, setVaccinationReminders] = useState(false);
  const [insuranceInformation, setInsuranceInformation] = useState(false);
  const [chronicConditions, setChronicConditions] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const conditionTags = ['PCOS', 'Thyroid', 'Diabetes', 'Nutrition', 'Fitness', 'Mental Health'];

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleComplete = () => {
    onComplete?.({
      trackMenstrualCycle,
      pregnancyTracking,
      vaccinationReminders,
      insuranceInformation,
      chronicConditions,
      selectedConditions,
    });
    navigation?.navigate('HomeLanding');
  };

  const handleSkip = () => {
    onSkip?.();
    navigation?.navigate('HomeLanding');
  };

  const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
      style={[healthProfileSetupStyles.toggleSwitch, value && healthProfileSetupStyles.toggleSwitchActive]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View style={[healthProfileSetupStyles.toggleSwitchThumb, value && healthProfileSetupStyles.toggleSwitchThumbActive]} />
    </TouchableOpacity>
  );

  return (
    <View style={containerStyles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={healthProfileSetupStyles.screenHeader}>
        <Text style={healthProfileSetupStyles.headerTitle}>Nari Swasthya Samuday</Text>
        <Text style={healthProfileSetupStyles.headerSubtitle}>Women's Health Community</Text>
      </View>
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContentSmall}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={healthProfileSetupStyles.progressIndicator}>
          <Text style={healthProfileSetupStyles.progressText}>
            <Text style={healthProfileSetupStyles.progressDot}>⚫</Text> 4 of 4
          </Text>
        </View>

        {/* Title Section */}
        <View style={healthProfileSetupStyles.titleSection}>
          <Text style={healthProfileSetupStyles.title}>Health Profile (Optional)</Text>
          <Text style={healthProfileSetupStyles.subtitle}>Help us personalize your experience</Text>
        </View>

        {/* Profile Options */}
        <View style={healthProfileSetupStyles.profileOption}>
          <View style={healthProfileSetupStyles.optionLeft}>
            <View style={healthProfileSetupStyles.optionIcon}>
              <Text style={healthProfileSetupStyles.optionIconText}>🌸</Text>
            </View>
            <Text style={healthProfileSetupStyles.optionText}>Track Menstrual Cycle</Text>
          </View>
          <ToggleSwitch value={trackMenstrualCycle} onValueChange={setTrackMenstrualCycle} />
        </View>

        <View style={healthProfileSetupStyles.profileOption}>
          <View style={healthProfileSetupStyles.optionLeft}>
            <View style={healthProfileSetupStyles.optionIcon}>
              <Text style={healthProfileSetupStyles.optionIconText}>🤰</Text>
            </View>
            <Text style={healthProfileSetupStyles.optionText}>Pregnancy Tracking</Text>
          </View>
          <ToggleSwitch value={pregnancyTracking} onValueChange={setPregnancyTracking} />
        </View>

        <View style={healthProfileSetupStyles.profileOption}>
          <View style={healthProfileSetupStyles.optionLeft}>
            <View style={healthProfileSetupStyles.optionIcon}>
              <Text style={healthProfileSetupStyles.optionIconText}>💉</Text>
            </View>
            <Text style={healthProfileSetupStyles.optionText}>Vaccination Reminders</Text>
          </View>
          <ToggleSwitch value={vaccinationReminders} onValueChange={setVaccinationReminders} />
        </View>

        <View style={healthProfileSetupStyles.profileOption}>
          <View style={healthProfileSetupStyles.optionLeft}>
            <View style={healthProfileSetupStyles.optionIcon}>
              <Text style={healthProfileSetupStyles.optionIconText}>🛡️</Text>
            </View>
            <Text style={healthProfileSetupStyles.optionText}>Insurance Information</Text>
          </View>
          <ToggleSwitch value={insuranceInformation} onValueChange={setInsuranceInformation} />
        </View>

        <View style={healthProfileSetupStyles.profileOption}>
          <View style={healthProfileSetupStyles.optionLeft}>
            <View style={healthProfileSetupStyles.optionIcon}>
              <Text style={healthProfileSetupStyles.optionIconText}>💊</Text>
            </View>
            <Text style={healthProfileSetupStyles.optionText}>Chronic Conditions</Text>
          </View>
          <ToggleSwitch value={chronicConditions} onValueChange={setChronicConditions} />
        </View>

        {/* Condition Tags */}
        {chronicConditions && (
          <View style={healthProfileSetupStyles.conditionTags}>
            {conditionTags.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  healthProfileSetupStyles.conditionTag,
                  selectedConditions.includes(condition) && healthProfileSetupStyles.conditionTagSelected,
                ]}
                onPress={() => toggleCondition(condition)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    healthProfileSetupStyles.conditionTagText,
                    selectedConditions.includes(condition) && healthProfileSetupStyles.conditionTagTextSelected,
                  ]}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity style={healthProfileSetupStyles.actionButton} onPress={handleComplete} activeOpacity={0.8}>
          <Text style={healthProfileSetupStyles.actionButtonText}>Complete Setup</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={healthProfileSetupStyles.skipButton} onPress={handleSkip} activeOpacity={0.8}>
          <Text style={healthProfileSetupStyles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HealthProfileSetup;

