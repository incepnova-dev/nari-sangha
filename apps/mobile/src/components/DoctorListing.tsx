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

interface Doctor {
  id: string;
  name: string;
  icon: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  experience: string;
  clinic: string;
  consultationFee: string;
  availability: string;
}

interface DoctorListingProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const DoctorListing: React.FC<DoctorListingProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      icon: '👩‍⚕️',
      specialization: 'Gynecologist',
      rating: 4.8,
      reviewCount: 456,
      experience: '15 years',
      clinic: 'Women\'s Health Clinic',
      consultationFee: '₹800',
      availability: 'Available Today',
    },
    {
      id: '2',
      name: 'Dr. Sarah Williams',
      icon: '👩‍⚕️',
      specialization: 'Obstetrician',
      rating: 4.9,
      reviewCount: 523,
      experience: '18 years',
      clinic: 'Maternity Care Center',
      consultationFee: '₹1000',
      availability: 'Available Tomorrow',
    },
    {
      id: '3',
      name: 'Dr. Anjali Patel',
      icon: '👩‍⚕️',
      specialization: 'General Practitioner',
      rating: 4.6,
      reviewCount: 312,
      experience: '12 years',
      clinic: 'Wellness Care Center',
      consultationFee: '₹600',
      availability: 'Available Today',
    },
  ];

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
            <Text style={styles.headerTitle}>Doctors</Text>
            <Text style={styles.headerSubtitle}>Find healthcare professionals</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors by name or specialization..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctor Cards */}
        <View style={styles.doctorsContainer}>
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard} activeOpacity={0.8}>
              <View style={styles.doctorHeader}>
                <View style={styles.doctorIcon}>
                  <Text style={styles.doctorIconText}>{doctor.icon}</Text>
                </View>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.specialization}>{doctor.specialization}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.stars}>{renderStars(doctor.rating)}</Text>
                    <Text style={styles.ratingText}>
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Experience:</Text>
                <Text style={styles.detailValue}>{doctor.experience}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Clinic:</Text>
                <Text style={styles.detailValue}>{doctor.clinic}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Consultation Fee:</Text>
                <Text style={styles.detailValue}>{doctor.consultationFee}</Text>
              </View>
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>✓ {doctor.availability}</Text>
              </View>
              <TouchableOpacity style={styles.bookAppointmentBtn} activeOpacity={0.8}>
                <Text style={styles.bookAppointmentBtnText}>Book Appointment</Text>
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
  doctorsContainer: {
    padding: 20,
    gap: 15,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  doctorIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#FCE4EC',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorIconText: {
    fontSize: 35,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  availabilityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  availabilityText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  bookAppointmentBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookAppointmentBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DoctorListing;

