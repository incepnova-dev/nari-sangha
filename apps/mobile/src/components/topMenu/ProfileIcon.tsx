import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface ProfileIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Navigate to profile"
    >
      <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
        <Text style={styles.iconText}>👤</Text>
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
    color: '#E91E63',
  },
});

export default ProfileIcon;
