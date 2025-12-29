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

interface SignInProps {
  navigation?: any;
  onBack?: () => void;
  onSignIn?: (data: { phone?: string; email?: string; password: string }) => void;
  onSignInWithOTP?: () => void;
  onForgotPassword?: () => void;
}

const SignIn: React.FC<SignInProps> = ({
  navigation,
  onBack,
  onSignIn,
  onSignInWithOTP,
  onForgotPassword,
}) => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (activeTab === 'phone' && phone.trim() && password.trim()) {
      onSignIn?.({ phone: phone.trim(), password });
      navigation?.navigate('HomeLanding');
    } else if (activeTab === 'email' && email.trim() && password.trim()) {
      onSignIn?.({ email: email.trim(), password });
      navigation?.navigate('HomeLanding');
    }
  };

  const handleSignInWithOTP = () => {
    onSignInWithOTP?.();
    navigation?.navigate('OTPVerification');
  };

  const handleForgotPassword = () => {
    onForgotPassword?.();
    navigation?.navigate('AccountRecovery');
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
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Sign In Header */}
        <View style={styles.signinHeader}>
          <View style={styles.signinIcon}>
            <Text style={styles.signinIconText}>🌸</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Welcome back!</Text>
        <Text style={styles.sectionSubtitle}>
          Sign in to continue to your account
        </Text>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'phone' && styles.tabActive]}
            onPress={() => setActiveTab('phone')}
          >
            <Text style={[styles.tabText, activeTab === 'phone' && styles.tabTextActive]}>
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'email' && styles.tabActive]}
            onPress={() => setActiveTab('email')}
          >
            <Text style={[styles.tabText, activeTab === 'email' && styles.tabTextActive]}>
              Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'phone' ? (
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Mobile Number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={styles.formInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        ) : (
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextInput
              style={styles.formInput}
              placeholder="your.email@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.formInput}
              placeholder="Enter password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.togglePassword}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.btn,
            styles.btnPrimary,
            ((activeTab === 'phone' && !phone.trim()) || (activeTab === 'email' && !email.trim()) || !password.trim()) &&
              styles.btnDisabled,
          ]}
          onPress={handleSignIn}
          disabled={
            (activeTab === 'phone' && !phone.trim()) ||
            (activeTab === 'email' && !email.trim()) ||
            !password.trim()
          }
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Sign In with OTP */}
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={handleSignInWithOTP}>
          <Text style={styles.btnSecondaryText}>Sign In with OTP</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={styles.termsText}>
          Don't have an account?{' '}
          <Text style={styles.termsLink} onPress={() => navigation?.navigate('RegionSelection')}>
            Sign Up
          </Text>
        </Text>
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
  signinHeader: {
    alignItems: 'center',
    marginVertical: 40,
  },
  signinIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signinIconText: {
    fontSize: 40,
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
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    width: 100,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: -12,
    marginBottom: 24,
  },
  forgotLink: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '600',
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: '#E91E63',
  },
  btnSecondary: {
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    borderWidth: 2,
    borderColor: '#E91E63',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  btnSecondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  termsLink: {
    color: '#E91E63',
    fontWeight: '600',
  },
});

export default SignIn;

