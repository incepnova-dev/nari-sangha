import React, { useState, useRef, useEffect } from 'react';
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
  iconStyles,
  otpVerificationStyles,
} from '../styles';

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
          <Text style={headerStyles.headerTitle}>Verify OTP</Text>
          <View style={headerStyles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={formStyles.progressBar}>
          <View style={[formStyles.progressFill, { width: '66%' }]} />
        </View>

        {/* OTP Illustration */}
        <View style={otpVerificationStyles.otpIllustration}>
          <View style={iconStyles.iconContainerExtraLarge}>
            <Text style={iconStyles.iconTextExtraLarge}>📱</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={headerStyles.sectionTitleLarge}>Enter verification code</Text>
        <Text style={otpVerificationStyles.otpMessage}>
          We've sent a 6-digit code to{'\n'}
          <Text style={otpVerificationStyles.otpNumber}>{phoneNumber}</Text>
        </Text>

        {/* OTP Inputs */}
        <View style={formStyles.otpInputs}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={formStyles.otpDigit}
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
        <View style={otpVerificationStyles.resendSection}>
          <Text style={otpVerificationStyles.resendText}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
            <Text style={[otpVerificationStyles.resendBtn, resendTimer > 0 && otpVerificationStyles.resendBtnDisabled]}>
              Resend OTP {resendTimer > 0 ? `(00:${resendTimer.toString().padStart(2, '0')})` : ''}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <View style={otpVerificationStyles.btnContainer}>
          <TouchableOpacity
            style={[
              buttons.buttonFullWidth,
              buttons.primaryButton,
              otp.join('').length !== 6 && buttons.disabledButton,
            ]}
            onPress={() => handleVerify()}
            disabled={otp.join('').length !== 6}
          >
            <Text style={buttons.primaryButtonText}>Verify & Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTPVerification;

