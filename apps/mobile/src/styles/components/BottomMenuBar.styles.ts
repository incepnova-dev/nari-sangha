import { StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

/**
 * Component-specific styles for BottomMenuBar
 */
export const bottomMenuBarStyles = StyleSheet.create({
  bottomBar: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.containerPadding * 3, // Increased horizontal padding for wider appearance
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#374151',
    backgroundColor: '#111827',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%', // Ensure full width
    minHeight: 80, // Increased minimum height for better visual presence
  },
});

