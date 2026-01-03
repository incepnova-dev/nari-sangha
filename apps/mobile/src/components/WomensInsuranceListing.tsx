import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  womensInsuranceListingStyles,
  colors,
  icons,
} from '../styles';
import { mockInsurancePlans, InsurancePlan } from '../__mocks__/WomensInsuranceListing.mock';

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

  const insurancePlans: InsurancePlan[] = mockInsurancePlans;

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
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 24 }]}>Women's Insurance</Text>
            <Text style={headerStyles.headerSubtitle}>Compare Plans</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={womensInsuranceListingStyles.searchBar}>
          <Text style={womensInsuranceListingStyles.searchIcon}>{icons.search}</Text>
          <TextInput
            style={womensInsuranceListingStyles.searchInput}
            placeholder="Search insurance plans"
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Insurance Cards */}
        <View style={womensInsuranceListingStyles.cardsContainer}>
          {filteredPlans.map((plan, index) => {
            const isExpanded = expandedIndex === index;
            const isSelected = selectedPlans.has(plan.id);
            return (
              <View key={plan.id} style={womensInsuranceListingStyles.insuranceCard}>
                <View style={womensInsuranceListingStyles.insuranceHeader}>
                  <View style={womensInsuranceListingStyles.insuranceProvider}>
                    <View style={womensInsuranceListingStyles.providerLogo}>
                      <Text style={womensInsuranceListingStyles.providerIcon}>{plan.providerIcon}</Text>
                    </View>
                    <Text style={womensInsuranceListingStyles.providerName}>{plan.providerName}</Text>
                  </View>
                  {plan.badge && (
                    <View
                      style={[
                        womensInsuranceListingStyles.badge,
                        plan.badgeType === 'popular' && womensInsuranceListingStyles.badgePopular,
                      ]}
                    >
                      <Text style={womensInsuranceListingStyles.badgeText}>{plan.badge}</Text>
                    </View>
                  )}
                </View>

                <View style={womensInsuranceListingStyles.priceRow}>
                  <TouchableOpacity
                    style={[womensInsuranceListingStyles.checkbox, isSelected && womensInsuranceListingStyles.checkboxSelected]}
                    onPress={() => togglePlanSelection(plan.id)}
                    activeOpacity={0.7}
                  >
                    {isSelected && <Text style={womensInsuranceListingStyles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={womensInsuranceListingStyles.price}>{plan.price}</Text>
                  <View style={womensInsuranceListingStyles.rating}>
                    <Text style={womensInsuranceListingStyles.stars}>⭐</Text>
                    <Text style={womensInsuranceListingStyles.ratingText}>{plan.rating}</Text>
                  </View>
                </View>

                <View style={womensInsuranceListingStyles.coverageList}>
                  {plan.coverage.map((item, cIndex) => (
                    <View key={cIndex} style={womensInsuranceListingStyles.coverageItem}>
                      <Text style={womensInsuranceListingStyles.coverageCheck}>{icons.checkmark}</Text>
                      <Text style={womensInsuranceListingStyles.coverageText}>{item}</Text>
                    </View>
                  ))}
                </View>

                {/* Expandable Details Section */}
                {isExpanded && plan.details && (
                  <View style={womensInsuranceListingStyles.expandedDetails}>
                    <View style={womensInsuranceListingStyles.detailsSection}>
                      <Text style={womensInsuranceListingStyles.detailsTitle}>Coverage Details</Text>
                      <View style={womensInsuranceListingStyles.detailRow}>
                        <Text style={womensInsuranceListingStyles.detailLabel}>Sum Insured:</Text>
                        <Text style={womensInsuranceListingStyles.detailValue}>{plan.details.coverage}</Text>
                      </View>
                      <View style={womensInsuranceListingStyles.detailRow}>
                        <Text style={womensInsuranceListingStyles.detailLabel}>Waiting Period:</Text>
                        <Text style={womensInsuranceListingStyles.detailValue}>{plan.details.waitingPeriod}</Text>
                      </View>
                      <View style={womensInsuranceListingStyles.detailRow}>
                        <Text style={womensInsuranceListingStyles.detailLabel}>Network Hospitals:</Text>
                        <Text style={womensInsuranceListingStyles.detailValue}>{plan.details.networkHospitals}</Text>
                      </View>
                      <View style={womensInsuranceListingStyles.detailRow}>
                        <Text style={womensInsuranceListingStyles.detailLabel}>Claim Settlement:</Text>
                        <Text style={womensInsuranceListingStyles.detailValue}>{plan.details.claimSettlement}</Text>
                      </View>
                    </View>

                    <View style={womensInsuranceListingStyles.detailsSection}>
                      <Text style={womensInsuranceListingStyles.detailsTitle}>Additional Benefits</Text>
                      {plan.details.additionalBenefits.map((benefit, bIndex) => (
                        <View key={bIndex} style={womensInsuranceListingStyles.benefitItem}>
                          <Text style={womensInsuranceListingStyles.benefitCheck}>{icons.checkmark}</Text>
                          <Text style={womensInsuranceListingStyles.benefitText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={womensInsuranceListingStyles.termsSection}>
                      <Text style={womensInsuranceListingStyles.termsText}>{plan.details.terms}</Text>
                    </View>

                    <TouchableOpacity
                      style={womensInsuranceListingStyles.buyNowBtn}
                      activeOpacity={0.8}
                      onPress={() => handleBuyNow(plan.buyLink)}
                    >
                      <Text style={womensInsuranceListingStyles.buyNowBtnText}>Buy Now from {plan.providerName}</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* View Details Button - Full Width */}
                <TouchableOpacity
                  style={womensInsuranceListingStyles.viewDetailsBtn}
                  activeOpacity={0.8}
                  onPress={() => toggleExpand(index)}
                >
                  <Text style={womensInsuranceListingStyles.viewDetailsBtnText}>
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Compare Selected Button */}
        <TouchableOpacity
          style={[womensInsuranceListingStyles.compareButton, selectedPlans.size === 0 && womensInsuranceListingStyles.compareButtonDisabled]}
          activeOpacity={0.8}
          onPress={handleCompareSelected}
          disabled={selectedPlans.size === 0}
        >
          <Text style={womensInsuranceListingStyles.compareButtonText}>
            Compare Selected ({selectedPlans.size})
          </Text>
        </TouchableOpacity>

        <View style={womensInsuranceListingStyles.bottomSpacer} />
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="products"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default WomensInsuranceListing;

