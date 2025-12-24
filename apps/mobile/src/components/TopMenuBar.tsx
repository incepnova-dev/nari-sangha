import React, { useState } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { topMenuBarStyles } from '../styles';
import ProfileIcon from './topMenu/ProfileIcon';
import AlertIcon from './topMenu/AlertIcon';
import AlertModal from './AlertModal';

interface TopMenuBarProps {
  userName: string;
  subtitle?: string;
  onProfilePress?: () => void;
  showProfileIcon?: boolean;
  isProfileActive?: boolean;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
  userName,
  subtitle = 'You are now logged in',
  onProfilePress,
  showProfileIcon = true,
  isProfileActive = false,
}) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

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

  return (
    <>
      <View style={[topMenuBarStyles.topBar, { paddingTop }]}>
        <View style={topMenuBarStyles.leftSection}>
        </View>
        <View style={topMenuBarStyles.iconsContainer}>
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
    </>
  );
};

export default TopMenuBar;

