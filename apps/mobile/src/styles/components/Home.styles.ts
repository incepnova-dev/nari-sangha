import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for Home
 */
export const homeStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xxl, // space above bottom bar
  },
  card: {
    marginTop: spacing.md,
    padding: spacing.containerPadding,
    borderRadius: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  cardBody: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
});

