import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for UnauthenticatedLanding
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
});

