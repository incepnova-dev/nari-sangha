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

interface Screening {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedFrequency: string;
  lastScreening?: string;
  nextDueDate?: string;
  status: 'completed' | 'upcoming' | 'overdue';
}

interface ScreeningTrackingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const ScreeningTracking: React.FC<ScreeningTrackingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const screenings: Screening[] = [
    {
      id: '1',
      name: 'Pap Smear / Cervical Cancer Screening',
      icon: '🩺',
      description: 'Screening for cervical cancer and abnormal cells',
      recommendedFrequency: 'Every 3 years (21-65 years)',
      lastScreening: '2023-06-15',
      nextDueDate: '2026-06-15',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Mammogram',
      icon: '💗',
      description: 'Breast cancer screening using X-ray imaging',
      recommendedFrequency: 'Every 1-2 years (40+ years)',
      lastScreening: '2023-09-20',
      nextDueDate: '2024-09-20',
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'Bone Density Test',
      icon: '🦴',
      description: 'Osteoporosis screening for bone health',
      recommendedFrequency: 'Every 2 years (65+ years)',
      nextDueDate: '2024-05-10',
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'Blood Pressure Check',
      icon: '🩸',
      description: 'Regular blood pressure monitoring',
      recommendedFrequency: 'Annually',
      lastScreening: '2023-12-01',
      nextDueDate: '2024-12-01',
      status: 'upcoming',
    },
    {
      id: '5',
      name: 'Cholesterol Screening',
      icon: '🧪',
      description: 'Lipid profile and cholesterol levels',
      recommendedFrequency: 'Every 5 years (20+ years)',
      lastScreening: '2022-03-10',
      nextDueDate: '2024-03-10',
      status: 'overdue',
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'upcoming':
        return '#FF9800';
      case 'overdue':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'upcoming':
        return 'Upcoming';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
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
            <Text style={styles.headerTitle}>Screening Tracking</Text>
            <Text style={styles.headerSubtitle}>Manage your health screenings</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Screening Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{screenings.filter(s => s.status === 'completed').length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{screenings.filter(s => s.status === 'upcoming').length}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{screenings.filter(s => s.status === 'overdue').length}</Text>
              <Text style={styles.statLabel}>Overdue</Text>
            </View>
          </View>
        </View>

        {/* Screening Cards */}
        <View style={styles.screeningsContainer}>
          {screenings.map((screening) => (
            <View key={screening.id} style={styles.screeningCard}>
              <View style={styles.screeningHeader}>
                <View style={styles.screeningIcon}>
                  <Text style={styles.screeningIconText}>{screening.icon}</Text>
                </View>
                <View style={styles.screeningInfo}>
                  <Text style={styles.screeningName}>{screening.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(screening.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(screening.status) }]}>
                      {getStatusText(screening.status)}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.screeningDescription}>{screening.description}</Text>
              <View style={styles.screeningDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Frequency:</Text>
                  <Text style={styles.detailValue}>{screening.recommendedFrequency}</Text>
                </View>
                {screening.lastScreening && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Last Screening:</Text>
                    <Text style={styles.detailValue}>{screening.lastScreening}</Text>
                  </View>
                )}
                {screening.nextDueDate && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next Due:</Text>
                    <Text style={[styles.detailValue, { color: getStatusColor(screening.status), fontWeight: '700' }]}>
                      {screening.nextDueDate}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                <Text style={styles.actionButtonText}>
                  {screening.status === 'completed' ? 'View Results' : 'Schedule Screening'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
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
  summaryCard: {
    backgroundColor: '#E91E63',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    marginBottom: 15,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  screeningsContainer: {
    padding: 20,
    gap: 15,
  },
  screeningCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  screeningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 15,
  },
  screeningIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screeningIconText: {
    fontSize: 30,
  },
  screeningInfo: {
    flex: 1,
  },
  screeningName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  screeningDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  screeningDetails: {
    marginBottom: 15,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ScreeningTracking;

