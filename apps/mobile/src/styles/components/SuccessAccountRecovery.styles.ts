import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for SuccessAccountRecovery
 */
export const successAccountRecoveryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.button.success,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl * 2,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl * 2,
    borderWidth: 4,
    borderColor: colors.text.white,
  },
  successIconText: {
    fontSize: 60,
    color: colors.text.white,
    fontWeight: typography.fontWeight.bold,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.white,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 24,
    marginBottom: spacing.xl * 2,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 280,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.button.success,
  },
});

