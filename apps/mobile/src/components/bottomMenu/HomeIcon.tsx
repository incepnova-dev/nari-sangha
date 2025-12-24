import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { menuIconStyles, homeIconSources } from '../../styles';

interface HomeIconProps {
  isActive: boolean;
  onPress: () => void;
}

const HomeIcon: React.FC<HomeIconProps> = ({ isActive, onPress }) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? homeIconSources.active : homeIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.homeIconActive 
    : menuIconStyles.homeIconInactive;

  return (
    <TouchableOpacity
      style={[menuIconStyles.menuItem, isActive && menuIconStyles.menuItemActive]}
      onPress={onPress}
      accessibilityLabel="Navigate to Home"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default HomeIcon;

