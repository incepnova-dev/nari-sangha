import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { successAccountRecoveryStyles } from '../styles';

interface SuccessAccountRecoveryProps {
  navigation?: any;
  onContinue?: () => void;
  onLogin?: () => void;
}

const SuccessAccountRecovery: React.FC<SuccessAccountRecoveryProps> = ({
  navigation,
  onContinue,
  onLogin,
}) => {
  const handleLogin = () => {
    onLogin?.();
    navigation?.navigate('SignIn');
  };

  return (
    <View style={successAccountRecoveryStyles.container}>
      <StatusBar barStyle="light-content" />
      <View style={successAccountRecoveryStyles.content}>
        <View style={successAccountRecoveryStyles.successIcon}>
          <Text style={successAccountRecoveryStyles.successIconText}>✓</Text>
        </View>
        <Text style={successAccountRecoveryStyles.successTitle}>Password Updated Successfully!</Text>
        <Text style={successAccountRecoveryStyles.successMessage}>
          Your password has been successfully updated.{'\n'}
          You can now log in with your new password.
        </Text>
        <TouchableOpacity style={successAccountRecoveryStyles.btn} onPress={handleLogin}>
          <Text style={successAccountRecoveryStyles.btnText}>Login Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessAccountRecovery;

