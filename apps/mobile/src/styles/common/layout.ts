import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Shared layout styles
 */
export const container = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});

export const contentContainer = StyleSheet.create({
  contentContainer: {
    maxWidth: 960,
    width: '100%',
    alignItems: 'center' as const,
  },
});

export const flexRow = StyleSheet.create({
  flexRow: {
    flexDirection: 'row' as const,
  },
  flexRowCenter: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  flexRowEnd: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
  },
});

export const flexWrap = StyleSheet.create({
  flexWrap: {
    flexWrap: 'wrap' as const,
  },
});

