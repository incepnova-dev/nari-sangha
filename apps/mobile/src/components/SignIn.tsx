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
  formStyles,
  buttons,
  signInStyles,
  iconStyles,
} from '../styles';

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
    <View style={containerStyles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={containerStyles.scrollView}
        contentContainerStyle={containerStyles.scrollContentSmall}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={headerStyles.header}>
          <TouchableOpacity style={headerStyles.backButton} onPress={onBack || (() => navigation?.goBack())}>
            <Text style={headerStyles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={headerStyles.headerTitle}>Sign In</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Sign In Header */}
        <View style={signInStyles.signinHeader}>
          <View style={iconStyles.iconContainerLarge}>
            <Text style={iconStyles.iconTextLarge}>🌸</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Welcome back!</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Sign in to continue to your account
        </Text>

        {/* Tab Switcher */}
        <View style={signInStyles.tabSwitcher}>
          <TouchableOpacity
            style={[signInStyles.tab, activeTab === 'phone' && signInStyles.tabActive]}
            onPress={() => setActiveTab('phone')}
          >
            <Text style={[signInStyles.tabText, activeTab === 'phone' && signInStyles.tabTextActive]}>
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[signInStyles.tab, activeTab === 'email' && signInStyles.tabActive]}
            onPress={() => setActiveTab('email')}
          >
            <Text style={[signInStyles.tabText, activeTab === 'email' && signInStyles.tabTextActive]}>
              Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'phone' ? (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Mobile Number</Text>
            <View style={formStyles.phoneInputContainer}>
              <View style={formStyles.countryCode}>
                <Text style={formStyles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                style={formStyles.formInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        ) : (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Email Address</Text>
            <TextInput
              style={formStyles.formInput}
              placeholder="your.email@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Password</Text>
          <View style={formStyles.passwordInputContainer}>
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={formStyles.togglePassword}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={signInStyles.forgotPassword}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={signInStyles.forgotLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            buttons.buttonFullWidth,
            buttons.primaryButton,
            ((activeTab === 'phone' && !phone.trim()) || (activeTab === 'email' && !email.trim()) || !password.trim()) &&
              buttons.disabledButton,
          ]}
          onPress={handleSignIn}
          disabled={
            (activeTab === 'phone' && !phone.trim()) ||
            (activeTab === 'email' && !email.trim()) ||
            !password.trim()
          }
        >
          <Text style={buttons.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={formStyles.divider}>
          <View style={formStyles.dividerLine} />
          <Text style={formStyles.dividerText}>OR</Text>
          <View style={formStyles.dividerLine} />
        </View>

        {/* Sign In with OTP */}
        <TouchableOpacity style={[buttons.buttonFullWidth, buttons.secondaryButton]} onPress={handleSignInWithOTP}>
          <Text style={buttons.secondaryButtonText}>Sign In with OTP</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={signInStyles.termsText}>
          Don't have an account?{' '}
          <Text style={signInStyles.termsLink} onPress={() => navigation?.navigate('RegionSelection')}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignIn;

