import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Component-specific styles for InsuranceComparison
 */
export const insuranceComparisonStyles = StyleSheet.create({
  horizontalScroll: {
    flex: 1,
  },
  horizontalScrollContent: {
    minWidth: SCREEN_WIDTH,
  },
  verticalScroll: {
    flex: 1,
  },
  verticalScrollContent: {
    paddingBottom: 100,
  },
  comparisonTable: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    minHeight: 60,
  },
  altRow: {
    backgroundColor: '#FAFAFA',
  },
  scrollHint: {
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  scrollHintText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  firstColumn: {
    minWidth: 140,
    padding: spacing.md,
    backgroundColor: colors.accent.pinkVeryLight,
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: colors.primary,
  },
  planColumn: {
    minWidth: 180,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnHeader: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  planHeader: {
    alignItems: 'center',
    width: '100%',
  },
  providerLogo: {
    width: 50,
    height: 50,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  providerIcon: {
    fontSize: 20,
  },
  planProviderName: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.button.success,
    borderRadius: 8,
    marginTop: 4,
  },
  badgePopular: {
    backgroundColor: colors.status.warning,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  priceText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    color: colors.rating.star,
    fontSize: typography.fontSize.sm,
  },
  ratingText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  coverageHeader: {
    backgroundColor: colors.accent.pinkVeryLight,
  },
  coverageItemLabel: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  checkmark: {
    fontSize: 20,
    color: colors.button.success,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  crossmark: {
    fontSize: 18,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  actionRow: {
    paddingVertical: 15,
  },
  buyBtn: {
    backgroundColor: colors.button.success,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
});

