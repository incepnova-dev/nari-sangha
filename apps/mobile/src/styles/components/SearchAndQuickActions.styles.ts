import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { searchStyles } from '../common';

/**
 * Component-specific styles for SearchAndQuickActions
 */
export const searchAndQuickActionsStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchBar: {
    ...searchStyles.searchBar,
    borderRadius: 20,
    padding: 14,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 4,
  },
  searchIcon: {
    ...searchStyles.searchIcon,
    fontSize: 20,
    color: colors.primary,
  },
  searchInput: {
    ...searchStyles.searchInput,
    fontSize: 15,
  },
  quickActionsContainer: {
    marginTop: spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  quickActionBtn: {
    width: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
    textAlign: 'center',
  },
});

