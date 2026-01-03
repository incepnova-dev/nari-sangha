import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import {
  containerStyles,
  headerStyles,
  cardStyles,
  iconStyles,
  buttons,
  insuranceStyles,
} from '../styles';

interface InsuranceProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const Insurance: React.FC<InsuranceProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const insurancePlans = [
    {
      icon: '🛡️',
      title: "Women's Health Shield",
      provider: 'Star Health Insurance',
      features: [
        'Maternity coverage up to ₹2L',
        'Cancer treatment covered',
        'Annual health checkup included',
      ],
      price: '₹8,999',
      period: 'per year',
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
      buyLink: 'https://www.starhealth.in',
    },
    {
      icon: '💝',
      title: 'Maternity Care Plus',
      provider: 'ICICI Lombard',
      features: [
        'Pre & post natal coverage',
        'Newborn baby cover (90 days)',
        'Ambulance charges covered',
      ],
      price: '₹12,499',
      period: 'per year',
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
      buyLink: 'https://www.icicilombard.com',
    },
    {
      icon: '🏥',
      title: 'Complete Women Care',
      provider: 'HDFC Ergo',
      features: [
        'Gynecological treatments',
        'Fertility treatments covered',
        'Mental health support',
      ],
      price: '₹10,999',
      period: 'per year',
      details: {
        coverage: '₹6,00,000',
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
      buyLink: 'https://www.hdfcergo.com',
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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

  return (
    <View style={containerStyles.container}>
      <StatusBar barStyle="light-content" />
      
      <WelcomeHeader
        userName={userName}
        onProfilePress={() => {
          navigation?.navigate('Profile');
        }}
      />

      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContentMedium}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.header}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitle}>Insurance Plans</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Insurance Section */}
        <View style={containerStyles.contentSection}>
          <View style={headerStyles.sectionHeader}>
            <Text style={headerStyles.sectionTitle}>Insurance Plans</Text>
          </View>

          <View style={insuranceStyles.insuranceList}>
            {insurancePlans.map((plan, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <View key={index} style={insuranceStyles.insuranceCard}>
                  <View style={insuranceStyles.insuranceHeader}>
                    <View style={iconStyles.iconContainer}>
                      <Text style={iconStyles.iconText}>{plan.icon}</Text>
                    </View>
                    <View style={insuranceStyles.insuranceInfo}>
                      <Text style={insuranceStyles.insuranceTitle}>{plan.title}</Text>
                      <Text style={insuranceStyles.insuranceProvider}>{plan.provider}</Text>
                    </View>
                  </View>
                  <View style={insuranceStyles.insuranceFeatures}>
                    {plan.features.map((feature, fIndex) => (
                      <View key={fIndex} style={insuranceStyles.insuranceFeature}>
                        <Text style={insuranceStyles.featureCheck}>✓</Text>
                        <Text style={insuranceStyles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={insuranceStyles.insurancePrice}>
                    <View>
                      <Text style={insuranceStyles.insuranceAmount}>{plan.price}</Text>
                      <Text style={insuranceStyles.insurancePeriod}>{plan.period}</Text>
                    </View>
                  </View>
                  
                  {/* Expandable Details Section */}
                  {isExpanded && plan.details && (
                    <View style={insuranceStyles.expandedDetails}>
                      <View style={insuranceStyles.detailsSection}>
                        <Text style={insuranceStyles.detailsTitle}>Coverage Details</Text>
                        <View style={insuranceStyles.detailRow}>
                          <Text style={insuranceStyles.detailLabel}>Sum Insured:</Text>
                          <Text style={insuranceStyles.detailValue}>{plan.details.coverage}</Text>
                        </View>
                        <View style={insuranceStyles.detailRow}>
                          <Text style={insuranceStyles.detailLabel}>Waiting Period:</Text>
                          <Text style={insuranceStyles.detailValue}>{plan.details.waitingPeriod}</Text>
                        </View>
                        <View style={insuranceStyles.detailRow}>
                          <Text style={insuranceStyles.detailLabel}>Network Hospitals:</Text>
                          <Text style={insuranceStyles.detailValue}>{plan.details.networkHospitals}</Text>
                        </View>
                        <View style={insuranceStyles.detailRow}>
                          <Text style={insuranceStyles.detailLabel}>Claim Settlement:</Text>
                          <Text style={insuranceStyles.detailValue}>{plan.details.claimSettlement}</Text>
                        </View>
                      </View>

                      <View style={insuranceStyles.detailsSection}>
                        <Text style={insuranceStyles.detailsTitle}>Additional Benefits</Text>
                        {plan.details.additionalBenefits.map((benefit, bIndex) => (
                          <View key={bIndex} style={insuranceStyles.benefitItem}>
                            <Text style={insuranceStyles.benefitCheck}>✓</Text>
                            <Text style={insuranceStyles.benefitText}>{benefit}</Text>
                          </View>
                        ))}
                      </View>

                      <View style={insuranceStyles.termsSection}>
                        <Text style={insuranceStyles.termsText}>{plan.details.terms}</Text>
                      </View>

                      <TouchableOpacity
                        style={buttons.buyNowButton}
                        activeOpacity={0.8}
                        onPress={() => handleBuyNow(plan.buyLink)}
                      >
                        <Text style={buttons.buyNowButtonText}>Buy Now from {plan.provider}</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* View Details Button - Full Width */}
                  <TouchableOpacity
                    style={buttons.viewDetailsButton}
                    activeOpacity={0.8}
                    onPress={() => toggleExpand(index)}
                  >
                    <Text style={buttons.viewDetailsButtonText}>
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Insurance;

