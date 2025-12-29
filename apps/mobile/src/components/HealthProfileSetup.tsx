import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

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
      style={[styles.toggleSwitch, value && styles.toggleSwitchActive]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View style={[styles.toggleSwitchThumb, value && styles.toggleSwitchThumbActive]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screenHeader}>
        <Text style={styles.headerTitle}>Nari Swasthya Samuday</Text>
        <Text style={styles.headerSubtitle}>Women's Health Community</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressIndicator}>
          <Text style={styles.progressText}>
            <Text style={styles.progressDot}>⚫</Text> 4 of 4
          </Text>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Health Profile (Optional)</Text>
          <Text style={styles.subtitle}>Help us personalize your experience</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.profileOption}>
          <View style={styles.optionLeft}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>🌸</Text>
            </View>
            <Text style={styles.optionText}>Track Menstrual Cycle</Text>
          </View>
          <ToggleSwitch value={trackMenstrualCycle} onValueChange={setTrackMenstrualCycle} />
        </View>

        <View style={styles.profileOption}>
          <View style={styles.optionLeft}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>🤰</Text>
            </View>
            <Text style={styles.optionText}>Pregnancy Tracking</Text>
          </View>
          <ToggleSwitch value={pregnancyTracking} onValueChange={setPregnancyTracking} />
        </View>

        <View style={styles.profileOption}>
          <View style={styles.optionLeft}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>💉</Text>
            </View>
            <Text style={styles.optionText}>Vaccination Reminders</Text>
          </View>
          <ToggleSwitch value={vaccinationReminders} onValueChange={setVaccinationReminders} />
        </View>

        <View style={styles.profileOption}>
          <View style={styles.optionLeft}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>🛡️</Text>
            </View>
            <Text style={styles.optionText}>Insurance Information</Text>
          </View>
          <ToggleSwitch value={insuranceInformation} onValueChange={setInsuranceInformation} />
        </View>

        <View style={styles.profileOption}>
          <View style={styles.optionLeft}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>💊</Text>
            </View>
            <Text style={styles.optionText}>Chronic Conditions</Text>
          </View>
          <ToggleSwitch value={chronicConditions} onValueChange={setChronicConditions} />
        </View>

        {/* Condition Tags */}
        {chronicConditions && (
          <View style={styles.conditionTags}>
            {conditionTags.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  styles.conditionTag,
                  selectedConditions.includes(condition) && styles.conditionTagSelected,
                ]}
                onPress={() => toggleCondition(condition)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.conditionTagText,
                    selectedConditions.includes(condition) && styles.conditionTagTextSelected,
                  ]}
                >
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleComplete} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>Complete Setup</Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.8}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  screenHeader: {
    backgroundColor: '#E91E63',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  progressIndicator: {
    alignItems: 'center',
    padding: 15,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressDot: {
    color: '#E91E63',
    fontWeight: '700',
  },
  titleSection: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  profileOption: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  optionIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#FCE4EC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    backgroundColor: '#DDD',
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#E91E63',
  },
  toggleSwitchThumb: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  toggleSwitchThumbActive: {
    alignSelf: 'flex-end',
  },
  conditionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 20,
  },
  conditionTag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  conditionTagSelected: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  conditionTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  conditionTagTextSelected: {
    color: 'white',
  },
  actionButton: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E91E63',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  skipButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#999',
  },
});

export default HealthProfileSetup;

