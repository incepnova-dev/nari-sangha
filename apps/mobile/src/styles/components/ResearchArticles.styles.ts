import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for ResearchArticles
 */
export const researchArticlesStyles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#667eea',
    padding: spacing.xl * 2,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.white,
    opacity: 0.95,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 400,
  },
  contentSection: {
    padding: spacing.xl,
    paddingTop: 10,
  },
  videoSection: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: spacing.xl,
  },
  sectionIcon: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  videoCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: colors.shadow.default,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  videoThumbnailIcon: {
    position: 'absolute' as const,
    fontSize: 60,
    color: colors.text.white,
    zIndex: 1,
  },
  videoThumbnailText: {
    fontSize: 80,
    opacity: 0.3,
  },
  videoInfo: {
    padding: spacing.xl,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 10,
    lineHeight: 25,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: spacing.md,
  },
  videoMetaText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  videoDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorAvatarText: {
    fontSize: 24,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 3,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  categoryTabs: {
    marginBottom: 10,
  },
  categoryTabsContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: 10,
  },
  categoryTab: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: colors.border.medium,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryTabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
  },
  categoryTabTextActive: {
    color: colors.text.white,
  },
  featuredResearch: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: spacing.xl * 2,
    marginBottom: spacing.xl * 2,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  featuredBadgeWhite: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  featuredBadgeWhiteText: {
    color: colors.text.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  featuredResearchTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 15,
    lineHeight: 32,
  },
  featuredResearchAuthors: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  featuredResearchJournal: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  featuredResearchAbstract: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  featuredReadFullBtn: {
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredReadFullBtnText: {
    color: '#667eea',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  researchCard: {
    backgroundColor: colors.background.white,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    borderRadius: 12,
    padding: 25,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  researchBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: 15,
    marginBottom: 15,
  },
  researchBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  researchTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 27,
  },
  researchAuthors: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  researchJournal: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: 15,
  },
  researchAbstract: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 15,
  },
  researchTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 15,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 15,
  },
  tagPink: {
    backgroundColor: colors.accent.pinkVeryLight,
  },
  tagPurple: {
    backgroundColor: '#F3E5F5',
  },
  tagBlue: {
    backgroundColor: colors.accent.lightBlue,
  },
  tagGreen: {
    backgroundColor: colors.story.pregnancy,
  },
  tagOrange: {
    backgroundColor: colors.accent.lightOrange,
  },
  tagText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  tagTextPink: {
    color: colors.primary,
  },
  tagTextPurple: {
    color: '#9C27B0',
  },
  tagTextBlue: {
    color: colors.status.info,
  },
  tagTextGreen: {
    color: colors.button.success,
  },
  tagTextOrange: {
    color: colors.status.warning,
  },
  researchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  readFullBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  readFullBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  researchStats: {
    flexDirection: 'row',
    gap: 15,
  },
  researchStatsText: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
});

