import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { topMenuBarStyles, menuIconStyles, alertIconSources } from '../../styles';

interface AlertIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const AlertIcon: React.FC<AlertIconProps> = ({ onPress, isActive = false }) => {
  // Get the appropriate icon source and style based on isActive prop
  const iconSource = isActive ? alertIconSources.active : alertIconSources.inactive;
  const iconStyle = isActive 
    ? menuIconStyles.alertIconActive 
    : menuIconStyles.alertIconInactive;

  return (
    <TouchableOpacity
      style={topMenuBarStyles.alertIcon}
      onPress={onPress}
      accessibilityLabel="Open alerts"
    >
      <Image
        source={iconSource}
        style={iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default AlertIcon;

