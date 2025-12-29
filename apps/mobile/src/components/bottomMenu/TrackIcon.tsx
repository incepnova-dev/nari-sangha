import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface TrackIconProps {
  isActive: boolean;
  onPress: () => void;
}

const TrackIcon: React.FC<TrackIconProps> = ({ isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to Track"
    >
      <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
        📊
      </Text>
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
        Track
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 24,
    color: '#999',
  },
  navIconActive: {
    color: '#E91E63',
  },
  navLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#E91E63',
  },
});

export default TrackIcon;

