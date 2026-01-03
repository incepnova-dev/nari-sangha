import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { detailStyles } from '../common';

/**
 * Component-specific styles for Insurance
 */
export const insuranceStyles = StyleSheet.create({
  insuranceList: {
    gap: spacing.lg,
  },
  insuranceCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  insuranceProvider: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  insuranceFeatures: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  insuranceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureCheck: {
    color: colors.button.success,
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
  },
  featureText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  insurancePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    marginBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  insuranceAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  insurancePeriod: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  expandedDetails: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  detailsSection: {
    marginBottom: spacing.lg,
  },
  detailsTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  detailRow: {
    ...detailStyles.detailRow,
    marginBottom: spacing.sm,
  },
  detailLabel: {
    ...detailStyles.detailLabel,
    flex: 1,
  },
  detailValue: {
    ...detailStyles.detailValue,
    flex: 1,
    textAlign: 'right',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  benefitCheck: {
    color: colors.button.success,
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 13,
    color: colors.text.secondary,
    flex: 1,
  },
  termsSection: {
    backgroundColor: colors.accent.pinkVeryLight,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
  },
  termsText: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

