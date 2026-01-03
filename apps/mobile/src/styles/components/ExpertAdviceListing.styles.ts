import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for ExpertAdviceListing
 */
export const expertAdviceListingStyles = StyleSheet.create({
  heroSection: {
    backgroundColor: colors.accent.purple,
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
    borderColor: colors.border.dark,
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
  contentSection: {
    padding: spacing.xl,
    paddingTop: 10,
  },
  videoCard: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background.dark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  videoThumbnailPlaceholder: {
    fontSize: 80,
    opacity: 0.3,
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
  videoChannel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
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
});

