import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { topMenuIconStyles } from '../../styles';

interface ProfileIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[topMenuIconStyles.container, isActive && topMenuIconStyles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to profile"
    >
      <View style={[topMenuIconStyles.iconCircle, isActive && topMenuIconStyles.iconCircleActive]}>
        <Text style={topMenuIconStyles.iconTextColored}>👤</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileIcon;
