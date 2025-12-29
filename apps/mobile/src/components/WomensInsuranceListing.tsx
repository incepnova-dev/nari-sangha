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

interface InsurancePlan {
  id: string;
  providerName: string;
  providerIcon: string;
  badge?: string;
  badgeType?: 'bestValue' | 'popular';
  price: string;
  rating: number;
  coverage: string[];
  isSelected: boolean;
}

interface WomensInsuranceListingProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const WomensInsuranceListing: React.FC<WomensInsuranceListingProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());

  const insurancePlans: InsurancePlan[] = [
    {
      id: '1',
      providerName: 'Care Supreme',
      providerIcon: '🏥',
      badge: 'Best Value',
      badgeType: 'bestValue',
      price: '₹15,000/year',
      rating: 4.5,
      coverage: [
        'Coverage ₹5L',
        'Maternity coverage included',
        'Annual health checkups',
        'No waiting period for accidents',
      ],
      isSelected: false,
    },
    {
      id: '2',
      providerName: 'Star Health',
      providerIcon: '🏦',
      badge: 'Most Popular',
      badgeType: 'popular',
      price: '₹18,500/year',
      rating: 4.7,
      coverage: [
        'Coverage ₹7L',
        'Critical illness cover',
        'No claim bonus',
        'Wellness benefits included',
      ],
      isSelected: false,
    },
    {
      id: '3',
      providerName: 'Max Bupa',
      providerIcon: '💼',
      price: '₹12,000/year',
      rating: 4.3,
      coverage: [
        'Coverage ₹3L',
        'OPD cover included',
        'Health checkups',
        'Preventive care benefits',
      ],
      isSelected: false,
    },
  ];

  const togglePlanSelection = (planId: string) => {
    const newSelected = new Set(selectedPlans);
    if (newSelected.has(planId)) {
      newSelected.delete(planId);
    } else {
      newSelected.add(planId);
    }
    setSelectedPlans(newSelected);
  };

  const filteredPlans = insurancePlans.filter((plan) =>
    plan.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Text style={styles.headerTitle}>Women's Insurance</Text>
            <Text style={styles.headerSubtitle}>Compare Plans</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search insurance plans"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Insurance Cards */}
        <View style={styles.cardsContainer}>
          {filteredPlans.map((plan) => {
            const isSelected = selectedPlans.has(plan.id);
            return (
              <View key={plan.id} style={styles.insuranceCard}>
                <View style={styles.insuranceHeader}>
                  <View style={styles.insuranceProvider}>
                    <View style={styles.providerLogo}>
                      <Text style={styles.providerIcon}>{plan.providerIcon}</Text>
                    </View>
                    <Text style={styles.providerName}>{plan.providerName}</Text>
                  </View>
                  {plan.badge && (
                    <View
                      style={[
                        styles.badge,
                        plan.badgeType === 'popular' && styles.badgePopular,
                      ]}
                    >
                      <Text style={styles.badgeText}>{plan.badge}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.priceRow}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => togglePlanSelection(plan.id)}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={styles.price}>{plan.price}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.stars}>⭐</Text>
                    <Text style={styles.ratingText}>{plan.rating}</Text>
                  </View>
                </View>

                <View style={styles.coverageList}>
                  {plan.coverage.map((item, index) => (
                    <View key={index} style={styles.coverageItem}>
                      <Text style={styles.coverageCheck}>✓</Text>
                      <Text style={styles.coverageText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
                    <Text style={styles.btnPrimaryText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnIcon} activeOpacity={0.8}>
                    <Text style={styles.btnIconText}>Compare</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Compare Button */}
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => {
            if (selectedPlans.size > 0) {
              navigation?.navigate('InsuranceComparison', {
                selectedPlanIds: Array.from(selectedPlans),
              });
            }
          }}
        >
          <Text style={styles.actionButtonText}>
            Compare Selected ({selectedPlans.size})
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    paddingBottom: 80,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  insuranceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insuranceProvider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  providerLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#FCE4EC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerIcon: {
    fontSize: 20,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  badgePopular: {
    backgroundColor: '#FF9800',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E91E63',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E91E63',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stars: {
    color: '#FFB300',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  coverageList: {
    marginBottom: 12,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  coverageCheck: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  coverageText: {
    fontSize: 12,
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E91E63',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  btnIcon: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E91E63',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E91E63',
  },
  actionButton: {
    margin: 20,
    marginTop: 10,
    paddingVertical: 15,
    backgroundColor: '#E91E63',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default WomensInsuranceListing;

