import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { heroStyles, summaryCardStyles } from '../common';

/**
 * Component-specific styles for AboutUs
 */
export const aboutUsStyles = StyleSheet.create({
  heroSection: {
    ...heroStyles.heroSection,
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl * 2,
  },
  heroEmoji: heroStyles.heroEmoji,
  heroTitle: {
    ...heroStyles.heroTitle,
    color: colors.text.white,
    marginBottom: 15,
  },
  heroSubtitle: {
    ...heroStyles.heroSubtitle,
    color: colors.text.white,
    opacity: 0.95,
  },
  missionBox: {
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 20,
    padding: spacing.xl * 2,
    marginBottom: spacing.xl * 2,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: 15,
  },
  missionText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: 24,
  },
  statsSection: {
    backgroundColor: colors.accent.purple,
    borderRadius: 20,
    padding: spacing.xl * 2,
    marginBottom: spacing.xl * 2,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  statItem: {
    ...summaryCardStyles.statItem,
    width: '47%',
  },
  statNumber: {
    ...summaryCardStyles.statNumber,
    fontSize: 36,
  },
  statLabel: {
    ...summaryCardStyles.statLabel,
    fontSize: typography.fontSize.sm,
  },
  servicesHeader: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  servicesGrid: {
    gap: spacing.xl,
    marginBottom: spacing.xl * 2,
  },
  serviceCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: spacing.xxl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  serviceIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  serviceDescription: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  serviceFeatures: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  featureCheck: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  whyChooseSection: {
    backgroundColor: colors.accent.pinkLight,
    borderRadius: 20,
    padding: spacing.xl * 2,
    marginBottom: spacing.xl * 2,
  },
  whyTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  whyItems: {
    gap: 15,
  },
  whyItem: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'flex-start',
  },
  whyIcon: {
    fontSize: 28,
  },
  whyContent: {
    flex: 1,
  },
  whyItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 5,
  },
  whyItemText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: typography.fontSize.base,
    color: colors.text.white,
    marginBottom: spacing.xxl,
    opacity: 0.95,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.text.white,
    paddingVertical: 15,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: 30,
  },
  ctaButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  footer: {
    backgroundColor: '#333',
    padding: spacing.xl * 2,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: spacing.xl,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.white,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 10,
  },
});

