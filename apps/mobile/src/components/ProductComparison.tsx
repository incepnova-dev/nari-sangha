import React from 'react';
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
import BottomMenuBar from './BottomMenuBar';

interface Retailer {
  id: string;
  name: string;
  icon: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  link: string;
  isBestPrice?: boolean;
}

interface ProductComparisonProps {
  navigation?: any;
  user?: any;
  productId?: string;
  productName?: string;
  productPrice?: string;
  productDescription?: string;
  productCategory?: string;
  onBack?: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  navigation,
  user,
  productId,
  productName = 'Birth Control Pills (Oral Contraceptive - 21 tablets)',
  productPrice = 'From ₹145',
  productDescription = 'Combined oral contraceptive - Monthly supply',
  productCategory = 'Contraceptives',
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  // Sample retailers data - in a real app, this would come from props or API
  const retailers: Retailer[] = [
    {
      id: '1',
      name: 'Amazon',
      icon: '📦',
      rating: 4.3,
      deliveryTime: '2-3 days',
      priceRange: '₹150-350',
      link: 'https://www.amazon.in',
      isBestPrice: false,
    },
    {
      id: '2',
      name: 'Flipkart',
      icon: '🛒',
      rating: 4.2,
      deliveryTime: '2-4 days',
      priceRange: '₹180-380',
      link: 'https://www.flipkart.com',
      isBestPrice: false,
    },
    {
      id: '3',
      name: '1mg',
      icon: '1️⃣',
      rating: 4.6,
      deliveryTime: '1-2 days',
      priceRange: '₹145-320',
      link: 'https://www.1mg.com',
      isBestPrice: true,
    },
    {
      id: '4',
      name: 'PharmEasy',
      icon: '💊',
      rating: 4.4,
      deliveryTime: '1-2 days',
      priceRange: '₹155-340',
      link: 'https://www.pharmeasy.in',
      isBestPrice: false,
    },
  ];

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      navigation?.navigate('ProductsOption');
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else {
      console.log('Navigate to:', screen);
    }
  };

  const handleViewRetailer = async (link: string) => {
    try {
      const canOpen = await Linking.canOpenURL(link);
      if (canOpen) {
        await Linking.openURL(link);
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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle} numberOfLines={2}>{productName}</Text>
            <Text style={styles.headerSubtitle}>Compare prices from {retailers.length} retailers</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Product Header */}
        <View style={styles.productHeader}>
          <Text style={styles.productTitle}>{productName}</Text>
          <View style={styles.productPriceBadge}>
            <Text style={styles.productPriceBadgeText}>{productPrice}</Text>
          </View>
          <Text style={styles.productSubtitle}>{productDescription}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{productCategory}</Text>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Available at ({retailers.length} Retailers)</Text>

        {/* Retailers List */}
        <View style={styles.retailersContainer}>
          {retailers.map((retailer) => (
            <View
              key={retailer.id}
              style={[
                styles.retailerCard,
                retailer.isBestPrice && styles.retailerCardBestPrice,
              ]}
            >
              {retailer.isBestPrice && (
                <View style={styles.bestPriceBadge}>
                  <Text style={styles.bestPriceBadgeText}>BEST PRICE</Text>
                </View>
              )}
              <View style={styles.retailerLeft}>
                <View style={styles.retailerIcon}>
                  <Text style={styles.retailerIconText}>{retailer.icon}</Text>
                </View>
                <View style={styles.retailerInfo}>
                  <Text style={styles.retailerName}>{retailer.name}</Text>
                  <View style={styles.retailerRating}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingText}>{retailer.rating}</Text>
                    <Text style={styles.deliveryTimeText}>{retailer.deliveryTime}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.retailerRight}>
                <Text style={styles.priceRange}>{retailer.priceRange}</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  activeOpacity={0.8}
                  onPress={() => handleViewRetailer(retailer.link)}
                >
                  <Text style={styles.viewButtonText}>View 🔗</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

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
    backgroundColor: '#FCE4EC',
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
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'white',
    opacity: 0.9,
  },
  headerSpacer: {
    width: 35,
  },
  productHeader: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 8,
  },
  productPriceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E91E63',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
  productPriceBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1976D2',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  retailersContainer: {
    paddingHorizontal: 20,
  },
  retailerCard: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  retailerCardBestPrice: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.25,
  },
  bestPriceBadge: {
    position: 'absolute',
    top: -1,
    left: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bestPriceBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  retailerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  retailerIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retailerIconText: {
    fontSize: 24,
  },
  retailerInfo: {
    flex: 1,
  },
  retailerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  retailerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  star: {
    color: '#FFB300',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  deliveryTimeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  retailerRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E91E63',
  },
  viewButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default ProductComparison;

