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
  doctorListingStyles,
  colors,
} from '../styles';
import { mockDoctors, Doctor } from '../__mocks__/DoctorListing.mock';

interface DoctorListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const DoctorListing: React.FC<DoctorListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const doctors: Doctor[] = mockDoctors;

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Text style={headerStyles.headerTitleWhite}>Doctors</Text>
            <Text style={headerStyles.headerSubtitle}>Find healthcare professionals</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={doctorListingStyles.searchBar}>
          <Text style={doctorListingStyles.searchIcon}>🔍</Text>
          <TextInput
            style={doctorListingStyles.searchInput}
            placeholder="Search doctors by name or specialization..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctor Cards */}
        <View style={doctorListingStyles.doctorsContainer}>
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={doctorListingStyles.doctorCard} activeOpacity={0.8}>
              <View style={doctorListingStyles.doctorHeader}>
                <View style={doctorListingStyles.doctorIcon}>
                  <Text style={doctorListingStyles.doctorIconText}>{doctor.icon}</Text>
                </View>
                <View style={doctorListingStyles.doctorInfo}>
                  <Text style={doctorListingStyles.doctorName}>{doctor.name}</Text>
                  <Text style={doctorListingStyles.specialization}>{doctor.specialization}</Text>
                  <View style={doctorListingStyles.rating}>
                    <Text style={doctorListingStyles.stars}>{renderStars(doctor.rating)}</Text>
                    <Text style={doctorListingStyles.ratingText}>
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <View style={doctorListingStyles.detailsRow}>
                <Text style={doctorListingStyles.detailLabel}>Experience:</Text>
                <Text style={doctorListingStyles.detailValue}>{doctor.experience}</Text>
              </View>
              <View style={doctorListingStyles.detailsRow}>
                <Text style={doctorListingStyles.detailLabel}>Clinic:</Text>
                <Text style={doctorListingStyles.detailValue}>{doctor.clinic}</Text>
              </View>
              <View style={doctorListingStyles.detailsRow}>
                <Text style={doctorListingStyles.detailLabel}>Consultation Fee:</Text>
                <Text style={doctorListingStyles.detailValue}>{doctor.consultationFee}</Text>
              </View>
              <View style={doctorListingStyles.availabilityBadge}>
                <Text style={doctorListingStyles.availabilityText}>✓ {doctor.availability}</Text>
              </View>
              <TouchableOpacity style={doctorListingStyles.bookAppointmentBtn} activeOpacity={0.8}>
                <Text style={doctorListingStyles.bookAppointmentBtnText}>Book Appointment</Text>
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

export default DoctorListing;

