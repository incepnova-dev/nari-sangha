import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface HamburgerMenuProps {
  onPress: () => void;
  isActive?: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="Open menu"
    >
      <Text style={styles.hamburgerIcon}>☰</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 8, // Square with rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    // Ensure it's visible
    zIndex: 10,
    elevation: 5,
  },
  containerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'white',
    borderWidth: 2,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default HamburgerMenu;

