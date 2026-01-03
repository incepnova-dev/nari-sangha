import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for HealthProducts
 */
export const healthProductsStyles = StyleSheet.create({
  contentSection: {
    padding: 24,
    paddingHorizontal: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  productCard: {
    width: '47%',
    backgroundColor: colors.background.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  productImageIcon: {
    fontSize: 50,
  },
  discountBadge: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    backgroundColor: colors.status.error,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  discountBadgeText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: 18,
  },
  productBrand: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  productOriginalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  platformTags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  platformTag: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  platformTagText: {
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
});

