import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { topMenuIconStyles } from '../../styles';

interface AlertIconProps {
  onPress: () => void;
  isActive?: boolean;
}

const AlertIcon: React.FC<AlertIconProps> = ({ onPress, isActive = false }) => {
  return (
    <TouchableOpacity
      style={[topMenuIconStyles.container, isActive && topMenuIconStyles.containerActive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel="View notifications"
    >
      <View style={[topMenuIconStyles.iconCircle, isActive && topMenuIconStyles.iconCircleActive]}>
        <Text style={topMenuIconStyles.iconText}>🔔</Text>
        {isActive && <View style={topMenuIconStyles.notificationBadge} />}
      </View>
    </TouchableOpacity>
  );
};

export default AlertIcon;
