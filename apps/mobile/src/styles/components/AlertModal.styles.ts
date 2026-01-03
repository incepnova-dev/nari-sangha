import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for AlertModal
 */
export const alertModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.white,
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    minHeight: 300,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 10,
  },
  emptyState: {
    padding: spacing.xl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    fontWeight: typography.fontWeight.medium,
  },
  alertItem: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  alertItemContent: {
    flex: 1,
  },
  alertItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  alertItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
  },
  alertBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  alertItemMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  alertItemTime: {
    fontSize: 12,
    color: colors.text.tertiary,
    fontWeight: typography.fontWeight.medium,
  },
});

