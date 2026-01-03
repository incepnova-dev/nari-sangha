import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  insuranceComparisonStyles,
} from '../styles';

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

      {/* Header */}
      <View style={headerStyles.headerWithBackground}>
        <TouchableOpacity style={headerStyles.backButtonOnPrimary} onPress={onBack || (() => navigation?.goBack())}>
          <Text style={headerStyles.backButtonTextWhite}>←</Text>
        </TouchableOpacity>
        <View style={headerStyles.headerContent}>
          <Text style={headerStyles.headerTitleWhite}>Compare Plans</Text>
          <Text style={headerStyles.headerSubtitle}>
            {plansToCompare.length} {plansToCompare.length === 1 ? 'plan' : 'plans'} selected
          </Text>
        </View>
        <View style={headerStyles.headerSpacerSmall} />
      </View>

      {/* Scroll Indicator Hint */}
      <View style={insuranceComparisonStyles.scrollHint}>
        <Text style={insuranceComparisonStyles.scrollHintText}>← Swipe to compare plans →</Text>
      </View>

      {/* Horizontal Scroll Container - Outer */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={insuranceComparisonStyles.horizontalScroll}
        contentContainerStyle={[
          insuranceComparisonStyles.horizontalScrollContent,
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
          style={[insuranceComparisonStyles.verticalScroll, { width: tableWidth }]}
          contentContainerStyle={insuranceComparisonStyles.verticalScrollContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          scrollEventThrottle={16}
        >
          <View style={[
            insuranceComparisonStyles.comparisonTable,
            { width: tableWidth },
          ]}>
            {/* Header Row - Plan Names */}
            <View style={insuranceComparisonStyles.tableRow}>
              <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={insuranceComparisonStyles.columnHeader} numberOfLines={2}>Plan Details</Text>
              </View>
              {plansToCompare.map((plan, index) => (
                <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]}>
                  <View style={insuranceComparisonStyles.planHeader}>
                    <View style={insuranceComparisonStyles.providerLogo}>
                      <Text style={insuranceComparisonStyles.providerIcon}>{plan.providerIcon}</Text>
                    </View>
                    <Text style={insuranceComparisonStyles.planProviderName} numberOfLines={2}>{plan.providerName}</Text>
                    {plan.badge && (
                      <View
                        style={[
                          insuranceComparisonStyles.badge,
                          plan.badgeType === 'popular' && insuranceComparisonStyles.badgePopular,
                        ]}
                      >
                        <Text style={insuranceComparisonStyles.badgeText} numberOfLines={1}>{plan.badge}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Price Row */}
            <View style={[insuranceComparisonStyles.tableRow, insuranceComparisonStyles.altRow]}>
              <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={insuranceComparisonStyles.rowLabel}>Price</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]}>
                  <Text style={insuranceComparisonStyles.priceText}>{plan.price}</Text>
                </View>
              ))}
            </View>

            {/* Rating Row */}
            <View style={insuranceComparisonStyles.tableRow}>
              <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={insuranceComparisonStyles.rowLabel}>Rating</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]}>
                  <View style={insuranceComparisonStyles.ratingContainer}>
                    <Text style={insuranceComparisonStyles.stars}>⭐</Text>
                    <Text style={insuranceComparisonStyles.ratingText}>{plan.rating}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Coverage Section */}
            <View style={[insuranceComparisonStyles.tableRow, insuranceComparisonStyles.altRow, insuranceComparisonStyles.coverageHeader]}>
              <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={insuranceComparisonStyles.sectionLabel}>Coverage</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]} />
              ))}
            </View>

            {/* Coverage Items */}
            {allCoverageItems.map((coverageItem, index) => (
              <View
                key={index}
                style={[
                  insuranceComparisonStyles.tableRow,
                  index % 2 === 0 && insuranceComparisonStyles.altRow,
                ]}
              >
                <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                  <Text style={insuranceComparisonStyles.coverageItemLabel} numberOfLines={2}>{coverageItem}</Text>
                </View>
                {plansToCompare.map((plan) => (
                  <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]}>
                    {plan.coverage.includes(coverageItem) ? (
                      <Text style={insuranceComparisonStyles.checkmark}>✓</Text>
                    ) : (
                      <Text style={insuranceComparisonStyles.crossmark}>✗</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}

            {/* Action Buttons Row */}
            <View style={[insuranceComparisonStyles.tableRow, insuranceComparisonStyles.actionRow]}>
              <View style={[insuranceComparisonStyles.firstColumn, { width: firstColumnWidth }]}>
                <Text style={insuranceComparisonStyles.rowLabel}>Actions</Text>
              </View>
              {plansToCompare.map((plan) => (
                <View key={plan.id} style={[insuranceComparisonStyles.planColumn, { width: planColumnWidth }]}>
                  <TouchableOpacity
                    style={insuranceComparisonStyles.buyBtn}
                    activeOpacity={0.8}
                    onPress={() => handleBuyNow(plan.buyLink)}
                  >
                    <Text style={insuranceComparisonStyles.buyBtnText}>Buy Now</Text>
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

export default InsuranceComparison;

