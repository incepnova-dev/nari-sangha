import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for Profile
 */
export const profileStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.containerPadding,
    paddingBottom: spacing.xxl,
  },
  profileInfo: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    width: 80,
  },
  value: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
  signOutButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signOutButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  loadingText: {
    color: colors.text.tertiary,
    marginTop: spacing.lg,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  errorContainer: {
    paddingVertical: spacing.xl,
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
});
