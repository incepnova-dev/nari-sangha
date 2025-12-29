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
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Let's get started</Text>
        <Text style={styles.sectionSubtitle}>
          Enter your mobile number to create your account
        </Text>

        {/* Form */}
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
              maxLength={10}
            />
          </View>
          <View style={styles.inputHint}>
            <Text style={styles.inputHintText}>🔒 We'll send you a verification code via SMS</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Email (Optional but Recommended)</Text>
          <TextInput
            style={styles.formInput}
            placeholder="your.email@example.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.inputHint}>
            <Text style={styles.inputHintText}>📧 For account recovery and updates</Text>
          </View>
        </View>

        {/* Privacy Options */}
        <View style={styles.privacyOptions}>
          <Text style={styles.privacyTitle}>🔐 Privacy & Safety</Text>
          
          <TouchableOpacity
            style={styles.checkboxGroup}
            onPress={() => setKeepLocationPrivate(!keepLocationPrivate)}
          >
            <View style={[styles.checkbox, keepLocationPrivate && styles.checkboxChecked]}>
              {keepLocationPrivate && <Text style={styles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>Keep my location private</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxGroup}
            onPress={() => setHideRealName(!hideRealName)}
          >
            <View style={[styles.checkbox, hideRealName && styles.checkboxChecked]}>
              {hideRealName && <Text style={styles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>Hide my real name in community</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, !phone.trim() && styles.btnDisabled]}
            onPress={handleContinue}
            disabled={!phone.trim()}
          >
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
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
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E91E63',
    borderRadius: 2,
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
  inputHint: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHintText: {
    fontSize: 13,
    color: '#666',
  },
  privacyOptions: {
    backgroundColor: '#F9F9F9',
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
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E91E63',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#E91E63',
  },
  checkboxCheck: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxText: {
    fontSize: 14,
    color: '#555',
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

export default SignUpIndiaPhone;

