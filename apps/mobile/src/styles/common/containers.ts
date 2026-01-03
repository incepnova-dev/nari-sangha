import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * Reusable container styles
 */
export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  containerSecondary: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  containerTertiary: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  containerCard: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  scrollContentSmall: {
    padding: spacing.xl,
    paddingTop: 60,
  },
  scrollContentMedium: {
    padding: spacing.xl,
    paddingBottom: 80,
  },
  contentSection: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  contentContainer: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
});

