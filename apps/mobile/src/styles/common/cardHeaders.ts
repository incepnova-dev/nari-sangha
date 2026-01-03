import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Common card header styles
 * Used across: ClinicListing, DoctorListing, HospitalListing, ScreeningTracking, VaccineTracking
 */
export const cardHeaderStyles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  cardHeaderCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  cardTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
});

