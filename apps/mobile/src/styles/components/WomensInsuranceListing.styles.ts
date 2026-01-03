import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for WomensInsuranceListing
 */
export const womensInsuranceListingStyles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    margin: 15,
    marginTop: spacing.xl,
    paddingHorizontal: 15,
    paddingVertical: spacing.md,
    borderRadius: 25,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  cardsContainer: {
    paddingHorizontal: spacing.xl,
  },
  insuranceCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  insuranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  insuranceProvider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  providerLogo: {
    width: 50,
    height: 50,
    backgroundColor: colors.accent.pinkVeryLight,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerIcon: {
    fontSize: 20,
  },
  providerName: {
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.button.success,
    borderRadius: 10,
  },
  badgePopular: {
    backgroundColor: colors.status.warning,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.text.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  price: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stars: {
    color: '#FFB300',
    fontSize: typography.fontSize.sm,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  coverageList: {
    marginBottom: spacing.md,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  coverageCheck: {
    color: colors.button.success,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    marginRight: spacing.sm,
  },
  coverageText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  expandedDetails: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  detailsSection: {
    marginBottom: spacing.lg,
  },
  detailsTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  benefitCheck: {
    color: colors.button.success,
    fontSize: 13,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 13,
    color: colors.text.secondary,
    flex: 1,
  },
  termsSection: {
    backgroundColor: colors.accent.pinkVeryLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  termsText: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  buyNowBtn: {
    backgroundColor: colors.button.success,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  buyNowBtnText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
  },
  viewDetailsBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: spacing.sm,
  },
  viewDetailsBtnText: {
    fontSize: 15,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  compareButton: {
    margin: spacing.xl,
    marginTop: 10,
    paddingVertical: 15,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  compareButtonDisabled: {
    opacity: 0.6,
  },
  compareButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.white,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

