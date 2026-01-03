import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for HomeLanding
 */
export const homeLandingStyles = StyleSheet.create({
  chatbotBanner: {
    backgroundColor: colors.accent.purple,
    borderRadius: 20,
    padding: spacing.xxl,
    marginBottom: spacing.xl * 2,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  chatbotTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: spacing.sm,
  },
  chatbotSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.white,
    opacity: 0.9,
    marginBottom: 15,
  },
  chatNowBtn: {
    backgroundColor: colors.text.white,
    paddingVertical: 10,
    paddingHorizontal: spacing.xxl,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  chatNowBtnText: {
    color: colors.accent.purple,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  storyIcon: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center',
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  storySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  storyDescription: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  researchCard: {
    backgroundColor: colors.background.white,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: 12,
    padding: spacing.xl,
    marginBottom: 15,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  researchTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  researchAuthors: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  researchJournal: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  videoCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  videoThumbnailPlaceholder: {
    fontSize: 60,
  },
  playButton: {
    position: 'absolute' as const,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 30,
    color: colors.text.white,
  },
  videoContent: {
    padding: spacing.xl,
  },
  videoTitle: {
    fontSize: 17,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  videoChannel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  videoStats: {
    flexDirection: 'row',
    gap: 15,
  },
  videoStat: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: spacing.xl * 2,
  },
  productCard: {
    width: '47%',
    backgroundColor: colors.accent.pinkLight,
    borderRadius: 20,
    padding: spacing.xl,
    paddingHorizontal: 15,
    position: 'relative' as const,
  },
  discountBadge: {
    position: 'absolute' as const,
    top: 15,
    right: 15,
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    zIndex: 1,
  },
  discountBadgeText: {
    color: colors.text.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  productImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginVertical: spacing.xl,
  },
  productImageIcon: {
    fontSize: 60,
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  productOriginalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.sm,
  },
  vendorIcon: {
    fontSize: typography.fontSize.sm,
  },
  vendorName: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  insuranceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: spacing.xl,
  },
  insuranceIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insuranceIconText: {
    fontSize: 32,
  },
  insuranceTitleSection: {
    flex: 1,
  },
  insuranceName: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 5,
  },
  insuranceProvider: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  insuranceFeatures: {
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureCheck: {
    color: colors.button.success,
    fontSize: 18,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  insuranceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insurancePrice: {
    fontSize: 28,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  pricePeriod: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  viewDetailsBtn: {
    backgroundColor: colors.text.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl * 2,
    borderRadius: 25,
  },
  viewDetailsBtnText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  conditionCard: {
    backgroundColor: colors.accent.pinkLight,
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: 15,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  conditionIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.text.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionIconText: {
    fontSize: 28,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
  },
  conditionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  conditionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 15,
  },
  tagPink: {
    backgroundColor: colors.accent.pinkVeryLight,
  },
  tagGreen: {
    backgroundColor: colors.story.pregnancy,
  },
  tagOrange: {
    backgroundColor: colors.story.reproductive,
  },
  tagText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  footer: {
    backgroundColor: '#2c3e50',
    padding: spacing.xl * 2,
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
    marginTop: spacing.xl * 2,
  },
  footerSection: {
    marginBottom: spacing.xxl,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 15,
    color: colors.primary,
  },
  footerInfo: {
    gap: 10,
  },
  footerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.sm,
  },
  footerIcon: {
    fontSize: typography.fontSize.base,
  },
  footerInfoText: {
    fontSize: typography.fontSize.sm,
    lineHeight: 22,
    color: '#ecf0f1',
  },
  footerLinks: {
    gap: 10,
  },
  footerLink: {
    color: '#ecf0f1',
    fontSize: typography.fontSize.sm,
    marginBottom: 10,
  },
  footerBottom: {
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  footerBottomText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});

