import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for Profile
 */
export const profileStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xxl,
  },
  profileInfo: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
    width: '100%',
  },
  infoRow: {
    marginBottom: spacing.containerPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.light,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  buttonContainer: {
    marginTop: spacing.xxl,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

