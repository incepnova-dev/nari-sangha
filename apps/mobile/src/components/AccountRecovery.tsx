import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  containerStyles,
  headerStyles,
  buttons,
  accountRecoveryStyles,
  colors,
} from '../styles';

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
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={[containerStyles.scrollContent, { paddingTop: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Account Recovery</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Recovery Illustration */}
        <View style={accountRecoveryStyles.recoveryIllustration}>
          <View style={accountRecoveryStyles.recoveryIcon}>
            <Text style={accountRecoveryStyles.recoveryIconText}>🔑</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Recover your account</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose how you'd like to recover your account
        </Text>

        {/* Recovery Options */}
        <View style={accountRecoveryStyles.recoveryOptions}>
          <TouchableOpacity
            style={[
              accountRecoveryStyles.recoveryCard,
              selectedMethod === 'phone' && accountRecoveryStyles.recoveryCardSelected,
            ]}
            onPress={() => setSelectedMethod('phone')}
          >
            <View style={accountRecoveryStyles.recoveryCardHeader}>
              <View style={accountRecoveryStyles.recoveryCardIcon}>
                <Text style={accountRecoveryStyles.recoveryCardIconText}>📱</Text>
              </View>
              <Text style={accountRecoveryStyles.recoveryCardTitle}>Via Phone Number</Text>
            </View>
            <Text style={accountRecoveryStyles.recoveryCardDescription}>
              We'll send a verification code to your registered mobile number ending in ****3210
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              accountRecoveryStyles.recoveryCard,
              selectedMethod === 'email' && accountRecoveryStyles.recoveryCardSelected,
            ]}
            onPress={() => setSelectedMethod('email')}
          >
            <View style={accountRecoveryStyles.recoveryCardHeader}>
              <View style={accountRecoveryStyles.recoveryCardIcon}>
                <Text style={accountRecoveryStyles.recoveryCardIconText}>📧</Text>
              </View>
              <Text style={accountRecoveryStyles.recoveryCardTitle}>Via Email</Text>
            </View>
            <Text style={accountRecoveryStyles.recoveryCardDescription}>
              We'll send a recovery link to your registered email address s****a@example.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Notice */}
        <View style={accountRecoveryStyles.aliasNote}>
          <Text style={accountRecoveryStyles.aliasNoteTitle}>🔐 Security Notice</Text>
          <Text style={accountRecoveryStyles.aliasNoteText}>
            For your protection, you may be asked to verify sensitive actions like password reset or device change with an additional OTP.
          </Text>
        </View>

        {/* Button */}
        <View style={accountRecoveryStyles.btnContainer}>
          <TouchableOpacity
            style={[
              buttons.buttonFullWidth,
              buttons.primaryButton,
              !selectedMethod && buttons.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedMethod}
          >
            <Text style={buttons.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountRecovery;

