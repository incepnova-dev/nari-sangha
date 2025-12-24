import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { menuIconStyles, productsIconSources } from '../../styles';

interface ProductsIconProps {
  isActive: boolean;
  onPress: () => void;
}

const ProductsIcon: React.FC<ProductsIconProps> = ({ isActive, onPress }) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? productsIconSources.active : productsIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.productsIconActive 
    : menuIconStyles.productsIconInactive;

  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Products"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ProductsIcon;

