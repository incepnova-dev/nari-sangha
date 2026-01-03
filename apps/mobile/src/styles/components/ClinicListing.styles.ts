import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { searchStyles, ratingStyles, actionButtonStyles, iconContainerStyles, cardHeaderStyles, listContainerStyles, tagStyles } from '../common';

/**
 * Component-specific styles for ClinicListing
 */
export const clinicListingStyles = StyleSheet.create({
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
  clinicsContainer: listContainerStyles.listContainer,
  clinicCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  clinicHeader: cardHeaderStyles.cardHeader,
  clinicIcon: {
    ...iconContainerStyles.iconContainer,
    ...iconContainerStyles.iconContainerSmall,
  },
  clinicIconText: iconContainerStyles.iconTextSmall,
  clinicInfo: cardHeaderStyles.cardInfo,
  clinicName: {
    ...cardHeaderStyles.cardTitle,
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
    marginBottom: 10,
  },
  specialtyTag: tagStyles.specialtyTag,
  specialtyText: tagStyles.specialtyText,
  timings: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 15,
  },
  viewDetailsBtn: actionButtonStyles.viewDetailsBtn,
  viewDetailsBtnText: actionButtonStyles.viewDetailsBtnText,
});

