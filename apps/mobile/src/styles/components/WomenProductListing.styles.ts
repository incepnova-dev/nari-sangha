import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for WomenProductListing
 */
export const womenProductListingStyles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    margin: 15,
    marginTop: spacing.xl,
    paddingHorizontal: 15,
    paddingVertical: spacing.md,
    borderRadius: 25,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  filterTabsContainer: {
    marginBottom: 15,
  },
  filterTabsContent: {
    paddingHorizontal: spacing.xl,
    gap: 10,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.white,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  filterTabTextActive: {
    color: colors.text.white,
  },
  productsContainer: {
    paddingHorizontal: spacing.xl,
  },
  productCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageIcon: {
    fontSize: 48,
  },
  productDetails: {
    padding: 15,
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  stars: {
    fontSize: typography.fontSize.sm,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: 10,
  },
  availableStores: {
    fontSize: 11,
    color: colors.button.success,
    marginBottom: 10,
  },
  compareButton: {
    width: '100%',
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

