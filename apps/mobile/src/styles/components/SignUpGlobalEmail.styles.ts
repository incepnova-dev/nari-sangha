import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for SignUpGlobalEmail
 */
export const signUpGlobalEmailStyles = StyleSheet.create({
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
  inputHint: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHintText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  privacyOptions: {
    backgroundColor: '#F9F9F9',
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
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxCheck: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  checkboxText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  btnContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
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

