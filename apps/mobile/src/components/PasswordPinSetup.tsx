import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  containerStyles,
  headerStyles,
  buttons,
  formStyles,
  passwordPinSetupStyles,
  colors,
} from '../styles';

interface PasswordPinSetupProps {
  navigation?: any;
  onBack?: () => void;
  onComplete?: (data: { password?: string; pin?: string }) => void;
  flow?: 'signup' | 'reset' | null;
}

const PasswordPinSetup: React.FC<PasswordPinSetupProps> = ({
  navigation,
  onBack,
  onComplete,
  flow,
}) => {
  const [activeTab, setActiveTab] = useState<'password' | 'pin'>('password');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setPasswordStrength(calculatePasswordStrength(value));
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleComplete = () => {
    const nextRoute = flow === 'reset' ? 'SuccessAccountRecovery' : 'TermsConditions';

    if (activeTab === 'password') {
      if (password && password === confirmPassword) {
        onComplete?.({ password });
        navigation?.navigate(nextRoute);
      }
    } else {
      if (pin.length === 4) {
        onComplete?.({ pin });
        navigation?.navigate(nextRoute);
      }
    }
  };

  const isFormValid = () => {
    if (activeTab === 'password') {
      return password && password === confirmPassword && passwordStrength !== 'weak';
    } else {
      return pin.length === 4;
    }
  };

  return (
    <View style={[containerStyles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={[containerStyles.scrollContentSmall, { paddingTop: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.headerNoBackground}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitleNoBackground}>Secure Your Account</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Set up security</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose a password or PIN to protect your account
        </Text>

        {/* Tab Switcher */}
        <View style={passwordPinSetupStyles.tabSwitcher}>
          <TouchableOpacity
            style={[passwordPinSetupStyles.tab, activeTab === 'password' && passwordPinSetupStyles.tabActive]}
            onPress={() => setActiveTab('password')}
          >
            <Text style={[passwordPinSetupStyles.tabText, activeTab === 'password' && passwordPinSetupStyles.tabTextActive]}>
              Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[passwordPinSetupStyles.tab, activeTab === 'pin' && passwordPinSetupStyles.tabActive]}
            onPress={() => setActiveTab('pin')}
          >
            <Text style={[passwordPinSetupStyles.tabText, activeTab === 'pin' && passwordPinSetupStyles.tabTextActive]}>
              4-Digit PIN
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'password' ? (
          <>
            <View style={formStyles.formGroup}>
              <Text style={formStyles.formLabel}>Create Password</Text>
              <View style={formStyles.passwordInputContainer}>
                <TextInput
                  style={formStyles.formInput}
                  placeholder="Enter password"
                  placeholderTextColor={colors.text.tertiary}
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={formStyles.togglePassword}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {password && (
                <View style={passwordPinSetupStyles.passwordStrength}>
                  <View style={passwordPinSetupStyles.strengthBar}>
                    <View
                      style={[
                        passwordPinSetupStyles.strengthFill,
                        passwordStrength === 'weak' && passwordPinSetupStyles.strengthWeak,
                        passwordStrength === 'medium' && passwordPinSetupStyles.strengthMedium,
                        passwordStrength === 'strong' && passwordPinSetupStyles.strengthStrong,
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      passwordPinSetupStyles.strengthText,
                      passwordStrength === 'weak' && { color: colors.status.error },
                      passwordStrength === 'medium' && { color: colors.status.warning },
                      passwordStrength === 'strong' && { color: colors.button.success },
                    ]}
                  >
                    {passwordStrength === 'weak' && 'Weak password'}
                    {passwordStrength === 'medium' && 'Medium strength'}
                    {passwordStrength === 'strong' && 'Strong password'}
                  </Text>
                </View>
              )}
            </View>

            <View style={formStyles.formGroup}>
              <Text style={formStyles.formLabel}>Confirm Password</Text>
              <View style={formStyles.passwordInputContainer}>
                <TextInput
                  style={formStyles.formInput}
                  placeholder="Re-enter password"
                  placeholderTextColor={colors.text.tertiary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={formStyles.togglePassword}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={passwordPinSetupStyles.securityTips}>
              <Text style={passwordPinSetupStyles.privacyTitle}>💡 Password Tips</Text>
              <View style={passwordPinSetupStyles.tipItem}>
                <View style={passwordPinSetupStyles.tipIcon}>
                  <Text style={passwordPinSetupStyles.tipIconText}>✓</Text>
                </View>
                <Text style={passwordPinSetupStyles.tipText}>Use at least 8 characters</Text>
              </View>
              <View style={passwordPinSetupStyles.tipItem}>
                <View style={passwordPinSetupStyles.tipIcon}>
                  <Text style={passwordPinSetupStyles.tipIconText}>✓</Text>
                </View>
                <Text style={passwordPinSetupStyles.tipText}>Include uppercase & lowercase letters</Text>
              </View>
              <View style={passwordPinSetupStyles.tipItem}>
                <View style={passwordPinSetupStyles.tipIcon}>
                  <Text style={passwordPinSetupStyles.tipIconText}>✓</Text>
                </View>
                <Text style={passwordPinSetupStyles.tipText}>Add numbers and special characters</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Enter 4-Digit PIN</Text>
            <TextInput
              style={formStyles.formInput}
              placeholder="0000"
              placeholderTextColor={colors.text.tertiary}
              value={pin}
              onChangeText={(value) => setPin(value.replace(/[^0-9]/g, '').slice(0, 4))}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>
        )}

        {/* Button */}
        <View style={passwordPinSetupStyles.btnContainer}>
          <TouchableOpacity
            style={[buttons.buttonFullWidth, buttons.primaryButton, !isFormValid() && buttons.disabledButton]}
            onPress={handleComplete}
            disabled={!isFormValid()}
          >
            <Text style={buttons.primaryButtonText}>Complete Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PasswordPinSetup;

