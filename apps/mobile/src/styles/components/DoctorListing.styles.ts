import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for DoctorListing
 */
export const doctorListingStyles = StyleSheet.create({
  searchBar: {
    marginHorizontal: spacing.xl,
    marginTop: 15,
    padding: spacing.md,
    paddingHorizontal: 15,
    backgroundColor: colors.background.white,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    color: colors.text.tertiary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  doctorsContainer: {
    padding: spacing.xl,
    gap: 15,
  },
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
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  doctorIcon: {
    width: 70,
    height: 70,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorIconText: {
    fontSize: 35,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  specialization: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stars: {
    fontSize: typography.fontSize.sm,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  availabilityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.story.pregnancy,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  availabilityText: {
    fontSize: 12,
    color: colors.button.success,
    fontWeight: typography.fontWeight.semibold,
  },
  bookAppointmentBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookAppointmentBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

