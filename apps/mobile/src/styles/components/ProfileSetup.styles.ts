import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for ProfileSetup
 */
export const profileSetupStyles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.xl * 2,
  },
  avatarUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent.pinkVeryLight,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    position: 'relative' as const,
  },
  avatarEmoji: {
    fontSize: 60,
  },
  cameraBadge: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background.white,
  },
  cameraBadgeText: {
    fontSize: 18,
  },
  avatarText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  inputHint: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHintText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  aliasNote: {
    backgroundColor: colors.accent.pinkVeryLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: 24,
  },
  aliasNoteTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  aliasNoteText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  btnContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
  },
});

