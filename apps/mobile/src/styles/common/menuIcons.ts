import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

// Import home icon images
const homeIconActive = require('../../assets/images/home-icon-active.png');
const homeIconInactive = require('../../assets/images/home-icon-inactive.png');

// Import discussions icon images
const discussionsIconActive = require('../../assets/images/discussion-icon-active.png');
const discussionsIconInactive = require('../../assets/images/discussion-icon-inactive.png');

// Import community icon images
const communityIconActive = require('../../assets/images/community-icon-active.png');
const communityIconInactive = require('../../assets/images/community-icon-inactive.png');

// Import profile icon images
const profileIconActive = require('../../assets/images/profile-icon-active.png');
const profileIconInactive = require('../../assets/images/profile-icon-inactive.png');

// Import alert icon images
const alertIconActive = require('../../assets/images/alert-icon-active.png');
const alertIconInactive = require('../../assets/images/alert-icon-inactive.png');

// Import products icon images
const productsIconActive = require('../../assets/images/products-icon-active.png');
const productsIconInactive = require('../../assets/images/products-icon-inactive.png');

/**
 * Common styles for bottom menu icon components
 */
export const menuIconStyles = StyleSheet.create({
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  menuItemActive: {
    backgroundColor: colors.background.secondary,
  },
  menuIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  menuIconImage: {
    width: 24,
    height: 24,
  },
  homeIconActive: {
    width: 24,
    height: 24,
  },
  homeIconInactive: {
    width: 24,
    height: 24,
  },
  discussionsIconActive: {
    width: 24,
    height: 24,
  },
  discussionsIconInactive: {
    width: 24,
    height: 24,
  },
  communityIconActive: {
    width: 24,
    height: 24,
  },
  communityIconInactive: {
    width: 24,
    height: 24,
  },
  profileIconActive: {
    width: 24,
    height: 24,
  },
  profileIconInactive: {
    width: 24,
    height: 24,
  },
  alertIconActive: {
    width: 24,
    height: 24,
  },
  alertIconInactive: {
    width: 24,
    height: 24,
  },
  productsIconActive: {
    width: 24,
    height: 24,
  },
  productsIconInactive: {
    width: 24,
    height: 24,
  },
});

/**
 * Home icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const homeIconSources = {
  active: homeIconActive,
  inactive: homeIconInactive,
};

/**
 * Discussions icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const discussionsIconSources = {
  active: discussionsIconActive,
  inactive: discussionsIconInactive,
};

/**
 * Community icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const communityIconSources = {
  active: communityIconActive,
  inactive: communityIconInactive,
};

/**
 * Profile icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const profileIconSources = {
  active: profileIconActive,
  inactive: profileIconInactive,
};

/**
 * Alert icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const alertIconSources = {
  active: alertIconActive,
  inactive: alertIconInactive,
};

/**
 * Products icon image sources
 * These are exported separately as StyleSheet cannot contain image sources
 */
export const productsIconSources = {
  active: productsIconActive,
  inactive: productsIconInactive,
};

