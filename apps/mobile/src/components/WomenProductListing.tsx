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
import BottomMenuBar from './BottomMenuBar';

interface Product {
  id: string;
  icon: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  availableStores: number;
}

interface WomenProductListingProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
}

const WomenProductListing: React.FC<WomenProductListingProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
}) => {
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const products: Product[] = [
    {
      id: '1',
      icon: '💊',
      name: 'Folic Acid Tablets',
      description: 'Essential supplement for pregnant women. Helps prevent neural tube defects. 90 tablets pack.',
      rating: 4.7,
      reviewCount: 1234,
      priceRange: '₹249 - ₹399',
      availableStores: 12,
    },
    {
      id: '2',
      icon: '🧴',
      name: 'Prenatal Vitamins',
      description: 'Complete multivitamin for pregnancy. Contains DHA, Iron, and essential nutrients. 60 capsules.',
      rating: 4.5,
      reviewCount: 892,
      priceRange: '₹599 - ₹899',
      availableStores: 8,
    },
    {
      id: '3',
      icon: '🩹',
      name: 'Menstrual Pain Relief',
      description: 'Fast-acting pain relief for menstrual cramps. Non-drowsy formula. 20 tablets.',
      rating: 4.8,
      reviewCount: 2145,
      priceRange: '₹149 - ₹249',
      availableStores: 15,
    },
    {
      id: '4',
      icon: '💊',
      name: 'Iron Supplements',
      description: 'High-potency iron tablets for anemia prevention. Gentle on stomach. 60 tablets.',
      rating: 4.6,
      reviewCount: 1567,
      priceRange: '₹299 - ₹449',
      availableStores: 10,
    },
    {
      id: '5',
      icon: '🧴',
      name: 'Calcium + Vitamin D3',
      description: 'Bone health support for women. Reduces risk of osteoporosis. 60 tablets.',
      rating: 4.4,
      reviewCount: 987,
      priceRange: '₹349 - ₹499',
      availableStores: 9,
    },
  ];

  const filterTabs = ['All', 'Medicines', 'Supplements', 'Hygiene'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') {
      return matchesSearch;
    }
    
    // Simple categorization logic
    if (activeFilter === 'Medicines') {
      return matchesSearch && (product.name.includes('Pain Relief') || product.name.includes('Tablets'));
    }
    if (activeFilter === 'Supplements') {
      return matchesSearch && (product.name.includes('Vitamins') || product.name.includes('Supplements') || product.name.includes('Folic') || product.name.includes('Iron') || product.name.includes('Calcium'));
    }
    if (activeFilter === 'Hygiene') {
      return matchesSearch && product.name.includes('Hygiene');
    }
    
    return matchesSearch;
  });

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

  const handleComparePrices = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      navigation?.navigate('ProductComparison', {
        productId: product.id,
        productName: product.name,
        productPrice: product.priceRange,
        productDescription: product.description,
        productCategory: 'Health Products',
      });
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
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
            <Text style={styles.headerTitle}>Product Finder</Text>
            <Text style={styles.headerSubtitle}>Compare Women's Health Products</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products (medicines, supplements...)"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabsContainer}
          contentContainerStyle={styles.filterTabsContent}
        >
          {filterTabs.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.filterTabActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === filter && styles.filterTabTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Cards */}
        <View style={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImage}>
                <Text style={styles.productImageIcon}>{product.icon}</Text>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                
                <View style={styles.rating}>
                  <Text style={styles.stars}>{renderStars(product.rating)}</Text>
                  <Text style={styles.ratingText}>
                    {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                  </Text>
                </View>
                
                <Text style={styles.productPrice}>{product.priceRange}</Text>
                
                <Text style={styles.availableStores}>
                  Available at {product.availableStores} stores nearby
                </Text>
                
                <TouchableOpacity
                  style={styles.compareButton}
                  activeOpacity={0.8}
                  onPress={() => handleComparePrices(product.id)}
                >
                  <Text style={styles.compareButtonText}>Compare Prices</Text>
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
  filterTabsContainer: {
    marginBottom: 15,
  },
  filterTabsContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#E91E63',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTabTextActive: {
    color: 'white',
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageIcon: {
    fontSize: 48,
  },
  productDetails: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  stars: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 10,
  },
  availableStores: {
    fontSize: 11,
    color: '#4CAF50',
    marginBottom: 10,
  },
  compareButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#E91E63',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default WomenProductListing;

