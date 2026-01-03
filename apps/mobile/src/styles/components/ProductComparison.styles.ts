import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for ProductComparison
 */
export const productComparisonStyles = StyleSheet.create({
  productHeader: {
    backgroundColor: colors.background.white,
    padding: spacing.xl,
    margin: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  productSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: spacing.xl,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  retailersContainer: {
    paddingHorizontal: spacing.xl,
  },
  retailerCard: {
    backgroundColor: colors.background.white,
    marginBottom: 15,
    padding: spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  retailerCardBestPrice: {
    borderWidth: 2,
    borderColor: colors.button.success,
    shadowColor: colors.button.success,
    shadowOpacity: 0.25,
  },
  retailerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  retailerInfo: {
    flex: 1,
  },
  retailerName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  retailerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  star: {
    color: colors.rating.star,
    fontSize: typography.fontSize.sm,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  deliveryTimeText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginLeft: 5,
  },
  retailerRight: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

