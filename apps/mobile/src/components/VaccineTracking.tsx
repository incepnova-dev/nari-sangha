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

interface Vaccine {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedAge: string;
  doses: string;
  nextDueDate?: string;
  status: 'completed' | 'upcoming' | 'due';
}

interface VaccineTrackingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const VaccineTracking: React.FC<VaccineTrackingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const vaccines: Vaccine[] = [
    {
      id: '1',
      name: 'HPV Vaccine',
      icon: '💉',
      description: 'Protects against Human Papillomavirus, which can cause cervical cancer',
      recommendedAge: '9-26 years',
      doses: '2-3 doses',
      nextDueDate: '2024-03-15',
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Tetanus, Diphtheria, Pertussis (Tdap)',
      icon: '🛡️',
      description: 'Booster vaccine recommended every 10 years',
      recommendedAge: 'Adults',
      doses: '1 dose',
      nextDueDate: '2024-06-20',
      status: 'upcoming',
    },
    {
      id: '3',
      name: 'Influenza (Flu)',
      icon: '🤧',
      description: 'Annual flu vaccine recommended for all adults',
      recommendedAge: 'All ages',
      doses: '1 dose annually',
      nextDueDate: '2024-10-01',
      status: 'due',
    },
    {
      id: '4',
      name: 'COVID-19',
      icon: '🦠',
      description: 'COVID-19 vaccine and booster shots',
      recommendedAge: 'All ages',
      doses: '2-3 doses + boosters',
      status: 'completed',
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
      case 'due':
        return '#E91E63';
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
      case 'due':
        return 'Due Soon';
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
            <Text style={styles.headerTitle}>Vaccine Tracking</Text>
            <Text style={styles.headerSubtitle}>Manage your vaccination schedule</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Vaccination Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{vaccines.filter(v => v.status === 'completed').length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{vaccines.filter(v => v.status === 'upcoming').length}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{vaccines.filter(v => v.status === 'due').length}</Text>
              <Text style={styles.statLabel}>Due Soon</Text>
            </View>
          </View>
        </View>

        {/* Vaccine Cards */}
        <View style={styles.vaccinesContainer}>
          {vaccines.map((vaccine) => (
            <View key={vaccine.id} style={styles.vaccineCard}>
              <View style={styles.vaccineHeader}>
                <View style={styles.vaccineIcon}>
                  <Text style={styles.vaccineIconText}>{vaccine.icon}</Text>
                </View>
                <View style={styles.vaccineInfo}>
                  <Text style={styles.vaccineName}>{vaccine.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vaccine.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(vaccine.status) }]}>
                      {getStatusText(vaccine.status)}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
              <View style={styles.vaccineDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Recommended Age:</Text>
                  <Text style={styles.detailValue}>{vaccine.recommendedAge}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Doses:</Text>
                  <Text style={styles.detailValue}>{vaccine.doses}</Text>
                </View>
                {vaccine.nextDueDate && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next Due Date:</Text>
                    <Text style={[styles.detailValue, { color: '#E91E63', fontWeight: '700' }]}>
                      {vaccine.nextDueDate}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                <Text style={styles.actionButtonText}>
                  {vaccine.status === 'completed' ? 'View Record' : 'Schedule Appointment'}
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
  vaccinesContainer: {
    padding: 20,
    gap: 15,
  },
  vaccineCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  vaccineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 15,
  },
  vaccineIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vaccineIconText: {
    fontSize: 30,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineName: {
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
  vaccineDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  vaccineDetails: {
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

export default VaccineTracking;

