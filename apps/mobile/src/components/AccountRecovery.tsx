import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

interface AccountRecoveryProps {
  navigation?: any;
  onBack?: () => void;
  onContinue?: (method: 'phone' | 'email') => void;
}

const AccountRecovery: React.FC<AccountRecoveryProps> = ({
  navigation,
  onBack,
  onContinue,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'phone' | 'email' | null>(null);

  const handleContinue = () => {
    if (selectedMethod) {
      onContinue?.(selectedMethod);
      navigation?.navigate('OTPVerification');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Recovery</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Recovery Illustration */}
        <View style={styles.recoveryIllustration}>
          <View style={styles.recoveryIcon}>
            <Text style={styles.recoveryIconText}>🔑</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Recover your account</Text>
        <Text style={styles.sectionSubtitle}>
          Choose how you'd like to recover your account
        </Text>

        {/* Recovery Options */}
        <View style={styles.recoveryOptions}>
          <TouchableOpacity
            style={[
              styles.recoveryCard,
              selectedMethod === 'phone' && styles.recoveryCardSelected,
            ]}
            onPress={() => setSelectedMethod('phone')}
          >
            <View style={styles.recoveryCardHeader}>
              <View style={styles.recoveryCardIcon}>
                <Text style={styles.recoveryCardIconText}>📱</Text>
              </View>
              <Text style={styles.recoveryCardTitle}>Via Phone Number</Text>
            </View>
            <Text style={styles.recoveryCardDescription}>
              We'll send a verification code to your registered mobile number ending in ****3210
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.recoveryCard,
              selectedMethod === 'email' && styles.recoveryCardSelected,
            ]}
            onPress={() => setSelectedMethod('email')}
          >
            <View style={styles.recoveryCardHeader}>
              <View style={styles.recoveryCardIcon}>
                <Text style={styles.recoveryCardIconText}>📧</Text>
              </View>
              <Text style={styles.recoveryCardTitle}>Via Email</Text>
            </View>
            <Text style={styles.recoveryCardDescription}>
              We'll send a recovery link to your registered email address s****a@example.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Notice */}
        <View style={styles.aliasNote}>
          <Text style={styles.aliasNoteTitle}>🔐 Security Notice</Text>
          <Text style={styles.aliasNoteText}>
            For your protection, you may be asked to verify sensitive actions like password reset or device change with an additional OTP.
          </Text>
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, !selectedMethod && styles.btnDisabled]}
            onPress={handleContinue}
            disabled={!selectedMethod}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  recoveryIllustration: {
    alignItems: 'center',
    marginVertical: 40,
  },
  recoveryIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  recoveryIconText: {
    fontSize: 50,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 40,
  },
  recoveryOptions: {
    gap: 16,
    marginTop: 30,
  },
  recoveryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  recoveryCardSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF5F7',
  },
  recoveryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  recoveryCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveryCardIconText: {
    fontSize: 24,
  },
  recoveryCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  recoveryCardDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 64,
  },
  aliasNote: {
    backgroundColor: '#FFF5F7',
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  aliasNoteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 8,
  },
  aliasNoteText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  btnContainer: {
    marginTop: 20,
    paddingTop: 20,
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#E91E63',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default AccountRecovery;

