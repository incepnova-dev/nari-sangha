import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface AlertIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const AlertIcon: React.FC<AlertIconProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="View notifications"
    >
      <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
        <Text style={styles.iconText}>🔔</Text>
        {isActive && <View style={styles.notificationBadge} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  containerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'white',
    borderWidth: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconCircleActive: {
    backgroundColor: 'white',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    fontSize: 18,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4081',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default AlertIcon;
