import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Shared button styles - Enhanced version
 */
export const buttons = StyleSheet.create({
  // Base button styles
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: spacing.sm,
    minWidth: 100,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  buttonFullWidth: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: spacing.xl,
  },
  buttonRounded: {
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Primary button
  primaryButton: {
    backgroundColor: colors.button.primary,
  },
  primaryButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Secondary button
  secondaryButton: {
    backgroundColor: colors.button.secondary,
    borderWidth: 2,
    borderColor: colors.button.border,
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Disabled button
  disabledButton: {
    opacity: 0.5,
  },
  
  // Success button
  successButton: {
    backgroundColor: colors.button.success,
  },
  successButtonText: {
    color: colors.text.white,
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
  },
  
  // Small button
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: spacing.xl,
    borderRadius: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  smallButtonText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  
  // View details button
  viewDetailsButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: '100%',
    marginTop: spacing.sm,
  },
  viewDetailsButtonText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  
  // Buy now button
  buyNowButton: {
    backgroundColor: colors.button.success,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: spacing.sm,
  },
  buyNowButtonText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  
  // Link button
  linkButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  linkButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  linkButtonDisabled: {
    opacity: 0.5,
  },
});
