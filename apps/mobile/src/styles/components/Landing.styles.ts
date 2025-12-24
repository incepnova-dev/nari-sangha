import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for Landing
 */
export const landingContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.containerPadding,
    backgroundColor: colors.background.primary,
  },
});

export const landingContent = StyleSheet.create({
  contentContainer: {
    maxWidth: 960,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.xxxl,
    textAlign: 'center',
    paddingHorizontal: spacing.containerPadding,
  },
});

export const landingActions = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.xxxl,
  },
  exploreText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginRight: spacing.lg,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.modalPadding,
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.lg,
    padding: spacing.modalContentPadding,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalPlaceholder: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  form: {
    marginTop: spacing.sm,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: '#f97373',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertModalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.lg,
    width: '85%',
    maxWidth: 350,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: colors.border.light,
    overflow: 'hidden',
  },
  alertModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  alertModalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  alertModalClose: {
    fontSize: typography.fontSize.xl,
    color: colors.text.secondary,
    padding: spacing.xs,
  },
  alertModalBody: {
    maxHeight: 400,
  },
  alertModalEmpty: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  alertModalEmptyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  alertItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  alertItemContent: {
    flex: 1,
  },
  alertItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  alertItemMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  alertItemTime: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});


