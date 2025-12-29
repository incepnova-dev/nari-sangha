import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

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
          <Text style={styles.headerTitle}>Secure Your Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Set up security</Text>
        <Text style={styles.sectionSubtitle}>
          Choose a password or PIN to protect your account
        </Text>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'password' && styles.tabActive]}
            onPress={() => setActiveTab('password')}
          >
            <Text style={[styles.tabText, activeTab === 'password' && styles.tabTextActive]}>
              Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pin' && styles.tabActive]}
            onPress={() => setActiveTab('pin')}
          >
            <Text style={[styles.tabText, activeTab === 'pin' && styles.tabTextActive]}>
              4-Digit PIN
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'password' ? (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Create Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.togglePassword}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {password && (
                <View style={styles.passwordStrength}>
                  <View style={styles.strengthBar}>
                    <View
                      style={[
                        styles.strengthFill,
                        passwordStrength === 'weak' && styles.strengthWeak,
                        passwordStrength === 'medium' && styles.strengthMedium,
                        passwordStrength === 'strong' && styles.strengthStrong,
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.strengthText,
                      passwordStrength === 'weak' && { color: '#F44336' },
                      passwordStrength === 'medium' && { color: '#FF9800' },
                      passwordStrength === 'strong' && { color: '#4CAF50' },
                    ]}
                  >
                    {passwordStrength === 'weak' && 'Weak password'}
                    {passwordStrength === 'medium' && 'Medium strength'}
                    {passwordStrength === 'strong' && 'Strong password'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Confirm Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Re-enter password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.togglePassword}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.securityTips}>
              <Text style={styles.privacyTitle}>💡 Password Tips</Text>
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Text style={styles.tipIconText}>✓</Text>
                </View>
                <Text style={styles.tipText}>Use at least 8 characters</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Text style={styles.tipIconText}>✓</Text>
                </View>
                <Text style={styles.tipText}>Include uppercase & lowercase letters</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Text style={styles.tipIconText}>✓</Text>
                </View>
                <Text style={styles.tipText}>Add numbers and special characters</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Enter 4-Digit PIN</Text>
            <TextInput
              style={styles.formInput}
              placeholder="0000"
              placeholderTextColor="#999"
              value={pin}
              onChangeText={(value) => setPin(value.replace(/[^0-9]/g, '').slice(0, 4))}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>
        )}

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, !isFormValid() && styles.btnDisabled]}
            onPress={handleComplete}
            disabled={!isFormValid()}
          >
            <Text style={styles.btnText}>Complete Setup</Text>
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
  tabSwitcher: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#E91E63',
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'white',
    color: '#333',
  },
  passwordInputContainer: {
    position: 'relative',
  },
  togglePassword: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  passwordStrength: {
    marginTop: 12,
  },
  strengthBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 4,
  },
  strengthWeak: {
    backgroundColor: '#F44336',
    width: '33%',
  },
  strengthMedium: {
    backgroundColor: '#FF9800',
    width: '66%',
  },
  strengthStrong: {
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  securityTips: {
    backgroundColor: '#FFF5F7',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  tipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipIconText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  tipText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    flex: 1,
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

export default PasswordPinSetup;

