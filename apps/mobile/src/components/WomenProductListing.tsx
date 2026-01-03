import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  womenProductListingStyles,
  colors,
  icons,
} from '../styles';

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
      icon: icons.pill,
      name: 'Folic Acid Tablets',
      description: 'Essential supplement for pregnant women. Helps prevent neural tube defects. 90 tablets pack.',
      rating: 4.7,
      reviewCount: 1234,
      priceRange: '₹249 - ₹399',
      availableStores: 12,
    },
    {
      id: '2',
      icon: icons.bottle,
      name: 'Prenatal Vitamins',
      description: 'Complete multivitamin for pregnancy. Contains DHA, Iron, and essential nutrients. 60 capsules.',
      rating: 4.5,
      reviewCount: 892,
      priceRange: '₹599 - ₹899',
      availableStores: 8,
    },
    {
      id: '3',
      icon: icons.bandage,
      name: 'Menstrual Pain Relief',
      description: 'Fast-acting pain relief for menstrual cramps. Non-drowsy formula. 20 tablets.',
      rating: 4.8,
      reviewCount: 2145,
      priceRange: '₹149 - ₹249',
      availableStores: 15,
    },
    {
      id: '4',
      icon: icons.pill,
      name: 'Iron Supplements',
      description: 'High-potency iron tablets for anemia prevention. Gentle on stomach. 60 tablets.',
      rating: 4.6,
      reviewCount: 1567,
      priceRange: '₹299 - ₹449',
      availableStores: 10,
    },
    {
      id: '5',
      icon: icons.bottle,
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
            <Text style={[headerStyles.headerTitleWhite, { fontSize: 24 }]}>Product Finder</Text>
            <Text style={headerStyles.headerSubtitle}>Compare Women's Health Products</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Search Bar */}
        <View style={womenProductListingStyles.searchBar}>
          <Text style={womenProductListingStyles.searchIcon}>{icons.search}</Text>
          <TextInput
            style={womenProductListingStyles.searchInput}
            placeholder="Search products (medicines, supplements...)"
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={womenProductListingStyles.filterTabsContainer}
          contentContainerStyle={womenProductListingStyles.filterTabsContent}
        >
          {filterTabs.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                womenProductListingStyles.filterTab,
                activeFilter === filter && womenProductListingStyles.filterTabActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  womenProductListingStyles.filterTabText,
                  activeFilter === filter && womenProductListingStyles.filterTabTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Cards */}
        <View style={womenProductListingStyles.productsContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={womenProductListingStyles.productCard}>
              <View style={womenProductListingStyles.productImage}>
                <Text style={womenProductListingStyles.productImageIcon}>{product.icon}</Text>
              </View>
              <View style={womenProductListingStyles.productDetails}>
                <Text style={womenProductListingStyles.productName}>{product.name}</Text>
                <Text style={womenProductListingStyles.productDescription}>{product.description}</Text>
                
                <View style={womenProductListingStyles.rating}>
                  <Text style={womenProductListingStyles.stars}>{renderStars(product.rating)}</Text>
                  <Text style={womenProductListingStyles.ratingText}>
                    {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                  </Text>
                </View>
                
                <Text style={womenProductListingStyles.productPrice}>{product.priceRange}</Text>
                
                <Text style={womenProductListingStyles.availableStores}>
                  Available at {product.availableStores} stores nearby
                </Text>
                
                <TouchableOpacity
                  style={womenProductListingStyles.compareButton}
                  activeOpacity={0.8}
                  onPress={() => handleComparePrices(product.id)}
                >
                  <Text style={womenProductListingStyles.compareButtonText}>Compare Prices</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={womenProductListingStyles.bottomSpacer} />
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="products"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default WomenProductListing;

