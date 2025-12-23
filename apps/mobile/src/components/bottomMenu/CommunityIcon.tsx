import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons, menuIconStyles } from '../../styles';

interface CommunityIconProps {
  isActive: boolean;
  onPress: () => void;
}

const CommunityIcon: React.FC<CommunityIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Community"
    >
      <Text style={menuIconStyles.menuIcon}>{icons.community}</Text>
    </TouchableOpacity>
  );
};

export default CommunityIcon;

