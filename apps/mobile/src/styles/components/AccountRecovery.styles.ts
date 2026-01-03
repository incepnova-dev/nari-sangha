import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for AccountRecovery
 */
export const accountRecoveryStyles = StyleSheet.create({
  recoveryIllustration: {
    alignItems: 'center',
    marginVertical: spacing.xl * 2,
  },
  recoveryIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.status.warning,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  recoveryIconText: {
    fontSize: 50,
  },
  recoveryOptions: {
    gap: spacing.lg,
    marginTop: spacing.xl * 2,
  },
  recoveryCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  recoveryCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.accent.pinkVeryLight,
  },
  recoveryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  recoveryCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveryCardIconText: {
    fontSize: 24,
  },
  recoveryCardTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  recoveryCardDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginLeft: 64,
  },
  aliasNote: {
    backgroundColor: colors.accent.pinkVeryLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.xl,
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

