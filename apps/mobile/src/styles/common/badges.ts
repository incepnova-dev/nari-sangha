import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Reusable badge styles
 */
export const badgeStyles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
  },
  badgePrimary: {
    backgroundColor: colors.primary,
  },
  badgePrimaryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  badgeSecondary: {
    backgroundColor: colors.accent.lightBlue,
  },
  badgeSecondaryText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.semibold,
    color: colors.accent.blue,
    textTransform: 'uppercase',
  },
  badgeSuccess: {
    backgroundColor: colors.button.success,
  },
  badgeSuccessText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeBestPrice: {
    position: 'absolute' as const,
    top: -1,
    left: spacing.xl,
    backgroundColor: colors.button.success,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  badgeBestPriceText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.lightBlue,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.semibold,
    color: colors.accent.blue,
    textTransform: 'uppercase',
  },
});

