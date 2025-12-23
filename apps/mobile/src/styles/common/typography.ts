import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

/**
 * Shared typography styles
 */
export const textStyles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    textAlign: 'center' as const,
  },
  body: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

export const textAlign = StyleSheet.create({
  textCenter: {
    textAlign: 'center' as const,
  },
  textLeft: {
    textAlign: 'left' as const,
  },
  textRight: {
    textAlign: 'right' as const,
  },
});

