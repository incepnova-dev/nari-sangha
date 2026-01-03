import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { searchStyles, ratingStyles, detailStyles, actionButtonStyles, iconContainerStyles, cardHeaderStyles, listContainerStyles, statusBadgeStyles } from '../common';

/**
 * Component-specific styles for DoctorListing
 */
export const doctorListingStyles = StyleSheet.create({
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
  doctorsContainer: listContainerStyles.listContainer,
  doctorCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  doctorHeader: cardHeaderStyles.cardHeader,
  doctorIcon: {
    ...iconContainerStyles.iconContainer,
    ...iconContainerStyles.iconContainerMedium,
  },
  doctorIconText: iconContainerStyles.iconTextMedium,
  doctorInfo: cardHeaderStyles.cardInfo,
  doctorName: {
    ...cardHeaderStyles.cardTitleLarge,
    color: colors.text.primary,
    marginBottom: 4,
  },
  specialization: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 5,
  },
  rating: ratingStyles.rating,
  stars: ratingStyles.stars,
  ratingText: ratingStyles.ratingText,
  detailsRow: detailStyles.detailRow,
  detailLabel: detailStyles.detailLabel,
  detailValue: detailStyles.detailValue,
  availabilityBadge: statusBadgeStyles.availabilityBadge,
  availabilityText: statusBadgeStyles.availabilityText,
  bookAppointmentBtn: actionButtonStyles.bookAppointmentBtn,
  bookAppointmentBtnText: actionButtonStyles.bookAppointmentBtnText,
});

