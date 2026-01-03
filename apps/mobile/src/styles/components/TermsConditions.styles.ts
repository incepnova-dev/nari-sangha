import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for TermsConditions
 */
export const termsConditionsStyles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: colors.background.white,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  termsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    alignSelf: 'center',
  },
  termsIconText: {
    fontSize: 40,
  },
  termsTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  termsSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl * 2,
    lineHeight: 24,
  },
  termsContent: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  termsSection: {
    marginBottom: 24,
  },
  termsSectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  termsSectionText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  termsList: {
    marginTop: spacing.sm,
  },
  termsListItem: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  acceptanceCards: {
    gap: spacing.lg,
    marginTop: 24,
  },
  acceptanceCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.border.medium,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  acceptanceCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.accent.pinkVeryLight,
  },
  acceptanceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  acceptanceContent: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxCheckmark: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  acceptanceTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  acceptanceText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  acceptanceLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.medium,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

