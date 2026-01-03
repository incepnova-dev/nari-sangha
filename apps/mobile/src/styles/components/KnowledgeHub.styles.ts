import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for KnowledgeHub
 */
export const knowledgeHubStyles = StyleSheet.create({
  searchBar: {
    marginHorizontal: spacing.xl,
    marginTop: 15,
    padding: spacing.md,
    paddingHorizontal: 15,
    backgroundColor: colors.background.white,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    color: colors.text.tertiary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  diseasesContainer: {
    padding: spacing.xl,
    gap: 15,
  },
  diseaseCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  diseaseIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseIconText: {
    fontSize: 30,
  },
  diseaseInfo: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.lightBlue,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: colors.status.info,
    fontWeight: typography.fontWeight.semibold,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  prevalenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.lightOrange,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  prevalenceText: {
    fontSize: 12,
    color: colors.status.warning,
    fontWeight: typography.fontWeight.semibold,
  },
  symptomsSection: {
    marginBottom: 15,
  },
  symptomsTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  symptomsList: {
    gap: 6,
  },
  symptomTag: {
    backgroundColor: colors.accent.pinkVeryLight,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  symptomText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  learnMoreBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreBtnText: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});

