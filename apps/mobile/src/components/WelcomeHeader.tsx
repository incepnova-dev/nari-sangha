import React, { useState } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import ProfileIcon from './topMenu/ProfileIcon';
import AlertIcon from './topMenu/AlertIcon';
import AlertModal from './AlertModal';

interface WelcomeHeaderProps {
  userName: string;
  navigation?: any;
  onProfilePress?: () => void;
  showProfileIcon?: boolean;
  isProfileActive?: boolean;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
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
      <View style={[styles.container, { paddingTop }]}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.welcomeName}>{userName} 👋</Text>
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
  welcomeSection: {
    flex: 1,
    marginRight: 12,
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

