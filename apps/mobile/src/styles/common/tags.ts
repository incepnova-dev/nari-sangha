import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Common tag styles with different color variants
 * Used across: HomeLanding, ResearchArticles, WomenStories
 */
export const tagStyles = StyleSheet.create({
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
  specialtyTag: {
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  specialtyText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

