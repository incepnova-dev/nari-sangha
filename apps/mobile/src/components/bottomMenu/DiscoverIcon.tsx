import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { bottomMenuIconStyles } from '../../styles';

interface DiscoverIconProps {
  isActive: boolean;
  onPress: () => void;
}

const DiscoverIcon: React.FC<DiscoverIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={bottomMenuIconStyles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to Discover"
    >
      <Text style={[bottomMenuIconStyles.navIcon, isActive && bottomMenuIconStyles.navIconActive]}>
        🔍
      </Text>
      <Text style={[bottomMenuIconStyles.navLabel, isActive && bottomMenuIconStyles.navLabelActive]}>
        Discover
      </Text>
    </TouchableOpacity>
  );
};

export default DiscoverIcon;

