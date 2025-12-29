import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';

interface HealthProductsProps {
  navigation?: any;
  user?: any;
  onBack?: () => void;
}

const HealthProducts: React.FC<HealthProductsProps> = ({
  navigation,
  user,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

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
          <Text style={styles.headerTitle}>Health Products</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Products Section */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Healthcare Products</Text>
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
});

export default HealthProducts;

