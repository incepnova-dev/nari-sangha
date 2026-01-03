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
  signUpIndiaPhoneStyles,
  colors,
} from '../styles';

interface SignUpIndiaPhoneProps {
  navigation?: any;
  onBack?: () => void;
  onContinue?: (data: { phone: string; email?: string; keepLocationPrivate: boolean; hideRealName: boolean }) => void;
}

const SignUpIndiaPhone: React.FC<SignUpIndiaPhoneProps> = ({
  navigation,
  onBack,
  onContinue,
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [keepLocationPrivate, setKeepLocationPrivate] = useState(true);
  const [hideRealName, setHideRealName] = useState(true);

  const handleContinue = () => {
    if (phone.trim()) {
      onContinue?.({
        phone: phone.trim(),
        email: email.trim() || undefined,
        keepLocationPrivate,
        hideRealName,
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
          Enter your mobile number to create your account
        </Text>

        {/* Form */}
        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Mobile Number</Text>
          <View style={formStyles.phoneInputContainer}>
            <View style={formStyles.countryCode}>
              <Text style={formStyles.countryCodeText}>🇮🇳 +91</Text>
            </View>
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter mobile number"
              placeholderTextColor={colors.text.tertiary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <View style={signUpIndiaPhoneStyles.inputHint}>
            <Text style={signUpIndiaPhoneStyles.inputHintText}>🔒 We'll send you a verification code via SMS</Text>
          </View>
        </View>

        <View style={formStyles.formGroup}>
          <Text style={formStyles.formLabel}>Email (Optional but Recommended)</Text>
          <TextInput
            style={formStyles.formInput}
            placeholder="your.email@example.com"
            placeholderTextColor={colors.text.tertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={signUpIndiaPhoneStyles.inputHint}>
            <Text style={signUpIndiaPhoneStyles.inputHintText}>📧 For account recovery and updates</Text>
          </View>
        </View>

        {/* Privacy Options */}
        <View style={signUpIndiaPhoneStyles.privacyOptions}>
          <Text style={signUpIndiaPhoneStyles.privacyTitle}>🔐 Privacy & Safety</Text>
          
          <TouchableOpacity
            style={signUpIndiaPhoneStyles.checkboxGroup}
            onPress={() => setKeepLocationPrivate(!keepLocationPrivate)}
          >
            <View style={[signUpIndiaPhoneStyles.checkbox, keepLocationPrivate && signUpIndiaPhoneStyles.checkboxChecked]}>
              {keepLocationPrivate && <Text style={signUpIndiaPhoneStyles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={signUpIndiaPhoneStyles.checkboxText}>Keep my location private</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={signUpIndiaPhoneStyles.checkboxGroup}
            onPress={() => setHideRealName(!hideRealName)}
          >
            <View style={[signUpIndiaPhoneStyles.checkbox, hideRealName && signUpIndiaPhoneStyles.checkboxChecked]}>
              {hideRealName && <Text style={signUpIndiaPhoneStyles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={signUpIndiaPhoneStyles.checkboxText}>Hide my real name in community</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={signUpIndiaPhoneStyles.btnContainer}>
          <TouchableOpacity
            style={[buttons.buttonFullWidth, buttons.primaryButton, !phone.trim() && buttons.disabledButton]}
            onPress={handleContinue}
            disabled={!phone.trim()}
          >
            <Text style={buttons.primaryButtonText}>Send OTP</Text>
          </TouchableOpacity>
          <Text style={signUpIndiaPhoneStyles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={signUpIndiaPhoneStyles.termsLink}>Terms</Text> and{' '}
            <Text style={signUpIndiaPhoneStyles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpIndiaPhone;

