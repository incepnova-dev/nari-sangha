import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common filter tab and pill styles
 * Used across: WomenProductListing, WomenStories
 */
export const filterStyles = StyleSheet.create({
  filterTabsContainer: {
    marginBottom: 15,
  },
  filterTabsContent: {
    paddingHorizontal: spacing.xl,
    gap: 10,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.white,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  filterTabTextActive: {
    color: colors.text.white,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: 10,
  },
  filterPill: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: colors.border.medium,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterPillText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  filterPillTextActive: {
    color: colors.text.white,
  },
});

