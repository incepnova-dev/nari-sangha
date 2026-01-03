import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { bottomMenuIconStyles } from '../../styles';

interface TrackIconProps {
  isActive: boolean;
  onPress: () => void;
}

const TrackIcon: React.FC<TrackIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={bottomMenuIconStyles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to Track"
    >
      <Text style={[bottomMenuIconStyles.navIcon, isActive && bottomMenuIconStyles.navIconActive]}>
        📊
      </Text>
      <Text style={[bottomMenuIconStyles.navLabel, isActive && bottomMenuIconStyles.navLabelActive]}>
        Track
      </Text>
    </TouchableOpacity>
  );
};

export default TrackIcon;

