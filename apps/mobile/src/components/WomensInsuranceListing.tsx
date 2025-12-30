import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

interface InsurancePlan {
  id: string;
  providerName: string;
  providerIcon: string;
  badge?: string;
  badgeType?: 'bestValue' | 'popular';
  price: string;
  rating: number;
  coverage: string[];
  details?: {
    coverage: string;
    waitingPeriod: string;
    networkHospitals: string;
    claimSettlement: string;
    additionalBenefits: string[];
    terms: string;
  };
  buyLink: string;
}

interface WomensInsuranceListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const WomensInsuranceListing: React.FC<WomensInsuranceListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
      details: {
        coverage: '₹5,00,000',
        waitingPeriod: '12 months for maternity',
        networkHospitals: '10,000+ hospitals',
        claimSettlement: 'Cashless treatment available',
        additionalBenefits: [
          'Pre and post hospitalization coverage',
          'Day care procedures covered',
          'Domiciliary hospitalization',
          'Organ donor expenses covered',
        ],
        terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
      },
      buyLink: 'https://www.caresupreme.in',
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
      details: {
        coverage: '₹7,00,000',
        waitingPeriod: '9 months for maternity',
        networkHospitals: '8,500+ hospitals',
        claimSettlement: 'Quick claim processing',
        additionalBenefits: [
          'Newborn coverage from day 1',
          'Vaccination expenses covered',
          'Post-delivery complications',
          'Lactation consultation',
        ],
        terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
      },
      buyLink: 'https://www.starhealth.in',
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
      details: {
        coverage: '₹3,00,000',
        waitingPeriod: '24 months for maternity',
        networkHospitals: '12,000+ hospitals',
        claimSettlement: '24/7 claim support',
        additionalBenefits: [
          'Mental health counseling sessions',
          'Fertility treatment coverage',
          'Alternative medicine coverage',
          'Wellness program benefits',
        ],
        terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
      },
      buyLink: 'https://www.maxbupa.com',
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const togglePlanSelection = (planId: string) => {
    const newSelected = new Set(selectedPlans);
    if (newSelected.has(planId)) {
      newSelected.delete(planId);
    } else {
      newSelected.add(planId);
    }
    setSelectedPlans(newSelected);
  };

  const handleBuyNow = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error: unknown) {
      console.error('Error opening URL:', error);
    }
  };

  const handleCompareSelected = () => {
    if (selectedPlans.size > 0) {
      navigation?.navigate('InsuranceComparison', {
        selectedPlanIds: Array.from(selectedPlans),
      });
    }
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  const filteredPlans = insurancePlans.filter((plan) =>
    plan.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredPlans.map((plan, index) => {
            const isExpanded = expandedIndex === index;
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
                    style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                    onPress={() => togglePlanSelection(plan.id)}
                    activeOpacity={0.7}
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
                  {plan.coverage.map((item, cIndex) => (
                    <View key={cIndex} style={styles.coverageItem}>
                      <Text style={styles.coverageCheck}>✓</Text>
                      <Text style={styles.coverageText}>{item}</Text>
                    </View>
                  ))}
                </View>

                {/* Expandable Details Section */}
                {isExpanded && plan.details && (
                  <View style={styles.expandedDetails}>
                    <View style={styles.detailsSection}>
                      <Text style={styles.detailsTitle}>Coverage Details</Text>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Sum Insured:</Text>
                        <Text style={styles.detailValue}>{plan.details.coverage}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Waiting Period:</Text>
                        <Text style={styles.detailValue}>{plan.details.waitingPeriod}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Network Hospitals:</Text>
                        <Text style={styles.detailValue}>{plan.details.networkHospitals}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Claim Settlement:</Text>
                        <Text style={styles.detailValue}>{plan.details.claimSettlement}</Text>
                      </View>
                    </View>

                    <View style={styles.detailsSection}>
                      <Text style={styles.detailsTitle}>Additional Benefits</Text>
                      {plan.details.additionalBenefits.map((benefit, bIndex) => (
                        <View key={bIndex} style={styles.benefitItem}>
                          <Text style={styles.benefitCheck}>✓</Text>
                          <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.termsSection}>
                      <Text style={styles.termsText}>{plan.details.terms}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.buyNowBtn}
                      activeOpacity={0.8}
                      onPress={() => handleBuyNow(plan.buyLink)}
                    >
                      <Text style={styles.buyNowBtnText}>Buy Now from {plan.providerName}</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* View Details Button - Full Width */}
                <TouchableOpacity
                  style={styles.viewDetailsBtn}
                  activeOpacity={0.8}
                  onPress={() => toggleExpand(index)}
                >
                  <Text style={styles.viewDetailsBtnText}>
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Compare Selected Button */}
        <TouchableOpacity
          style={[styles.compareButton, selectedPlans.size === 0 && styles.compareButtonDisabled]}
          activeOpacity={0.8}
          onPress={handleCompareSelected}
          disabled={selectedPlans.size === 0}
        >
          <Text style={styles.compareButtonText}>
            Compare Selected ({selectedPlans.size})
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="products"
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
  checkboxSelected: {
    backgroundColor: '#E91E63',
  },
  checkmark: {
    color: 'white',
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
  expandedDetails: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  benefitCheck: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  benefitText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  termsSection: {
    backgroundColor: '#FFF5F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  buyNowBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buyNowBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  viewDetailsBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  viewDetailsBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  compareButton: {
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
  compareButtonDisabled: {
    opacity: 0.6,
  },
  compareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default WomensInsuranceListing;

