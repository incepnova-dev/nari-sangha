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
  signUpGlobalEmailStyles,
  colors,
} from '../styles';

interface SignUpGlobalEmailProps {
  navigation?: any;
  onBack?: () => void;
  onContinue?: (data: { email?: string; phone?: string; keepLocationPrivate: boolean; useDisplayName: boolean }) => void;
}

const SignUpGlobalEmail: React.FC<SignUpGlobalEmailProps> = ({
  navigation,
  onBack,
  onContinue,
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<string>('🇺🇸 +1');
  const [keepLocationPrivate, setKeepLocationPrivate] = useState(true);
  const [useDisplayName, setUseDisplayName] = useState(true);

  const countryCodes: Array<{ flag: string; code: string; label: string }> = [
    { flag: '🇺🇸', code: '+1', label: '🇺🇸 +1' },
    { flag: '🇬🇧', code: '+44', label: '🇬🇧 +44' },
    { flag: '🇨🇦', code: '+1', label: '🇨🇦 +1' },
    { flag: '🇦🇺', code: '+61', label: '🇦🇺 +61' },
    { flag: '🇮🇳', code: '+91', label: '🇮🇳 +91' },
  ];

  const handleContinue = () => {
    if (activeTab === 'email' && email.trim()) {
      onContinue?.({
        email: email.trim(),
        phone: phone.trim() || undefined,
        keepLocationPrivate,
        useDisplayName,
      });
      navigation?.navigate('OTPVerification');
    } else if (activeTab === 'phone' && phone.trim()) {
      onContinue?.({
        email: email.trim() || undefined,
        phone: phone.trim(),
        keepLocationPrivate,
        useDisplayName,
      });
      navigation?.navigate('OTPVerification');
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
          <Text style={headerStyles.headerTitleNoBackground}>Create Account</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={formStyles.progressBar}>
          <View style={[formStyles.progressFill, { width: '33%' }]} />
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Let's get started</Text>
        <Text style={headerStyles.sectionSubtitle}>
          Choose your preferred signup method
        </Text>

        {/* Tab Switcher */}
        <View style={signUpGlobalEmailStyles.tabSwitcher}>
          <TouchableOpacity
            style={[signUpGlobalEmailStyles.tab, activeTab === 'email' && signUpGlobalEmailStyles.tabActive]}
            onPress={() => setActiveTab('email')}
          >
            <Text style={[signUpGlobalEmailStyles.tabText, activeTab === 'email' && signUpGlobalEmailStyles.tabTextActive]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[signUpGlobalEmailStyles.tab, activeTab === 'phone' && signUpGlobalEmailStyles.tabActive]}
            onPress={() => setActiveTab('phone')}
          >
            <Text style={[signUpGlobalEmailStyles.tabText, activeTab === 'phone' && signUpGlobalEmailStyles.tabTextActive]}>
              Phone
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'email' ? (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Email Address</Text>
            <TextInput
              style={formStyles.formInput}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.text.tertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={signUpGlobalEmailStyles.inputHint}>
              <Text style={signUpGlobalEmailStyles.inputHintText}>📧 We'll send you a verification link</Text>
            </View>
          </View>
        ) : (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Phone Number</Text>
            <View style={formStyles.phoneInputContainer}>
              <View style={formStyles.countryCode}>
                <Text style={formStyles.countryCodeText}>{countryCode}</Text>
              </View>
              <TextInput
                style={formStyles.formInput}
                placeholder="Enter phone number"
                placeholderTextColor={colors.text.tertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={signUpGlobalEmailStyles.inputHint}>
              <Text style={signUpGlobalEmailStyles.inputHintText}>🔒 For added security and recovery</Text>
            </View>
          </View>
        )}

        {activeTab === 'email' && (
          <View style={formStyles.formGroup}>
            <Text style={formStyles.formLabel}>Phone Number (Optional)</Text>
            <View style={formStyles.phoneInputContainer}>
              <View style={formStyles.countryCode}>
                <Text style={formStyles.countryCodeText}>{countryCode}</Text>
              </View>
              <TextInput
                style={formStyles.formInput}
                placeholder="Enter phone number"
                placeholderTextColor={colors.text.tertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={signUpGlobalEmailStyles.inputHint}>
              <Text style={signUpGlobalEmailStyles.inputHintText}>🔒 For added security and recovery</Text>
            </View>
          </View>
        )}

        {/* Privacy Options */}
        <View style={signUpGlobalEmailStyles.privacyOptions}>
          <Text style={signUpGlobalEmailStyles.privacyTitle}>🔐 Privacy & Safety</Text>
          
          <TouchableOpacity
            style={signUpGlobalEmailStyles.checkboxGroup}
            onPress={() => setKeepLocationPrivate(!keepLocationPrivate)}
          >
            <View style={[signUpGlobalEmailStyles.checkbox, keepLocationPrivate && signUpGlobalEmailStyles.checkboxChecked]}>
              {keepLocationPrivate && <Text style={signUpGlobalEmailStyles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={signUpGlobalEmailStyles.checkboxText}>Keep my location private</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={signUpGlobalEmailStyles.checkboxGroup}
            onPress={() => setUseDisplayName(!useDisplayName)}
          >
            <View style={[signUpGlobalEmailStyles.checkbox, useDisplayName && signUpGlobalEmailStyles.checkboxChecked]}>
              {useDisplayName && <Text style={signUpGlobalEmailStyles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={signUpGlobalEmailStyles.checkboxText}>Use display name in community</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={signUpGlobalEmailStyles.btnContainer}>
          <TouchableOpacity
            style={[
              buttons.buttonFullWidth,
              buttons.primaryButton,
              ((activeTab === 'email' && !email.trim()) || (activeTab === 'phone' && !phone.trim())) &&
                buttons.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={
              (activeTab === 'email' && !email.trim()) || (activeTab === 'phone' && !phone.trim())
            }
          >
            <Text style={buttons.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
          <Text style={signUpGlobalEmailStyles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={signUpGlobalEmailStyles.termsLink}>Terms</Text> and{' '}
            <Text style={signUpGlobalEmailStyles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpGlobalEmail;

