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
  onBack?: () => void;
}

const HospitalListing: React.FC<HospitalListingProps> = ({
  navigation,
  user,
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
            <Text style={styles.headerTitle}>Hospitals</Text>
            <Text style={styles.headerSubtitle}>Find multi-specialty hospitals</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search hospitals by name or specialty..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Hospital Cards */}
        <View style={styles.hospitalsContainer}>
          {filteredHospitals.map((hospital) => (
            <TouchableOpacity key={hospital.id} style={styles.hospitalCard} activeOpacity={0.8}>
              <View style={styles.hospitalHeader}>
                <View style={styles.hospitalIcon}>
                  <Text style={styles.hospitalIconText}>{hospital.icon}</Text>
                </View>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.stars}>{renderStars(hospital.rating)}</Text>
                    <Text style={styles.ratingText}>
                      {hospital.rating} ({hospital.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.address}>📍 {hospital.address}</Text>
              <Text style={styles.distance}>📏 {hospital.distance} away</Text>
              <View style={styles.specialties}>
                {hospital.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.hospitalDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🛏️</Text>
                  <Text style={styles.detailText}>{hospital.beds} beds</Text>
                </View>
                {hospital.emergency && (
                  <View style={styles.emergencyBadge}>
                    <Text style={styles.emergencyText}>🚨 24/7 Emergency</Text>
                  </View>
                )}
              </View>
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
  hospitalsContainer: {
    padding: 20,
    gap: 15,
  },
  hospitalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  hospitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  hospitalIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#FCE4EC',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hospitalIconText: {
    fontSize: 35,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 20,
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
    marginBottom: 15,
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
  hospitalDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailIcon: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  emergencyBadge: {
    backgroundColor: '#FFEBEE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  emergencyText: {
    fontSize: 11,
    color: '#F44336',
    fontWeight: '700',
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

export default HospitalListing;

