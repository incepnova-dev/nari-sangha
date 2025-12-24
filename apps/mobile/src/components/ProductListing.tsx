import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  landingContainer,
  landingContent,
  scrollStyles,
} from '../styles';
import TopMenuBar from './TopMenuBar';
import BottomMenuBar from './BottomMenuBar';

interface ProductListingProps {
  user: any;
  onSignOut: () => void;
  language?: string;
  onNavigate: (screen: 'home' | 'community' | 'profile' | 'discussions' | 'products' | 'knowledgehub' | 'createCommunity' | 'createPost') => void;
}

const ProductListing: React.FC<ProductListingProps> = ({
  user,
  onSignOut,
  onNavigate,
}) => {
  const userName =
    user?.user?.name || user?.name || user?.email || 'User';

  // Sample product data - replace with actual data from your API/state
  const products = [
    { id: '1', name: 'Product 1', price: '$29.99', description: 'Description of product 1' },
    { id: '2', name: 'Product 2', price: '$39.99', description: 'Description of product 2' },
    { id: '3', name: 'Product 3', price: '$49.99', description: 'Description of product 3' },
  ];

  return (
    <View style={landingContainer.container}>
      <TopMenuBar
        userName={userName}
        onProfilePress={() => onNavigate('profile')}
      />

      {/* Scrollable content area */}
      <ScrollView
        style={scrollStyles.scroll}
        contentContainerStyle={scrollStyles.scrollContent}
      >
        <View style={landingContent.contentContainer}>
          <Text style={landingContent.title}>Products</Text>
          
          {products.length === 0 ? (
            <Text style={landingContent.subtitle}>
              No products available
            </Text>
          ) : (
            products.map((product) => (
              <View
                key={product.id}
                style={{
                  backgroundColor: '#1f2937',
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#374151',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#9146ff',
                    marginBottom: 4,
                  }}
                >
                  {product.price}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#9CA3AF',
                  }}
                >
                  {product.description}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <BottomMenuBar
        activeScreen="products"
        onNavigate={onNavigate}
      />
    </View>
  );
};

export default ProductListing;

