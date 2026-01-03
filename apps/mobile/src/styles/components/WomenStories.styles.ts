import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for WomenStories
 */
export const womenStoriesStyles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#FFE5EE',
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
    color: colors.text.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 400,
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
  contentSection: {
    padding: spacing.xl,
    paddingTop: 10,
  },
  featuredStory: {
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
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  featuredBadgeText: {
    color: colors.text.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  featuredStoryTitle: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 15,
    lineHeight: 32,
  },
  featuredStoryExcerpt: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  featuredReadMoreBtn: {
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredReadMoreBtnText: {
    color: '#667eea',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  categoryTitleContainer: {
    marginTop: spacing.xl * 2,
    marginBottom: spacing.xl,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  storyCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: spacing.xl,
  },
  authorAvatar: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarText: {
    fontSize: 28,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 5,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storyMetaText: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 15,
    lineHeight: 28,
  },
  storyExcerpt: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  storyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: 15,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
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
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  readMoreBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  readMoreBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  storyStats: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
});

