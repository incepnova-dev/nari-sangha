import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Common list/grid container styles
 * Used across: ClinicListing, DoctorListing, HospitalListing, ScreeningTracking, VaccineTracking
 */
export const listContainerStyles = StyleSheet.create({
  listContainer: {
    padding: spacing.xl,
    gap: 15,
  },
  listContainerCompact: {
    paddingHorizontal: spacing.xl,
    gap: 15,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
  bottomSpacerLarge: {
    height: spacing.xl * 2,
  },
});

