import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Password Updated Successfully!</Text>
        <Text style={styles.successMessage}>
          Your password has been successfully updated.{'\n'}
          You can now log in with your new password.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 4,
    borderColor: 'white',
  },
  successIconText: {
    fontSize: 60,
    color: 'white',
    fontWeight: '700',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 280,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export default SuccessAccountRecovery;

