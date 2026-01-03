import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common detail row styles for displaying key-value pairs
 * Used across: DoctorListing, Insurance, ScreeningTracking, VaccineTracking, WomensInsuranceListing
 */
export const detailStyles = StyleSheet.create({
  detailRow: {
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
  detailsContainer: {
    marginBottom: 15,
    gap: spacing.sm,
  },
});

