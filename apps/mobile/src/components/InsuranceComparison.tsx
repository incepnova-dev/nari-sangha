import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InsurancePlan {
  id: string;
  providerName: string;
  providerIcon: string;
  badge?: string;
  badgeType?: 'bestValue' | 'popular';
  price: string;
  rating: number;
  coverage: string[];
  buyLink: string;
}

interface InsuranceComparisonProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  selectedPlanIds?: string[];
  onBack?: () => void;
}

const InsuranceComparison: React.FC<InsuranceComparisonProps> = ({
  navigation,
  user,
  onSignOut,
  selectedPlanIds = [],
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  // All available insurance plans
  const allPlans: InsurancePlan[] = [
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
      buyLink: 'https://www.careinsurance.com',
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
      buyLink: 'https://www.maxbupa.com',
    },
  ];

  // Filter to show only selected plans
  const selectedPlans = allPlans.filter((plan) => selectedPlanIds.includes(plan.id));

  // If no plans selected, show all plans
  const plansToCompare = selectedPlans.length > 0 ? selectedPlans : allPlans;

  // Get all unique coverage items across all plans
  const allCoverageItems = Array.from(
    new Set(plansToCompare.flatMap((plan) => plan.coverage))
  );

  // Calculate responsive column widths
  const firstColumnWidth = Math.max(140, SCREEN_WIDTH * 0.35);
  const planColumnWidth = Math.max(180, SCREEN_WIDTH * 0.5);
  const tableMinWidth = firstColumnWidth + (plansToCompare.length * planColumnWidth);
  // Ensure minimum width is greater than screen width for scrolling
  const tableWidth = Math.max(SCREEN_WIDTH + 1, tableMinWidth);

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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Compare Plans</Text>
          <Text style={styles.headerSubtitle}>
            {plansToCompare.length} {plansToCompare.length === 1 ? 'plan' : 'plans'} selected
          </Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scroll Indicator Hint */}
      <View style={styles.scrollHint}>
        <Text style={styles.scrollHintText}>← Swipe to compare plans →</Text>
      </View>

      {/* Horizontal Scroll Container - Outer */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.horizontalScroll}
        contentContainerStyle={[
          styles.horizontalScrollContent,
          { width: tableWidth },
        ]}
        bounces={true}
        decelerationRate="normal"
        scrollEnabled={true}
        scrollEventThrottle={16}
        directionalLockEnabled={true}
      >
        {/* Vertical Scroll Container - Inner */}
        <ScrollView
          style={[styles.verticalScroll, { width: tableWidth }]}
          contentContainerStyle={styles.verticalScrollContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          scrollEventThrottle={16}
        >
          <View style={[
            styles.comparisonTable,
            { width: tableWidth },
          ]}>
            {/* Header Row - Plan Names */}
            <View style={styles.tableRow}>
              <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={styles.columnHeader} numberOfLines={2}>Plan Details</Text>
              </View>
              {plansToCompare.map((plan, index) => (
                <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]}>
                  <View style={styles.planHeader}>
                    <View style={styles.providerLogo}>
                      <Text style={styles.providerIcon}>{plan.providerIcon}</Text>
                    </View>
                    <Text style={styles.planProviderName} numberOfLines={2}>{plan.providerName}</Text>
                    {plan.badge && (
                      <View
                        style={[
                          styles.badge,
                          plan.badgeType === 'popular' && styles.badgePopular,
                        ]}
                      >
                        <Text style={styles.badgeText} numberOfLines={1}>{plan.badge}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Price Row */}
            <View style={[styles.tableRow, styles.altRow]}>
              <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={styles.rowLabel}>Price</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]}>
                  <Text style={styles.priceText}>{plan.price}</Text>
                </View>
              ))}
            </View>

            {/* Rating Row */}
            <View style={styles.tableRow}>
              <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={styles.rowLabel}>Rating</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]}>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.stars}>⭐</Text>
                    <Text style={styles.ratingText}>{plan.rating}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Coverage Section */}
            <View style={[styles.tableRow, styles.altRow, styles.coverageHeader]}>
              <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={styles.sectionLabel}>Coverage</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]} />
              ))}
            </View>

            {/* Coverage Items */}
            {allCoverageItems.map((coverageItem, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 && styles.altRow,
                ]}
              >
                <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                  <Text style={styles.coverageItemLabel} numberOfLines={2}>{coverageItem}</Text>
                </View>
                {plansToCompare.map((plan) => (
                  <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]}>
                    {plan.coverage.includes(coverageItem) ? (
                      <Text style={styles.checkmark}>✓</Text>
                    ) : (
                      <Text style={styles.crossmark}>✗</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}

            {/* Action Buttons Row */}
            <View style={[styles.tableRow, styles.actionRow]}>
              <View style={[styles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={styles.rowLabel}>Actions</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[styles.planColumn, { width: planColumnWidth }]}>
                  <TouchableOpacity
                    style={styles.buyBtn}
                    activeOpacity={0.8}
                    onPress={() => handleBuyNow(plan.buyLink)}
                  >
                    <Text style={styles.buyBtnText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
  horizontalScroll: {
    flex: 1,
  },
  horizontalScrollContent: {
    minWidth: SCREEN_WIDTH,
  },
  verticalScroll: {
    flex: 1,
  },
  verticalScrollContent: {
    paddingBottom: 100,
  },
  comparisonTable: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 60,
  },
  altRow: {
    backgroundColor: '#FAFAFA',
  },
  scrollHint: {
    backgroundColor: '#FFF5F7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scrollHintText: {
    fontSize: 12,
    color: '#E91E63',
    fontWeight: '600',
  },
  firstColumn: {
    minWidth: 140,
    padding: 12,
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: '#E91E63',
  },
  planColumn: {
    minWidth: 180,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
  },
  planHeader: {
    alignItems: 'center',
    width: '100%',
  },
  providerLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#FCE4EC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  providerIcon: {
    fontSize: 20,
  },
  planProviderName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 4,
  },
  badgePopular: {
    backgroundColor: '#FF9800',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'white',
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    color: '#FFB300',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  coverageHeader: {
    backgroundColor: '#FFF5F7',
  },
  coverageItemLabel: {
    fontSize: 11,
    color: '#555',
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: '700',
    textAlign: 'center',
  },
  crossmark: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  actionRow: {
    paddingVertical: 15,
  },
  buyBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default InsuranceComparison;

