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
  vaccineTrackingStyles,
  colors,
} from '../styles';

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
    <View style={containerStyles.container}>
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
        contentContainerStyle={containerStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerWithBackground}>
          <TouchableOpacity style={headerStyles.backButtonOnPrimary} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonTextWhite}>←</Text>
          </TouchableOpacity>
          <View style={headerStyles.headerContent}>
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 24 }]}>Vaccine Tracking</Text>
            <Text style={headerStyles.headerSubtitle}>Manage your vaccination schedule</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Summary Card */}
        <View style={vaccineTrackingStyles.summaryCard}>
          <Text style={vaccineTrackingStyles.summaryTitle}>Vaccination Summary</Text>
          <View style={vaccineTrackingStyles.summaryStats}>
            <View style={vaccineTrackingStyles.statItem}>
              <Text style={vaccineTrackingStyles.statNumber}>{vaccines.filter(v => v.status === 'completed').length}</Text>
              <Text style={vaccineTrackingStyles.statLabel}>Completed</Text>
            </View>
            <View style={vaccineTrackingStyles.statItem}>
              <Text style={vaccineTrackingStyles.statNumber}>{vaccines.filter(v => v.status === 'upcoming').length}</Text>
              <Text style={vaccineTrackingStyles.statLabel}>Upcoming</Text>
            </View>
            <View style={vaccineTrackingStyles.statItem}>
              <Text style={vaccineTrackingStyles.statNumber}>{vaccines.filter(v => v.status === 'due').length}</Text>
              <Text style={vaccineTrackingStyles.statLabel}>Due Soon</Text>
            </View>
          </View>
        </View>

        {/* Vaccine Cards */}
        <View style={vaccineTrackingStyles.vaccinesContainer}>
          {vaccines.map((vaccine) => (
            <View key={vaccine.id} style={vaccineTrackingStyles.vaccineCard}>
              <View style={vaccineTrackingStyles.vaccineHeader}>
                <View style={vaccineTrackingStyles.vaccineIcon}>
                  <Text style={vaccineTrackingStyles.vaccineIconText}>{vaccine.icon}</Text>
                </View>
                <View style={vaccineTrackingStyles.vaccineInfo}>
                  <Text style={vaccineTrackingStyles.vaccineName}>{vaccine.name}</Text>
                  <View style={[vaccineTrackingStyles.statusBadge, { backgroundColor: getStatusColor(vaccine.status) + '20' }]}>
                    <Text style={[vaccineTrackingStyles.statusText, { color: getStatusColor(vaccine.status) }]}>
                      {getStatusText(vaccine.status)}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={vaccineTrackingStyles.vaccineDescription}>{vaccine.description}</Text>
              <View style={vaccineTrackingStyles.vaccineDetails}>
                <View style={vaccineTrackingStyles.detailRow}>
                  <Text style={vaccineTrackingStyles.detailLabel}>Recommended Age:</Text>
                  <Text style={vaccineTrackingStyles.detailValue}>{vaccine.recommendedAge}</Text>
                </View>
                <View style={vaccineTrackingStyles.detailRow}>
                  <Text style={vaccineTrackingStyles.detailLabel}>Doses:</Text>
                  <Text style={vaccineTrackingStyles.detailValue}>{vaccine.doses}</Text>
                </View>
                {vaccine.nextDueDate && (
                  <View style={vaccineTrackingStyles.detailRow}>
                    <Text style={vaccineTrackingStyles.detailLabel}>Next Due Date:</Text>
                    <Text style={[vaccineTrackingStyles.detailValue, { color: colors.primary, fontWeight: '700' }]}>
                      {vaccine.nextDueDate}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={vaccineTrackingStyles.actionButton} activeOpacity={0.8}>
                <Text style={vaccineTrackingStyles.actionButtonText}>
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

export default VaccineTracking;

