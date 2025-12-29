import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';

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
          <Text style={styles.headerTitle}>Insurance Plans</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Insurance Section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insurance Plans</Text>
          </View>

          <View style={styles.insuranceList}>
            {insurancePlans.map((plan, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <View key={index} style={styles.insuranceCard}>
                  <View style={styles.insuranceHeader}>
                    <View style={styles.insuranceIcon}>
                      <Text style={styles.insuranceIconText}>{plan.icon}</Text>
                    </View>
                    <View style={styles.insuranceInfo}>
                      <Text style={styles.insuranceTitle}>{plan.title}</Text>
                      <Text style={styles.insuranceProvider}>{plan.provider}</Text>
                    </View>
                  </View>
                  <View style={styles.insuranceFeatures}>
                    {plan.features.map((feature, fIndex) => (
                      <View key={fIndex} style={styles.insuranceFeature}>
                        <Text style={styles.featureCheck}>✓</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.insurancePrice}>
                    <View>
                      <Text style={styles.insuranceAmount}>{plan.price}</Text>
                      <Text style={styles.insurancePeriod}>{plan.period}</Text>
                    </View>
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
                        <Text style={styles.buyNowBtnText}>Buy Now from {plan.provider}</Text>
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
        </View>
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
    padding: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  contentSection: {
    padding: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#E91E63',
  },
  insuranceList: {
    gap: 16,
  },
  insuranceCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  insuranceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insuranceIconText: {
    fontSize: 30,
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  insuranceProvider: {
    fontSize: 13,
    color: '#666',
  },
  insuranceFeatures: {
    gap: 8,
    marginBottom: 12,
  },
  insuranceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureCheck: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 13,
    color: '#555',
  },
  insurancePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  insuranceAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E91E63',
  },
  insurancePeriod: {
    fontSize: 12,
    color: '#999',
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
});

export default Insurance;

