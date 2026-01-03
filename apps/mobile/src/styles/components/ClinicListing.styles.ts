import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for ClinicListing
 */
export const clinicListingStyles = StyleSheet.create({
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
  clinicsContainer: {
    padding: spacing.xl,
    gap: 15,
  },
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
  clinicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  clinicIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicIconText: {
    fontSize: 30,
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
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
  specialtyTag: {
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  specialtyText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  timings: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 15,
  },
  viewDetailsBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

