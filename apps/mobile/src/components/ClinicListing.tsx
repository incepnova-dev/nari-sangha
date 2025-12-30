import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

interface Clinic {
  id: string;
  name: string;
  icon: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  specialties: string[];
  timings: string;
}

interface ClinicListingProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const ClinicListing: React.FC<ClinicListingProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const clinics: Clinic[] = [
    {
      id: '1',
      name: 'Women\'s Health Clinic',
      icon: '🏥',
      rating: 4.7,
      reviewCount: 234,
      address: '123 Health Street, City',
      distance: '2.5 km',
      specialties: ['Gynecology', 'Obstetrics', 'General Practice'],
      timings: 'Mon-Sat: 9 AM - 6 PM',
    },
    {
      id: '2',
      name: 'Wellness Care Center',
      icon: '💊',
      rating: 4.5,
      reviewCount: 189,
      address: '456 Wellness Avenue',
      distance: '3.2 km',
      specialties: ['General Practice', 'Preventive Care'],
      timings: 'Mon-Fri: 8 AM - 7 PM',
    },
    {
      id: '3',
      name: 'Maternity Care Clinic',
      icon: '🤰',
      rating: 4.8,
      reviewCount: 312,
      address: '789 Maternity Road',
      distance: '1.8 km',
      specialties: ['Obstetrics', 'Prenatal Care', 'Postnatal Care'],
      timings: 'Mon-Sat: 8 AM - 8 PM',
    },
  ];

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
    } else {
      console.log('Navigate to:', screen);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '🌟' : '') + '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <WelcomeHeader
        userName={userName}
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
            <Text style={styles.headerTitle}>Clinics</Text>
            <Text style={styles.headerSubtitle}>Find nearby medical clinics</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics by name or specialty..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Clinic Cards */}
        <View style={styles.clinicsContainer}>
          {filteredClinics.map((clinic) => (
            <TouchableOpacity key={clinic.id} style={styles.clinicCard} activeOpacity={0.8}>
              <View style={styles.clinicHeader}>
                <View style={styles.clinicIcon}>
                  <Text style={styles.clinicIconText}>{clinic.icon}</Text>
                </View>
                <View style={styles.clinicInfo}>
                  <Text style={styles.clinicName}>{clinic.name}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.stars}>{renderStars(clinic.rating)}</Text>
                    <Text style={styles.ratingText}>
                      {clinic.rating} ({clinic.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.address}>📍 {clinic.address}</Text>
              <Text style={styles.distance}>📏 {clinic.distance} away</Text>
              <View style={styles.specialties}>
                {clinic.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.timings}>🕐 {clinic.timings}</Text>
              <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.8}>
                <Text style={styles.viewDetailsBtnText}>View Details</Text>
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
  searchBar: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  clinicsContainer: {
    padding: 20,
    gap: 15,
  },
  clinicCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  clinicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  clinicIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicIconText: {
    fontSize: 30,
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stars: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  address: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  distance: {
    fontSize: 13,
    color: '#4CAF50',
    marginBottom: 10,
    fontWeight: '600',
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  specialtyTag: {
    backgroundColor: '#FFF5F7',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  specialtyText: {
    fontSize: 11,
    color: '#E91E63',
    fontWeight: '600',
  },
  timings: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  viewDetailsBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ClinicListing;

