import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import BottomMenuBar from './BottomMenuBar';
import SearchAndQuickActions from './SearchAndQuickActions';
import WelcomeHeader from './WelcomeHeader';

interface HomeLandingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onNavigate?: (route: string) => void;
}

const HomeLanding: React.FC<HomeLandingProps> = ({
  navigation,
  user,
  onSignOut,
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState<'home'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'Priya';

  const products = [
    {
      icon: '🧴',
      name: 'Prenatal Vitamins',
      brand: 'HealthPlus',
      price: '₹349',
      originalPrice: '₹499',
      discount: '30% OFF',
      platforms: ['🛒 Amazon', '💊 1mg'],
    },
    {
      icon: '🩺',
      name: 'Menstrual Pain Relief',
      brand: 'WellnessRx',
      price: '₹225',
      originalPrice: '₹300',
      discount: '25% OFF',
      platforms: ['📦 Flipkart', '💊 Netmeds'],
    },
    {
      icon: '🧘‍♀️',
      name: 'Yoga Mat Premium',
      brand: 'FitLife',
      price: '₹799',
      originalPrice: '₹999',
      platforms: ['🛒 Amazon', '🏃 Decathlon'],
    },
    {
      icon: '💊',
      name: 'Iron Supplements',
      brand: 'NutriCare',
      price: '₹299',
      originalPrice: '₹499',
      discount: '40% OFF',
      platforms: ['💊 PharmEasy', '💊 Apollo'],
    },
  ];

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
    },
  ];

  const conditions = [
    {
      icon: '🩺',
      name: 'Polycystic Ovary Syndrome (PCOS)',
      snippet: 'Hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
      tags: [
        { text: 'Irregular periods', type: 'symptom' },
        { text: 'Lifestyle changes', type: 'prevention' },
        { text: 'Hormonal imbalance', type: 'cause' },
      ],
    },
    {
      icon: '🎀',
      name: 'Breast Cancer',
      snippet: 'Cancer that forms in breast cells. Early detection through regular screening significantly improves outcomes.',
      tags: [
        { text: 'Breast lump', type: 'symptom' },
        { text: 'Regular screening', type: 'prevention' },
        { text: 'Genetic factors', type: 'cause' },
      ],
    },
    {
      icon: '🤰',
      name: 'Endometriosis',
      snippet: 'Tissue similar to uterine lining grows outside the uterus, causing pain and fertility issues.',
      tags: [
        { text: 'Pelvic pain', type: 'symptom' },
        { text: 'Early diagnosis', type: 'prevention' },
        { text: 'Unknown origin', type: 'cause' },
      ],
    },
    {
      icon: '💔',
      name: 'Osteoporosis',
      snippet: 'Bone disease that weakens bones, making them fragile. More common in postmenopausal women.',
      tags: [
        { text: 'Bone fractures', type: 'symptom' },
        { text: 'Calcium & Vit D', type: 'prevention' },
        { text: 'Low bone density', type: 'cause' },
      ],
    },
    {
      icon: '🔴',
      name: 'Anemia',
      snippet: 'Lack of healthy red blood cells to carry adequate oxygen. Very common in women due to menstruation.',
      tags: [
        { text: 'Fatigue', type: 'symptom' },
        { text: 'Iron-rich diet', type: 'prevention' },
        { text: 'Iron deficiency', type: 'cause' },
      ],
    },
  ];

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else {
      setActiveNav('home');
      // Handle navigation logic here if needed
      console.log('Navigate to:', screen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* WelcomeHeader with Welcome Message, Profile and Notification Icons */}
      <WelcomeHeader
        userName={userName}
        navigation={navigation}
        onProfilePress={() => {
          if (navigation) {
            navigation.navigate('Profile');
          } else if (onNavigate) {
            onNavigate('Profile');
          }
        }}
      />

      {/* Search Bar and Quick Actions */}
      <SearchAndQuickActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickActionPress={(actionId) => {
          console.log('Quick action pressed:', actionId);
          // Handle quick action navigation here
        }}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Products Section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Healthcare Products</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productCard}
                activeOpacity={0.8}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productImageIcon}>{product.icon}</Text>
                  {product.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>{product.discount}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <View style={styles.productPricing}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.productOriginalPrice}>{product.originalPrice}</Text>
                  </View>
                  <View style={styles.platformTags}>
                    {product.platforms.map((platform, pIndex) => (
                      <View key={pIndex} style={styles.platformTag}>
                        <Text style={styles.platformTagText}>{platform}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Insurance Section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Insurance Plans</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.insuranceList}>
            {insurancePlans.map((plan, index) => (
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
                  <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.8}>
                    <Text style={styles.viewDetailsBtnText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Health Conditions Section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Conditions Guide</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>View All 20 →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.conditionsList}>
            {conditions.map((condition, index) => (
              <TouchableOpacity
                key={index}
                style={styles.conditionCard}
                activeOpacity={0.8}
              >
                <View style={styles.conditionHeader}>
                  <View style={styles.conditionIcon}>
                    <Text style={styles.conditionIconText}>{condition.icon}</Text>
                  </View>
                  <Text style={styles.conditionName}>{condition.name}</Text>
                </View>
                <Text style={styles.conditionSnippet}>{condition.snippet}</Text>
                <View style={styles.conditionTags}>
                  {condition.tags.map((tag, tIndex) => (
                    <View
                      key={tIndex}
                      style={[
                        styles.conditionTag,
                        tag.type === 'symptom' && styles.tagSymptom,
                        tag.type === 'prevention' && styles.tagPrevention,
                        tag.type === 'cause' && styles.tagCause,
                      ]}
                    >
                      <Text
                        style={[
                          styles.conditionTagText,
                          tag.type === 'symptom' && styles.tagSymptomText,
                          tag.type === 'prevention' && styles.tagPreventionText,
                          tag.type === 'cause' && styles.tagCauseText,
                        ]}
                      >
                        {tag.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen={activeNav}
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
    paddingBottom: 80,
  },
  contentSection: {
    padding: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productImageIcon: {
    fontSize: 50,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4081',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  discountBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productBrand: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E91E63',
  },
  productOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  platformTags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  platformTag: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  platformTagText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
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
    justifyContent: 'space-between',
    paddingTop: 12,
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
  viewDetailsBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewDetailsBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  conditionsList: {
    gap: 12,
  },
  conditionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  conditionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionIconText: {
    fontSize: 22,
  },
  conditionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  conditionSnippet: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  conditionTags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  conditionTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  tagSymptom: {
    backgroundColor: '#FFE4EC',
  },
  tagPrevention: {
    backgroundColor: '#E8F5E9',
  },
  tagCause: {
    backgroundColor: '#FFF3E0',
  },
  conditionTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tagSymptomText: {
    color: '#E91E63',
  },
  tagPreventionText: {
    color: '#4CAF50',
  },
  tagCauseText: {
    color: '#FF9800',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default HomeLanding;
