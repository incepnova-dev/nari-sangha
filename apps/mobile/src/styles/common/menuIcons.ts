import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * Common styles for bottom menu icon components
 */
export const menuIconStyles = StyleSheet.create({
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  menuItemActive: {
    backgroundColor: colors.background.secondary,
  },
  menuIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
});

