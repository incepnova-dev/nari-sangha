import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Component-specific styles for SideMenu
 */
export const sideMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.background.white,
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  profileSection: {
    backgroundColor: colors.primary,
    padding: spacing.xl * 2,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileIconText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.white,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuItemsContainer: {
    paddingTop: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  menuItemArrow: {
    fontSize: 24,
    color: colors.text.tertiary,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.medium,
    marginVertical: 10,
    marginHorizontal: 25,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  signOutIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
  },
  signOutLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
});

