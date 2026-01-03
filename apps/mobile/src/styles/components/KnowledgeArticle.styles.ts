import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for KnowledgeArticle
 */
export const knowledgeArticleStyles = StyleSheet.create({
  content: {
    padding: spacing.xl,
  },
  // Overview Banner
  overviewBanner: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: spacing.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  overviewIcon: {
    fontSize: 32,
    marginBottom: spacing.md,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text.white,
    marginBottom: spacing.md,
  },
  overviewDescription: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 22,
  },
  section: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  sectionTitleOrange: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.status.warning,
  },
  sectionTitleGreen: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.button.success,
  },
  description: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: 15,
  },
  prevalenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.lightOrange,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  prevalenceText: {
    fontSize: 13,
    color: colors.status.warning,
    fontWeight: typography.fontWeight.semibold,
  },
  listContainer: {
    gap: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listIcon: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  // Symptoms List
  symptomsList: {
    gap: spacing.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  symptomIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent.pinkVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  symptomIcon: {
    fontSize: typography.fontSize.base,
  },
  symptomContent: {
    flex: 1,
  },
  symptomTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  symptomDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  // Root Causes
  causesList: {
    gap: spacing.md,
  },
  causeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  causeIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  causeIcon: {
    fontSize: typography.fontSize.base,
  },
  causeContent: {
    flex: 1,
  },
  causeTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  causeDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  // Prevention & Management
  preventionList: {
    gap: spacing.md,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  preventionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.story.pregnancy,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  preventionIcon: {
    fontSize: typography.fontSize.base,
  },
  preventionContent: {
    flex: 1,
  },
  preventionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  preventionDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  noteSection: {
    backgroundColor: colors.accent.lightBlue,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.info,
  },
  noteIcon: {
    fontSize: 24,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: colors.status.info,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionButtons: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  findDoctorBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  findDoctorBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  findClinicBtn: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findClinicBtnText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
});

