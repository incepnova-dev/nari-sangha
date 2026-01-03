import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common rating styles
 * Used across: ClinicListing, DoctorListing, HospitalListing, InsuranceComparison,
 * ProductComparison, WomenProductListing, WomensInsuranceListing
 */
export const ratingStyles = StyleSheet.create({
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
});

