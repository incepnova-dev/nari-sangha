import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons, menuIconStyles } from '../../styles';

interface HomeIconProps {
  isActive: boolean;
  onPress: () => void;
}

const HomeIcon: React.FC<HomeIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Home"
    >
      <Text style={menuIconStyles.menuIcon}>{icons.home}</Text>
    </TouchableOpacity>
  );
};

export default HomeIcon;

