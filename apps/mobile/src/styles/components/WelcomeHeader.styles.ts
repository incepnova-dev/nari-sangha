import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for WelcomeHeader
 */
export const welcomeHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  hamburgerPlaceholder: {
    width: 40,
    height: 40,
  },
  welcomeSection: {
    flex: 1,
    marginLeft: spacing.md,
  },
  welcomeText: {
    fontSize: typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.white,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});

