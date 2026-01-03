import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Reusable form styles
 */
export const formStyles = StyleSheet.create({
  formGroup: {
    marginBottom: spacing.xl,
  },
  formLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  formInput: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border.medium,
    paddingHorizontal: spacing.xl,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    backgroundColor: colors.background.white,
    color: colors.text.primary,
  },
  formInputFocused: {
    borderColor: colors.primary,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  countryCode: {
    width: 100,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border.medium,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    backgroundColor: colors.background.white,
  },
  countryCodeText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  passwordInputContainer: {
    position: 'relative' as const,
  },
  togglePassword: {
    position: 'absolute' as const,
    right: spacing.xl,
    top: 18,
  },
  otpInputs: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    marginVertical: spacing.xl * 2,
  },
  otpDigit: {
    width: 56,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border.medium,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    backgroundColor: colors.background.white,
    color: colors.text.primary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.medium,
  },
  dividerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    fontWeight: typography.fontWeight.medium,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    marginBottom: spacing.xl * 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});

