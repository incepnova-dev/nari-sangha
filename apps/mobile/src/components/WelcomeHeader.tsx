import React, { useState } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import ProfileIcon from './topMenu/ProfileIcon';
import AlertIcon from './topMenu/AlertIcon';
import HamburgerMenu from './topMenu/HamburgerMenu';
import AlertModal from './AlertModal';
import SideMenu from './SideMenu';

interface WelcomeHeaderProps {
  userName: string;
  navigation?: any;
  user?: any;
  onSignOut?: () => void;
  onProfilePress?: () => void;
  onMenuPress?: () => void;
  showProfileIcon?: boolean;
  isProfileActive?: boolean;
  isMenuActive?: boolean;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  navigation,
  user,
  onSignOut,
  onProfilePress,
  onMenuPress,
  showProfileIcon = true,
  isProfileActive = false,
  isMenuActive = false,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Get status bar height for Android, use safe default for iOS
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const paddingTop = statusBarHeight + 12; // 12 is the base padding

  const handleAlertPress = () => {
    setIsAlertModalOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertModalOpen(false);
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    } else {
      setIsSideMenuOpen(true);
    }
  };

  // Determine if menu is active (either from prop or internal state)
  const menuActive = isMenuActive || isSideMenuOpen;

  return (
    <>
      <View style={[styles.container, { paddingTop }]}>
        <View style={styles.leftSection}>
          <HamburgerMenu 
            onPress={handleMenuPress} 
            isActive={menuActive} 
          />
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.welcomeName}>{userName} 👋</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <AlertIcon 
            onPress={handleAlertPress} 
            isActive={isAlertModalOpen}
          />
          {showProfileIcon && onProfilePress && (
            <ProfileIcon onPress={onProfilePress} isActive={isProfileActive} />
          )}
        </View>
      </View>
      <AlertModal isOpen={isAlertModalOpen} onClose={handleCloseAlert} />
      {navigation && user && (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          navigation={navigation}
          user={user}
          onSignOut={onSignOut}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  hamburgerPlaceholder: {
    width: 40,
    height: 40,
  },
  welcomeSection: {
    flex: 1,
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default WelcomeHeader;

