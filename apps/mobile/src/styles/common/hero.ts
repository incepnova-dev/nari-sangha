import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common hero section styles
 * Used across: AboutUs, ExpertAdviceListing, ResearchArticles, WomenStories
 */
export const heroStyles = StyleSheet.create({
  heroSection: {
    padding: spacing.xl * 2,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSize.base,
    lineHeight: 24,
    textAlign: 'center',
  },
});

