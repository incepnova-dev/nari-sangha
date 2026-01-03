import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * Reusable icon container styles
 */
export const iconStyles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSmall: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.background.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  iconContainerExtraLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  iconText: {
    fontSize: 30,
  },
  iconTextSmall: {
    fontSize: 24,
  },
  iconTextLarge: {
    fontSize: 40,
  },
  iconTextExtraLarge: {
    fontSize: 60,
  },
});

