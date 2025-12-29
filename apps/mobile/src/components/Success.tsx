import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Account Created!</Text>
        <Text style={styles.successMessage}>
          Welcome to Nari Swasthya Samuday!{'\n'}
          Your account has been successfully created and secured.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>Start Exploring</Text>
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

export default Success;

