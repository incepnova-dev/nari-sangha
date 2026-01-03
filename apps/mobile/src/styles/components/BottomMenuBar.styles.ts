import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * Component-specific styles for BottomMenuBar
 */
export const bottomMenuBarStyles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
});

