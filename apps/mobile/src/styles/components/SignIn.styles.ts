import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for SignIn
 */
export const signInStyles = StyleSheet.create({
  signinHeader: {
    alignItems: 'center',
    marginVertical: spacing.xl * 2,
  },
  tabSwitcher: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl * 2,
    backgroundColor: colors.background.lightGray,
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: -spacing.md,
    marginBottom: spacing.xl,
  },
  forgotLink: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  termsText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  termsLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

