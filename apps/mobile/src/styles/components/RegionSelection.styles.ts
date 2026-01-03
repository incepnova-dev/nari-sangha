import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for RegionSelection
 */
export const regionSelectionStyles = StyleSheet.create({
  regionCards: {
    gap: spacing.lg,
  },
  regionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  regionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.accent.pinkVeryLight,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  regionFlag: {
    fontSize: 40,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  regionSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  regionFeatures: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  featureIcon: {
    color: colors.button.success,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  btnContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
});

