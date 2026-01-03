import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { searchStyles, ratingStyles, filterStyles, actionButtonStyles, listContainerStyles } from '../common';

/**
 * Component-specific styles for WomenProductListing
 */
export const womenProductListingStyles = StyleSheet.create({
  searchBar: {
    ...searchStyles.searchBar,
    margin: 15,
    marginTop: spacing.xl,
    paddingHorizontal: 15,
    paddingVertical: spacing.md,
    elevation: 4,
  },
  searchIcon: {
    ...searchStyles.searchIcon,
    marginRight: 10,
  },
  searchInput: searchStyles.searchInput,
  filterTabsContainer: filterStyles.filterTabsContainer,
  filterTabsContent: filterStyles.filterTabsContent,
  filterTab: filterStyles.filterTab,
  filterTabActive: filterStyles.filterTabActive,
  filterTabText: filterStyles.filterTabText,
  filterTabTextActive: filterStyles.filterTabTextActive,
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
    ...ratingStyles.rating,
    marginBottom: 10,
  },
  stars: ratingStyles.stars,
  ratingText: ratingStyles.ratingText,
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
  compareButton: actionButtonStyles.compareButton,
  compareButtonText: actionButtonStyles.compareButtonText,
  bottomSpacer: listContainerStyles.bottomSpacer,
});

