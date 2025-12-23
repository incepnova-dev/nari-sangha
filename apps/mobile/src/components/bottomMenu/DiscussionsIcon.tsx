import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons, menuIconStyles } from '../../styles';

interface DiscussionsIconProps {
  isActive: boolean;
  onPress: () => void;
}

const DiscussionsIcon: React.FC<DiscussionsIconProps> = ({
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Discussions"
    >
      <Text style={menuIconStyles.menuIcon}>{icons.discussions}</Text>
    </TouchableOpacity>
  );
};

export default DiscussionsIcon;

