import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Common scroll styles used across multiple components
 */
export const scrollStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xxl,
  },
});

