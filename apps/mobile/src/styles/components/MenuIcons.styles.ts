import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Shared styles for menu icons (hamburger, alert, profile, home, discover, track, products)
 */
export const hamburgerMenuStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 10,
    elevation: 5,
  },
  containerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: colors.text.white,
    borderWidth: 2,
  },
  hamburgerIcon: {
    fontSize: 22,
    color: colors.text.white,
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export const bottomMenuIconStyles = StyleSheet.create({
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
  navIconActive: {
    color: colors.primary,
  },
  navLabel: {
    fontSize: 11,
    color: colors.text.tertiary,
    fontWeight: typography.fontWeight.semibold,
  },
  navLabelActive: {
    color: colors.primary,
  },
});

export const topMenuIconStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  containerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: colors.text.white,
    borderWidth: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  iconCircleActive: {
    backgroundColor: colors.text.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    fontSize: 18,
  },
  iconTextColored: {
    fontSize: 18,
    color: colors.primary,
  },
  notificationBadge: {
    position: 'absolute' as const,
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
    borderWidth: 2,
    borderColor: colors.text.white,
  },
});

