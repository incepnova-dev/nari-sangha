import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { topMenuBarStyles, menuIconStyles, profileIconSources } from '../../styles';

interface ProfileIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ onPress, isActive = false }) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? profileIconSources.active : profileIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.profileIconActive 
    : menuIconStyles.profileIconInactive;

  return (
    <TouchableOpacity
      style={topMenuBarStyles.profileIcon}
      onPress={onPress}
      accessibilityLabel="Navigate to profile"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ProfileIcon;

