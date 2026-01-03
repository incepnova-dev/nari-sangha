import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for OTPVerification
 */
export const otpVerificationStyles = StyleSheet.create({
  otpIllustration: {
    alignItems: 'center',
    marginVertical: spacing.xl * 2,
  },
  otpMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl * 2,
  },
  otpNumber: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  resendSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  resendText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  resendBtn: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  resendBtnDisabled: {
    opacity: 0.5,
  },
  btnContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
});

