import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons, menuIconStyles } from '../../styles';

interface CreateCommunityIconProps {
  isActive: boolean;
  onPress: () => void;
}

const CreateCommunityIcon: React.FC<CreateCommunityIconProps> = ({
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Create Community"
    >
      <Text style={menuIconStyles.menuIcon}>
        {icons.createCommunity}
      </Text>
    </TouchableOpacity>
  );
};

export default CreateCommunityIcon;

