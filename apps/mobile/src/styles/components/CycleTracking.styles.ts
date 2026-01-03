import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for CycleTracking
 */
export const cycleTrackingStyles = StyleSheet.create({
  summarySection: {
    flexDirection: 'row',
    gap: 15,
    padding: spacing.xl,
    paddingBottom: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text.white,
  },
  predictionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: 15,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  predictionLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  predictionValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  cyclesContainer: {
    gap: spacing.md,
  },
  cycleCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cycleDateContainer: {
    flex: 1,
  },
  cycleDate: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  cycleDuration: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  flowBadge: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  flowText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  symptomsContainer: {
    marginTop: spacing.sm,
  },
  symptomsLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  symptomTag: {
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent.pinkLight,
  },
  symptomTagText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  actionButtons: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  logPeriodBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logPeriodBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  viewCalendarBtn: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCalendarBtnText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
});

