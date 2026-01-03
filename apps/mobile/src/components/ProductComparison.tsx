import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import BottomMenuBar from './BottomMenuBar';
import {
  containerStyles,
  headerStyles,
  badgeStyles,
  iconStyles,
  buttons,
  productComparisonStyles,
} from '../styles';

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
  onSignOut?: () => void;
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
  onSignOut,
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
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
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
    <View style={containerStyles.containerCard}>
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
            <Text style={headerStyles.headerTitleWhite} numberOfLines={2}>{productName}</Text>
            <Text style={headerStyles.headerSubtitle}>Compare prices from {retailers.length} retailers</Text>
          </View>
          <View style={headerStyles.headerSpacerSmall} />
        </View>

        {/* Product Header */}
        <View style={productComparisonStyles.productHeader}>
          <Text style={productComparisonStyles.productTitle}>{productName}</Text>
          <View style={badgeStyles.badgePrimary}>
            <Text style={badgeStyles.badgePrimaryText}>{productPrice}</Text>
          </View>
          <Text style={productComparisonStyles.productSubtitle}>{productDescription}</Text>
          <View style={badgeStyles.categoryBadge}>
            <Text style={badgeStyles.categoryBadgeText}>{productCategory}</Text>
          </View>
        </View>

        {/* Section Title */}
        <Text style={productComparisonStyles.sectionTitle}>Available at ({retailers.length} Retailers)</Text>

        {/* Retailers List */}
        <View style={productComparisonStyles.retailersContainer}>
          {retailers.map((retailer) => (
            <View
              key={retailer.id}
              style={[
                productComparisonStyles.retailerCard,
                retailer.isBestPrice && productComparisonStyles.retailerCardBestPrice,
              ]}
            >
              {retailer.isBestPrice && (
                <View style={badgeStyles.badgeBestPrice}>
                  <Text style={badgeStyles.badgeBestPriceText}>BEST PRICE</Text>
                </View>
              )}
              <View style={productComparisonStyles.retailerLeft}>
                <View style={iconStyles.iconContainerSmall}>
                  <Text style={iconStyles.iconTextSmall}>{retailer.icon}</Text>
                </View>
                <View style={productComparisonStyles.retailerInfo}>
                  <Text style={productComparisonStyles.retailerName}>{retailer.name}</Text>
                  <View style={productComparisonStyles.retailerRating}>
                    <Text style={productComparisonStyles.star}>⭐</Text>
                    <Text style={productComparisonStyles.ratingText}>{retailer.rating}</Text>
                    <Text style={productComparisonStyles.deliveryTimeText}>{retailer.deliveryTime}</Text>
                  </View>
                </View>
              </View>
              <View style={productComparisonStyles.retailerRight}>
                <Text style={productComparisonStyles.priceRange}>{retailer.priceRange}</Text>
                <TouchableOpacity
                  style={buttons.smallButton}
                  activeOpacity={0.8}
                  onPress={() => handleViewRetailer(retailer.link)}
                >
                  <Text style={buttons.smallButtonText}>View 🔗</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={productComparisonStyles.bottomSpacer} />
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="products"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default ProductComparison;

