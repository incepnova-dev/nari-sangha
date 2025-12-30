import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Cycle Tracking</Text>
            <Text style={styles.headerSubtitle}>Track your menstrual cycle</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>📅</Text>
            <Text style={styles.summaryLabel}>Average Cycle</Text>
            <Text style={styles.summaryValue}>{cycleData.averageCycleLength} days</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>⏱️</Text>
            <Text style={styles.summaryLabel}>Period Length</Text>
            <Text style={styles.summaryValue}>{cycleData.averagePeriodLength} days</Text>
          </View>
        </View>

        {/* Predictions */}
        <View style={styles.predictionCard}>
          <Text style={styles.predictionTitle}>Upcoming Predictions</Text>
          <View style={styles.predictionItem}>
            <Text style={styles.predictionLabel}>📆 Next Period:</Text>
            <Text style={styles.predictionValue}>{cycleData.nextPeriodPredicted}</Text>
          </View>
          <View style={styles.predictionItem}>
            <Text style={styles.predictionLabel}>🥚 Next Ovulation:</Text>
            <Text style={styles.predictionValue}>{cycleData.nextOvulationPredicted}</Text>
          </View>
        </View>

        {/* Recent Cycles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Cycles</Text>
          <View style={styles.cyclesContainer}>
            {cycleData.recentCycles.map((cycle) => (
              <View key={cycle.id} style={styles.cycleCard}>
                <View style={styles.cycleHeader}>
                  <View style={styles.cycleDateContainer}>
                    <Text style={styles.cycleDate}>{cycle.date}</Text>
                    <Text style={styles.cycleDuration}>{cycle.duration} days</Text>
                  </View>
                  <View style={[styles.flowBadge, { backgroundColor: getFlowColor(cycle.flow) + '20' }]}>
                    <Text style={[styles.flowText, { color: getFlowColor(cycle.flow) }]}>
                      {getFlowText(cycle.flow)}
                    </Text>
                  </View>
                </View>
                {cycle.symptoms.length > 0 && (
                  <View style={styles.symptomsContainer}>
                    <Text style={styles.symptomsLabel}>Symptoms:</Text>
                    <View style={styles.symptomsList}>
                      {cycle.symptoms.map((symptom, index) => (
                        <View key={index} style={styles.symptomTag}>
                          <Text style={styles.symptomTagText}>{symptom}</Text>
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
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.logPeriodBtn} activeOpacity={0.8}>
            <Text style={styles.logPeriodBtnText}>📝 Log Period</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewCalendarBtn} activeOpacity={0.8}>
            <Text style={styles.viewCalendarBtnText}>📅 View Calendar</Text>
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
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    padding: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  headerSpacer: {
    width: 35,
  },
  summarySection: {
    flexDirection: 'row',
    gap: 15,
    padding: 20,
    paddingBottom: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#E91E63',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 15,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  predictionLabel: {
    fontSize: 14,
    color: '#666',
  },
  predictionValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  cyclesContainer: {
    gap: 12,
  },
  cycleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cycleDateContainer: {
    flex: 1,
  },
  cycleDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cycleDuration: {
    fontSize: 12,
    color: '#666',
  },
  flowBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  flowText: {
    fontSize: 12,
    fontWeight: '700',
  },
  symptomsContainer: {
    marginTop: 8,
  },
  symptomsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  symptomTag: {
    backgroundColor: '#FFF5F7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCE4EC',
  },
  symptomTagText: {
    fontSize: 11,
    color: '#E91E63',
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  logPeriodBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logPeriodBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  viewCalendarBtn: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E91E63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCalendarBtnText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CycleTracking;

