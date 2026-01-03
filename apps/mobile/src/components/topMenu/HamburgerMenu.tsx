import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { hamburgerMenuStyles } from '../../styles';

interface HamburgerMenuProps {
  onPress: () => void;
  isActive?: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[hamburgerMenuStyles.container, isActive && hamburgerMenuStyles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Open menu"
    >
      <Text style={hamburgerMenuStyles.hamburgerIcon}>☰</Text>
    </TouchableOpacity>
  );
};

export default HamburgerMenu;

