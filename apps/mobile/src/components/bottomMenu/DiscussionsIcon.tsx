import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { menuIconStyles, discussionsIconSources } from '../../styles';

interface DiscussionsIconProps {
  isActive: boolean;
  onPress: () => void;
}

const DiscussionsIcon: React.FC<DiscussionsIconProps> = ({
  isActive,
  onPress,
}) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? discussionsIconSources.active : discussionsIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.discussionsIconActive 
    : menuIconStyles.discussionsIconInactive;

  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Discussions"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DiscussionsIcon;

