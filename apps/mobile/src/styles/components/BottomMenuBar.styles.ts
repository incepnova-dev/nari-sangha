import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Component-specific styles for BottomMenuBar
 */
export const bottomMenuBarStyles = StyleSheet.create({
  bottomBar: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.containerPadding,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#374151',
    backgroundColor: '#111827',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

