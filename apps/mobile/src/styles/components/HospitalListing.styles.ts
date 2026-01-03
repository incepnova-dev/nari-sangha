import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { searchStyles, ratingStyles, iconContainerStyles, cardHeaderStyles, listContainerStyles, tagStyles, statusBadgeStyles, actionButtonStyles } from '../common';

/**
 * Component-specific styles for HospitalListing
 */
export const hospitalListingStyles = StyleSheet.create({
  searchBar: {
    ...searchStyles.searchBar,
    marginHorizontal: spacing.xl,
    marginTop: 15,
    padding: spacing.md,
    paddingHorizontal: 15,
    gap: 10,
  },
  searchIcon: searchStyles.searchIcon,
  searchInput: searchStyles.searchInput,
  hospitalsContainer: listContainerStyles.listContainer,
  hospitalCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  hospitalHeader: cardHeaderStyles.cardHeader,
  hospitalIcon: {
    ...iconContainerStyles.iconContainer,
    ...iconContainerStyles.iconContainerMedium,
  },
  hospitalIconText: iconContainerStyles.iconTextMedium,
  hospitalInfo: cardHeaderStyles.cardInfo,
  hospitalName: {
    ...cardHeaderStyles.cardTitleLarge,
    color: colors.text.primary,
    marginBottom: 5,
  },
  rating: ratingStyles.rating,
  stars: ratingStyles.stars,
  ratingText: ratingStyles.ratingText,
  address: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  distance: {
    fontSize: 13,
    color: colors.button.success,
    marginBottom: 10,
    fontWeight: typography.fontWeight.semibold,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 15,
  },
  specialtyTag: tagStyles.specialtyTag,
  specialtyText: tagStyles.specialtyText,
  hospitalDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailIcon: {
    fontSize: typography.fontSize.base,
  },
  detailText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  emergencyBadge: statusBadgeStyles.emergencyBadge,
  emergencyText: statusBadgeStyles.emergencyText,
  viewDetailsBtn: actionButtonStyles.viewDetailsBtn,
  viewDetailsBtnText: actionButtonStyles.viewDetailsBtnText,
});

