import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { successStyles, containerStyles } from '../styles';
import { colors } from '../styles';

interface SuccessProps {
  navigation?: any;
  onContinue?: () => void;
}

const Success: React.FC<SuccessProps> = ({ navigation, onContinue }) => {
  const handleContinue = () => {
    onContinue?.();
    navigation?.navigate('HealthProfileSetup');
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.button.success }]}>
      <StatusBar barStyle="light-content" />
      <View style={successStyles.content}>
        <View style={successStyles.successIcon}>
          <Text style={successStyles.successIconText}>✓</Text>
        </View>
        <Text style={successStyles.successTitle}>Account Created!</Text>
        <Text style={successStyles.successMessage}>
          Welcome to Nari Swasthya Samuday!{'\n'}
          Your account has been successfully created and secured.
        </Text>
        <TouchableOpacity style={successStyles.btn} onPress={handleContinue}>
          <Text style={successStyles.btnText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;

