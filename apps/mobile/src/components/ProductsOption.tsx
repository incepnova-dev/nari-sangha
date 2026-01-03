import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import BottomMenuBar from './BottomMenuBar';
import WelcomeHeader from './WelcomeHeader';
import {
  containerStyles,
  headerStyles,
  buttons,
  productsOptionStyles,
  colors,
} from '../styles';

interface ProductsOptionProps {
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onBack?: () => void;
  onContinue?: (option: 'healthProducts' | 'insurance') => void;
}

const ProductsOption: React.FC<ProductsOptionProps> = ({
  navigation,
  user,
  onSignOut,
  onBack,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<'healthProducts' | 'insurance'>('healthProducts');
  const userName = user?.name || user?.displayName || user?.email?.split('@')[0] || 'User';

  const handleContinue = () => {
    onContinue?.(selectedOption);
    if (selectedOption === 'healthProducts') {
      navigation?.navigate('WomenProductListing');
    } else {
      navigation?.navigate('WomensInsuranceListing');
    }
  };

  const handleNavigate = (screen: 'home' | 'discover' | 'track' | 'products') => {
    if (screen === 'products') {
      // Already on products screen
      return;
    } else if (screen === 'home') {
      navigation?.navigate('HomeLanding');
    } else if (screen === 'discover') {
      navigation?.navigate('DiscoverOptions');
    } else if (screen === 'track') {
      navigation?.navigate('TrackOptions');
    }
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
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
        contentContainerStyle={[containerStyles.scrollContent, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Select Product Type</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>What are you looking for?</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose the type of products you want to explore
        </Text>

        {/* Option Cards */}
        <View style={productsOptionStyles.optionCards}>
          <TouchableOpacity
            style={[
              productsOptionStyles.optionCard,
              selectedOption === 'healthProducts' && productsOptionStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('healthProducts')}
          >
            <View style={productsOptionStyles.optionHeader}>
              <Text style={productsOptionStyles.optionIcon}>💊</Text>
              <View style={productsOptionStyles.optionInfo}>
                <Text style={productsOptionStyles.optionName}>Health Products</Text>
                <Text style={productsOptionStyles.optionSubtext}>Wellness & Healthcare</Text>
              </View>
            </View>
            <View style={productsOptionStyles.optionFeatures}>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Vitamins & Supplements</Text>
              </View>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Personal Care Items</Text>
              </View>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Wellness Products</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              productsOptionStyles.optionCard,
              selectedOption === 'insurance' && productsOptionStyles.optionCardSelected,
            ]}
            onPress={() => setSelectedOption('insurance')}
          >
            <View style={productsOptionStyles.optionHeader}>
              <Text style={productsOptionStyles.optionIcon}>🛡️</Text>
              <View style={productsOptionStyles.optionInfo}>
                <Text style={productsOptionStyles.optionName}>Insurance</Text>
                <Text style={productsOptionStyles.optionSubtext}>Health & Maternity Plans</Text>
              </View>
            </View>
            <View style={productsOptionStyles.optionFeatures}>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Women's Health Insurance</Text>
              </View>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Maternity Coverage</Text>
              </View>
              <View style={productsOptionStyles.featureItem}>
                <Text style={productsOptionStyles.featureIcon}>✓</Text>
                <Text style={productsOptionStyles.featureText}>Comprehensive Plans</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={productsOptionStyles.btnContainer}>
          <TouchableOpacity style={[buttons.buttonFullWidth, buttons.primaryButton]} onPress={handleContinue}>
            <Text style={buttons.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BottomMenuBar */}
      <BottomMenuBar
        activeScreen="products"
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default ProductsOption;

