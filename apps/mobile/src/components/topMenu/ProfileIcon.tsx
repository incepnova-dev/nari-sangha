import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { topMenuBarStyles, icons } from '../../styles';

interface ProfileIconProps {
  onPress: () => void;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={topMenuBarStyles.profileIcon}
      onPress={onPress}
      accessibilityLabel="Navigate to profile"
    >
      <Text style={topMenuBarStyles.profileIconText}>{icons.profile}</Text>
    </TouchableOpacity>
  );
};

export default ProfileIcon;

