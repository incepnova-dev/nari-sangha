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
  screeningTrackingStyles,
  colors,
  icons,
} from '../styles';
import { mockScreenings, Screening } from '../__mocks__/ScreeningTracking.mock';

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

  const screenings: Screening[] = mockScreenings;

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
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 24 }]}>Screening Tracking</Text>
            <Text style={headerStyles.headerSubtitle}>Manage your health screenings</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Summary Card */}
        <View style={screeningTrackingStyles.summaryCard}>
          <Text style={screeningTrackingStyles.summaryTitle}>Screening Summary</Text>
          <View style={screeningTrackingStyles.summaryStats}>
            <View style={screeningTrackingStyles.statItem}>
              <Text style={screeningTrackingStyles.statNumber}>{screenings.filter(s => s.status === 'completed').length}</Text>
              <Text style={screeningTrackingStyles.statLabel}>Completed</Text>
            </View>
            <View style={screeningTrackingStyles.statItem}>
              <Text style={screeningTrackingStyles.statNumber}>{screenings.filter(s => s.status === 'upcoming').length}</Text>
              <Text style={screeningTrackingStyles.statLabel}>Upcoming</Text>
            </View>
            <View style={screeningTrackingStyles.statItem}>
              <Text style={screeningTrackingStyles.statNumber}>{screenings.filter(s => s.status === 'overdue').length}</Text>
              <Text style={screeningTrackingStyles.statLabel}>Overdue</Text>
            </View>
          </View>
        </View>

        {/* Screening Cards */}
        <View style={screeningTrackingStyles.screeningsContainer}>
          {screenings.map((screening) => (
            <View key={screening.id} style={screeningTrackingStyles.screeningCard}>
              <View style={screeningTrackingStyles.screeningHeader}>
                <View style={screeningTrackingStyles.screeningIcon}>
                  <Text style={screeningTrackingStyles.screeningIconText}>{screening.icon}</Text>
                </View>
                <View style={screeningTrackingStyles.screeningInfo}>
                  <Text style={screeningTrackingStyles.screeningName}>{screening.name}</Text>
                  <View style={[screeningTrackingStyles.statusBadge, { backgroundColor: getStatusColor(screening.status) + '20' }]}>
                    <Text style={[screeningTrackingStyles.statusText, { color: getStatusColor(screening.status) }]}>
                      {getStatusText(screening.status)}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={screeningTrackingStyles.screeningDescription}>{screening.description}</Text>
              <View style={screeningTrackingStyles.screeningDetails}>
                <View style={screeningTrackingStyles.detailRow}>
                  <Text style={screeningTrackingStyles.detailLabel}>Frequency:</Text>
                  <Text style={screeningTrackingStyles.detailValue}>{screening.recommendedFrequency}</Text>
                </View>
                {screening.lastScreening && (
                  <View style={screeningTrackingStyles.detailRow}>
                    <Text style={screeningTrackingStyles.detailLabel}>Last Screening:</Text>
                    <Text style={screeningTrackingStyles.detailValue}>{screening.lastScreening}</Text>
                  </View>
                )}
                {screening.nextDueDate && (
                  <View style={screeningTrackingStyles.detailRow}>
                    <Text style={screeningTrackingStyles.detailLabel}>Next Due:</Text>
                    <Text style={[screeningTrackingStyles.detailValue, { color: getStatusColor(screening.status), fontWeight: '700' }]}>
                      {screening.nextDueDate}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={screeningTrackingStyles.actionButton} activeOpacity={0.8}>
                <Text style={screeningTrackingStyles.actionButtonText}>
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

export default ScreeningTracking;

