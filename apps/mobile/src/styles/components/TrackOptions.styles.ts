import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for TrackOptions
 */
export const trackOptionsStyles = StyleSheet.create({
  optionCards: {
    gap: spacing.lg,
  },
  optionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.accent.pinkVeryLight,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  optionIcon: {
    fontSize: 40,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  optionFeatures: {
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

