import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { bottomMenuIconStyles } from '../../styles';

interface HomeIconProps {
  isActive: boolean;
  onPress: () => void;
}

const HomeIcon: React.FC<HomeIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={bottomMenuIconStyles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to Home"
    >
      <Text style={[bottomMenuIconStyles.navIcon, isActive && bottomMenuIconStyles.navIconActive]}>
        🏠
      </Text>
      <Text style={[bottomMenuIconStyles.navLabel, isActive && bottomMenuIconStyles.navLabelActive]}>
        Home
      </Text>
    </TouchableOpacity>
  );
};

export default HomeIcon;
