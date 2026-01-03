import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for PasswordPinSetup
 */
export const passwordPinSetupStyles = StyleSheet.create({
  tabSwitcher: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl * 2,
    backgroundColor: colors.background.secondary,
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
    backgroundColor: colors.background.white,
  },
  tabText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  formGroup: {
    marginBottom: 24,
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
  passwordInputContainer: {
    position: 'relative' as const,
  },
  togglePassword: {
    position: 'absolute' as const,
    right: spacing.xl,
    top: 18,
  },
  passwordStrength: {
    marginTop: spacing.md,
  },
  strengthBar: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 4,
  },
  strengthWeak: {
    backgroundColor: colors.status.error,
    width: '33%',
  },
  strengthMedium: {
    backgroundColor: colors.status.warning,
    width: '66%',
  },
  strengthStrong: {
    backgroundColor: colors.button.success,
    width: '100%',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  securityTips: {
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 16,
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  privacyTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.button.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipIconText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  tipText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
    flex: 1,
  },
  btnContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
});

