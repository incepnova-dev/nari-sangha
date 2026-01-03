import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for VaccineTracking
 */
export const vaccineTrackingStyles = StyleSheet.create({
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: spacing.xl,
    margin: spacing.xl,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.white,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: typography.fontWeight.semibold,
  },
  vaccinesContainer: {
    padding: spacing.xl,
    gap: 15,
  },
  vaccineCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  vaccineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 15,
  },
  vaccineIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vaccineIconText: {
    fontSize: 30,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 6,
  },
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
  vaccineDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  vaccineDetails: {
    marginBottom: 15,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

