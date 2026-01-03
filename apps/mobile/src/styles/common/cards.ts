import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

/**
 * Reusable card styles
 */
export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardSmall: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardWithBorder: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  storyCard: {
    borderRadius: 20,
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  storyCardPregnancy: {
    backgroundColor: colors.story.pregnancy,
  },
  storyCardReproductive: {
    backgroundColor: colors.story.reproductive,
  },
  storyCardPerimenopause: {
    backgroundColor: colors.story.perimenopause,
  },
  storyCardMenopause: {
    backgroundColor: colors.story.menopause,
  },
});

