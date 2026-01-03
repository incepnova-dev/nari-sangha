import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for HealthProfileSetup
 */
export const healthProfileSetupStyles = StyleSheet.create({
  screenHeader: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressIndicator: {
    alignItems: 'center',
    padding: 15,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  progressDot: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  titleSection: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  profileOption: {
    marginHorizontal: spacing.xl,
    marginBottom: 15,
    padding: 18,
    backgroundColor: colors.background.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  optionIcon: {
    width: 45,
    height: 45,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    backgroundColor: colors.border.dark,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: colors.primary,
  },
  toggleSwitchThumb: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.white,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  toggleSwitchThumbActive: {
    alignSelf: 'flex-end',
  },
  conditionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: spacing.xl,
  },
  conditionTag: {
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border.medium,
  },
  conditionTagSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  conditionTagText: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  conditionTagTextSelected: {
    color: colors.text.white,
  },
  actionButton: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  skipButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
});

