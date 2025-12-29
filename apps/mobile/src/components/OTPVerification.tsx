import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

interface OTPVerificationProps {
  navigation?: any;
  onBack?: () => void;
  onVerify?: (otp: string) => void;
  phoneNumber?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  navigation,
  onBack,
  onVerify,
  phoneNumber = '+91 98765 43210',
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(45);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (otpCode?: string) => {
    const code = otpCode || otp.join('');
    if (code.length === 6) {
      onVerify?.(code);
      navigation?.navigate('PasswordPinSetup');
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(45);
      // Trigger resend OTP logic here
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
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>

        {/* OTP Illustration */}
        <View style={styles.otpIllustration}>
          <View style={styles.otpIcon}>
            <Text style={styles.otpIconText}>📱</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Enter verification code</Text>
        <Text style={styles.otpMessage}>
          We've sent a 6-digit code to{'\n'}
          <Text style={styles.otpNumber}>{phoneNumber}</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpInputs}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpDigit}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Resend Section */}
        <View style={styles.resendSection}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
            <Text style={[styles.resendBtn, resendTimer > 0 && styles.resendBtnDisabled]}>
              Resend OTP {resendTimer > 0 ? `(00:${resendTimer.toString().padStart(2, '0')})` : ''}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              styles.btnPrimary,
              otp.join('').length !== 6 && styles.btnDisabled,
            ]}
            onPress={() => handleVerify()}
            disabled={otp.join('').length !== 6}
          >
            <Text style={styles.btnText}>Verify & Continue</Text>
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
  otpIllustration: {
    alignItems: 'center',
    marginVertical: 40,
  },
  otpIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpIconText: {
    fontSize: 60,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },
  otpMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  otpNumber: {
    color: '#E91E63',
    fontWeight: '700',
  },
  otpInputs: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginVertical: 40,
  },
  otpDigit: {
    width: 56,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'white',
    color: '#333',
  },
  resendSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  resendBtn: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '700',
  },
  resendBtnDisabled: {
    opacity: 0.5,
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

export default OTPVerification;

