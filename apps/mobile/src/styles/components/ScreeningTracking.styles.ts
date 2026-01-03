import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { summaryCardStyles, detailStyles, statusBadgeStyles, actionButtonStyles, iconContainerStyles, listContainerStyles } from '../common';

/**
 * Component-specific styles for ScreeningTracking
 */
export const screeningTrackingStyles = StyleSheet.create({
  summaryCard: summaryCardStyles.summaryCard,
  summaryTitle: summaryCardStyles.summaryTitle,
  summaryStats: summaryCardStyles.summaryStats,
  statItem: summaryCardStyles.statItem,
  statNumber: summaryCardStyles.statNumber,
  statLabel: summaryCardStyles.statLabel,
  screeningsContainer: listContainerStyles.listContainer,
  screeningCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  screeningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 15,
  },
  screeningIcon: {
    ...iconContainerStyles.iconContainer,
    ...iconContainerStyles.iconContainerSmall,
  },
  screeningIconText: iconContainerStyles.iconTextSmall,
  screeningInfo: {
    flex: 1,
  },
  screeningName: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: 6,
  },
  statusBadge: statusBadgeStyles.statusBadge,
  statusText: statusBadgeStyles.statusText,
  screeningDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  screeningDetails: detailStyles.detailsContainer,
  detailRow: detailStyles.detailRow,
  detailLabel: detailStyles.detailLabel,
  detailValue: detailStyles.detailValue,
  actionButton: actionButtonStyles.actionButton,
  actionButtonText: actionButtonStyles.actionButtonText,
});

