import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Reusable header styles
 */
export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  headerWithBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.xl,
    paddingTop: spacing.xl,
    marginBottom: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonOnPrimary: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: colors.text.primary,
  },
  backButtonTextWhite: {
    fontSize: 20,
    color: colors.text.white,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  headerTitleWhite: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.text.white,
    opacity: 0.9,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  headerSpacerSmall: {
    width: 35,
  },
  headerNoBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  headerTitleNoBackground: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  sectionTitleLarge: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.xl * 2,
  },
  seeAllBtn: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});

