import React, { useState } from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import ProfileIcon from './topMenu/ProfileIcon';
import AlertIcon from './topMenu/AlertIcon';
import HamburgerMenu from './topMenu/HamburgerMenu';
import AlertModal from './AlertModal';
import SideMenu from './SideMenu';
import { welcomeHeaderStyles } from '../styles';

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
      <View style={[welcomeHeaderStyles.container, { paddingTop }]}>
        <View style={welcomeHeaderStyles.leftSection}>
          <HamburgerMenu 
            onPress={handleMenuPress} 
            isActive={menuActive} 
          />
          <View style={welcomeHeaderStyles.welcomeSection}>
            <Text style={welcomeHeaderStyles.welcomeText}>Welcome back,</Text>
            <Text style={welcomeHeaderStyles.welcomeName}>{userName} 👋</Text>
          </View>
        </View>
        <View style={welcomeHeaderStyles.iconsContainer}>
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

export default WelcomeHeader;

