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
  hospitalListingStyles,
  colors,
} from '../styles';

interface Hospital {
  id: string;
  name: string;
  icon: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  specialties: string[];
  emergency: boolean;
  beds: string;
}

interface HospitalListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const HospitalListing: React.FC<HospitalListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const hospitals: Hospital[] = [
    {
      id: '1',
      name: 'City General Hospital',
      icon: '🏨',
      rating: 4.6,
      reviewCount: 1234,
      address: '789 Hospital Road, City',
      distance: '5.2 km',
      specialties: ['Emergency', 'Maternity', 'Cardiology', 'Surgery'],
      emergency: true,
      beds: '500+',
    },
    {
      id: '2',
      name: 'Women\'s Specialty Hospital',
      icon: '🏥',
      rating: 4.8,
      reviewCount: 892,
      address: '456 Health Boulevard',
      distance: '3.8 km',
      specialties: ['Maternity', 'Gynecology', 'Pediatrics'],
      emergency: true,
      beds: '300+',
    },
    {
      id: '3',
      name: 'Community Medical Center',
      icon: '🏩',
      rating: 4.5,
      reviewCount: 567,
      address: '123 Community Street',
      distance: '2.1 km',
      specialties: ['General Medicine', 'Emergency', 'Outpatient'],
      emergency: true,
      beds: '200+',
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <Text style={headerStyles.headerTitleWhite}>Hospitals</Text>
            <Text style={headerStyles.headerSubtitle}>Find multi-specialty hospitals</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={hospitalListingStyles.searchBar}>
          <Text style={hospitalListingStyles.searchIcon}>🔍</Text>
          <TextInput
            style={hospitalListingStyles.searchInput}
            placeholder="Search hospitals by name or specialty..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Hospital Cards */}
        <View style={hospitalListingStyles.hospitalsContainer}>
          {filteredHospitals.map((hospital) => (
            <TouchableOpacity key={hospital.id} style={hospitalListingStyles.hospitalCard} activeOpacity={0.8}>
              <View style={hospitalListingStyles.hospitalHeader}>
                <View style={hospitalListingStyles.hospitalIcon}>
                  <Text style={hospitalListingStyles.hospitalIconText}>{hospital.icon}</Text>
                </View>
                <View style={hospitalListingStyles.hospitalInfo}>
                  <Text style={hospitalListingStyles.hospitalName}>{hospital.name}</Text>
                  <View style={hospitalListingStyles.rating}>
                    <Text style={hospitalListingStyles.stars}>{renderStars(hospital.rating)}</Text>
                    <Text style={hospitalListingStyles.ratingText}>
                      {hospital.rating} ({hospital.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={hospitalListingStyles.address}>📍 {hospital.address}</Text>
              <Text style={hospitalListingStyles.distance}>📏 {hospital.distance} away</Text>
              <View style={hospitalListingStyles.specialties}>
                {hospital.specialties.map((specialty, index) => (
                  <View key={index} style={hospitalListingStyles.specialtyTag}>
                    <Text style={hospitalListingStyles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <View style={hospitalListingStyles.hospitalDetails}>
                <View style={hospitalListingStyles.detailItem}>
                  <Text style={hospitalListingStyles.detailIcon}>🛏️</Text>
                  <Text style={hospitalListingStyles.detailText}>{hospital.beds} beds</Text>
                </View>
                {hospital.emergency && (
                  <View style={hospitalListingStyles.emergencyBadge}>
                    <Text style={hospitalListingStyles.emergencyText}>🚨 24/7 Emergency</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity style={hospitalListingStyles.viewDetailsBtn} activeOpacity={0.8}>
                <Text style={hospitalListingStyles.viewDetailsBtnText}>View Details</Text>
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

export default HospitalListing;

