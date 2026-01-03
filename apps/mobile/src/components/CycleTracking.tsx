import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  cycleTrackingStyles,
} from '../styles';

interface CycleEntry {
  id: string;
  date: string;
  duration: number;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
}

interface CycleTrackingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const CycleTracking: React.FC<CycleTrackingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));

  // Sample cycle data
  const cycleData = {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    lastPeriod: '2024-01-15',
    nextPeriodPredicted: '2024-02-12',
    nextOvulationPredicted: '2024-01-29',
    recentCycles: [
      {
        id: '1',
        date: '2024-01-15',
        duration: 5,
        flow: 'medium' as const,
        symptoms: ['Cramps', 'Bloating'],
      },
      {
        id: '2',
        date: '2023-12-18',
        duration: 4,
        flow: 'light' as const,
        symptoms: ['Mild cramps'],
      },
      {
        id: '3',
        date: '2023-11-20',
        duration: 6,
        flow: 'heavy' as const,
        symptoms: ['Cramps', 'Headache', 'Fatigue'],
      },
    ],
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else {
      console.log('Navigate to:', screen);
    }
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'heavy':
        return '#E91E63';
      default:
        return '#999';
    }
  };

  const getFlowText = (flow: string) => {
    switch (flow) {
      case 'light':
        return 'Light';
      case 'medium':
        return 'Medium';
      case 'heavy':
        return 'Heavy';
      default:
        return flow;
    }
  };

  return (
    <View style={containerStyles.containerSecondary}>
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
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerWithBackground}>
          <TouchableOpacity style={headerStyles.backButtonOnPrimary} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonTextWhite}>←</Text>
          </TouchableOpacity>
          <View style={headerStyles.headerContent}>
            <Text style={headerStyles.headerTitleWhite}>Cycle Tracking</Text>
            <Text style={headerStyles.headerSubtitle}>Track your menstrual cycle</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Summary Cards */}
        <View style={cycleTrackingStyles.summarySection}>
          <View style={cycleTrackingStyles.summaryCard}>
            <Text style={cycleTrackingStyles.summaryIcon}>📅</Text>
            <Text style={cycleTrackingStyles.summaryLabel}>Average Cycle</Text>
            <Text style={cycleTrackingStyles.summaryValue}>{cycleData.averageCycleLength} days</Text>
          </View>
          <View style={cycleTrackingStyles.summaryCard}>
            <Text style={cycleTrackingStyles.summaryIcon}>⏱️</Text>
            <Text style={cycleTrackingStyles.summaryLabel}>Period Length</Text>
            <Text style={cycleTrackingStyles.summaryValue}>{cycleData.averagePeriodLength} days</Text>
          </View>
        </View>

        {/* Predictions */}
        <View style={cycleTrackingStyles.predictionCard}>
          <Text style={cycleTrackingStyles.predictionTitle}>Upcoming Predictions</Text>
          <View style={cycleTrackingStyles.predictionItem}>
            <Text style={cycleTrackingStyles.predictionLabel}>📆 Next Period:</Text>
            <Text style={cycleTrackingStyles.predictionValue}>{cycleData.nextPeriodPredicted}</Text>
          </View>
          <View style={cycleTrackingStyles.predictionItem}>
            <Text style={cycleTrackingStyles.predictionLabel}>🥚 Next Ovulation:</Text>
            <Text style={cycleTrackingStyles.predictionValue}>{cycleData.nextOvulationPredicted}</Text>
          </View>
        </View>

        {/* Recent Cycles */}
        <View style={cycleTrackingStyles.section}>
          <Text style={headerStyles.sectionTitleLarge}>Recent Cycles</Text>
          <View style={cycleTrackingStyles.cyclesContainer}>
            {cycleData.recentCycles.map((cycle) => (
              <View key={cycle.id} style={cycleTrackingStyles.cycleCard}>
                <View style={cycleTrackingStyles.cycleHeader}>
                  <View style={cycleTrackingStyles.cycleDateContainer}>
                    <Text style={cycleTrackingStyles.cycleDate}>{cycle.date}</Text>
                    <Text style={cycleTrackingStyles.cycleDuration}>{cycle.duration} days</Text>
                  </View>
                  <View style={[cycleTrackingStyles.flowBadge, { backgroundColor: getFlowColor(cycle.flow) + '20' }]}>
                    <Text style={[cycleTrackingStyles.flowText, { color: getFlowColor(cycle.flow) }]}>
                      {getFlowText(cycle.flow)}
                    </Text>
                  </View>
                </View>
                {cycle.symptoms.length > 0 && (
                  <View style={cycleTrackingStyles.symptomsContainer}>
                    <Text style={cycleTrackingStyles.symptomsLabel}>Symptoms:</Text>
                    <View style={cycleTrackingStyles.symptomsList}>
                      {cycle.symptoms.map((symptom, index) => (
                        <View key={index} style={cycleTrackingStyles.symptomTag}>
                          <Text style={cycleTrackingStyles.symptomTagText}>{symptom}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={cycleTrackingStyles.actionButtons}>
          <TouchableOpacity style={cycleTrackingStyles.logPeriodBtn} activeOpacity={0.8}>
            <Text style={cycleTrackingStyles.logPeriodBtnText}>📝 Log Period</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cycleTrackingStyles.viewCalendarBtn} activeOpacity={0.8}>
            <Text style={cycleTrackingStyles.viewCalendarBtnText}>📅 View Calendar</Text>
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

export default CycleTracking;

