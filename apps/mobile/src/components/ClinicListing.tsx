import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  clinicListingStyles,
  colors,
  icons,
} from '../styles';
import { mockClinics, Clinic } from '../__mocks__/ClinicListing.mock';

interface ClinicListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const ClinicListing: React.FC<ClinicListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const clinics: Clinic[] = mockClinics;

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '🌟' : '') + '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
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
            <Text style={headerStyles.headerTitleWhite}>Clinics</Text>
            <Text style={headerStyles.headerSubtitle}>Find nearby medical clinics</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={clinicListingStyles.searchBar}>
          <Text style={clinicListingStyles.searchIcon}>{icons.search}</Text>
          <TextInput
            style={clinicListingStyles.searchInput}
            placeholder="Search clinics by name or specialty..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Clinic Cards */}
        <View style={clinicListingStyles.clinicsContainer}>
          {filteredClinics.map((clinic) => (
            <TouchableOpacity key={clinic.id} style={clinicListingStyles.clinicCard} activeOpacity={0.8}>
              <View style={clinicListingStyles.clinicHeader}>
                <View style={clinicListingStyles.clinicIcon}>
                  <Text style={clinicListingStyles.clinicIconText}>{clinic.icon}</Text>
                </View>
                <View style={clinicListingStyles.clinicInfo}>
                  <Text style={clinicListingStyles.clinicName}>{clinic.name}</Text>
                  <View style={clinicListingStyles.rating}>
                    <Text style={clinicListingStyles.stars}>{renderStars(clinic.rating)}</Text>
                    <Text style={clinicListingStyles.ratingText}>
                      {clinic.rating} ({clinic.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={clinicListingStyles.address}>📍 {clinic.address}</Text>
              <Text style={clinicListingStyles.distance}>📏 {clinic.distance} away</Text>
              <View style={clinicListingStyles.specialties}>
                {clinic.specialties.map((specialty, index) => (
                  <View key={index} style={clinicListingStyles.specialtyTag}>
                    <Text style={clinicListingStyles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <Text style={clinicListingStyles.timings}>🕐 {clinic.timings}</Text>
              <TouchableOpacity style={clinicListingStyles.viewDetailsBtn} activeOpacity={0.8}>
                <Text style={clinicListingStyles.viewDetailsBtnText}>View Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="discover"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default ClinicListing;

