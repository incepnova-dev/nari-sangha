import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import WelcomeHeader from './WelcomeHeader';
import {
  containerStyles,
  headerStyles,
  healthProductsStyles,
} from '../styles';

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
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Health Products</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Products Section */}
        <View style={healthProductsStyles.contentSection}>
          <View style={healthProductsStyles.sectionHeader}>
            <Text style={healthProductsStyles.sectionTitle}>Healthcare Products</Text>
          </View>

          <View style={healthProductsStyles.productGrid}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={healthProductsStyles.productCard}
                activeOpacity={0.8}
              >
                <View style={healthProductsStyles.productImage}>
                  <Text style={healthProductsStyles.productImageIcon}>{product.icon}</Text>
                  {product.discount && (
                    <View style={healthProductsStyles.discountBadge}>
                      <Text style={healthProductsStyles.discountBadgeText}>{product.discount}</Text>
                    </View>
                  )}
                </View>
                <View style={healthProductsStyles.productInfo}>
                  <Text style={healthProductsStyles.productName}>{product.name}</Text>
                  <Text style={healthProductsStyles.productBrand}>{product.brand}</Text>
                  <View style={healthProductsStyles.productPricing}>
                    <Text style={healthProductsStyles.productPrice}>{product.price}</Text>
                    <Text style={healthProductsStyles.productOriginalPrice}>{product.originalPrice}</Text>
                  </View>
                  <View style={healthProductsStyles.platformTags}>
                    {product.platforms.map((platform, pIndex) => (
                      <View key={pIndex} style={healthProductsStyles.platformTag}>
                        <Text style={healthProductsStyles.platformTagText}>{platform}</Text>
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

export default HealthProducts;

