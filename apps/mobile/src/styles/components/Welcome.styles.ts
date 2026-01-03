import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for Welcome
 */
export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative' as const,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.xl * 2,
    paddingHorizontal: spacing.xl * 2,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  appLogo: {
    width: 100,
    height: 100,
    backgroundColor: colors.text.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  appTagline: {
    fontSize: typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: typography.fontSize.base,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  buttonsContainer: {
    width: '100%',
    zIndex: 1,
  },
  primaryButton: {
    backgroundColor: colors.text.white,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: colors.text.white,
    marginBottom: 0,
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  secondaryButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  decorativeCircle1: {
    position: 'absolute' as const,
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute' as const,
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

