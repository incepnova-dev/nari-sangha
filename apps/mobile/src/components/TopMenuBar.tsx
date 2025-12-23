import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { topMenuBarStyles } from '../styles';
import ProfileIcon from './topMenu/ProfileIcon';

interface TopMenuBarProps {
  userName: string;
  subtitle?: string;
  onProfilePress?: () => void;
  showProfileIcon?: boolean;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
  userName,
  subtitle = 'You are now logged in',
  onProfilePress,
  showProfileIcon = true,
}) => {
  // Get status bar height for Android, use safe default for iOS
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const paddingTop = statusBarHeight + 12; // 12 is the base padding

  return (
    <View style={[topMenuBarStyles.topBar, { paddingTop }]}>
      <View style={topMenuBarStyles.leftSection}>
      </View>
      {showProfileIcon && onProfilePress && (
        <ProfileIcon onPress={onProfilePress} />
      )}
    </View>
  );
};

export default TopMenuBar;

