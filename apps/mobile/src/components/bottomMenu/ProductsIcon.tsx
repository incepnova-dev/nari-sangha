import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { bottomMenuIconStyles } from '../../styles';

interface ProductsIconProps {
  isActive: boolean;
  onPress: () => void;
}

const ProductsIcon: React.FC<ProductsIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={bottomMenuIconStyles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to Products"
    >
      <Text style={[bottomMenuIconStyles.navIcon, isActive && bottomMenuIconStyles.navIconActive]}>
        🛍️
      </Text>
      <Text style={[bottomMenuIconStyles.navLabel, isActive && bottomMenuIconStyles.navLabelActive]}>
        Products
      </Text>
    </TouchableOpacity>
  );
};

export default ProductsIcon;
