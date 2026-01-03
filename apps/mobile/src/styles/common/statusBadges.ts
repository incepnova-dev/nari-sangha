import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common status badge styles
 * Used across: ScreeningTracking, VaccineTracking, WomensInsuranceListing, InsuranceComparison
 */
export const statusBadgeStyles = StyleSheet.create({
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
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
  emergencyBadge: {
    backgroundColor: '#FFEBEE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  emergencyText: {
    fontSize: 11,
    color: colors.status.error,
    fontWeight: typography.fontWeight.bold,
  },
});

