/**
 * Common styles index - exports all common CSS modules
 * Provides the same API as mobile app for easy migration
 */

// Import CSS modules as default
import buttonStyles from './buttons.module.css';
import cardStyles from './cards.module.css';
import formStyles from './forms.module.css';
import containerStyles from './containers.module.css';
import headerStyles from './headers.module.css';
import badgeStyles from './badges.module.css';
import typographyStyles from './typography.module.css';
import searchStyles from './search.module.css';
import ratingStyles from './ratings.module.css';
import tagStyles from './tags.module.css';
import summaryCardStyles from './summaryCards.module.css';
import detailStyles from './details.module.css';
import filterStyles from './filters.module.css';
import heroStyles from './hero.module.css';
import checkboxStyles from './checkboxes.module.css';
import statusBadgeStyles from './statusBadges.module.css';
import actionButtonStyles from './actionButtons.module.css';
import iconContainerStyles from './iconContainers.module.css';
import cardHeaderStyles from './cardHeaders.module.css';
import listContainerStyles from './listContainers.module.css';
import scrollStyles from './scroll.module.css';
import layoutStyles from './layout.module.css';
import menuIconStyles from './menuIcons.module.css';
import modalStyles from './modals.module.css';

// Re-export theme constants
export * from '../theme';

// Export as named exports (for direct imports)
export { default as buttonStyles } from './buttons.module.css';
export { default as cardStyles } from './cards.module.css';
export { default as formStyles } from './forms.module.css';
export { default as containerStyles } from './containers.module.css';
export { default as headerStyles } from './headers.module.css';
export { default as badgeStyles } from './badges.module.css';
export { default as typographyStyles } from './typography.module.css';
export { default as searchStyles } from './search.module.css';
export { default as ratingStyles } from './ratings.module.css';
export { default as tagStyles } from './tags.module.css';
export { default as summaryCardStyles } from './summaryCards.module.css';
export { default as detailStyles } from './details.module.css';
export { default as filterStyles } from './filters.module.css';
export { default as heroStyles } from './hero.module.css';
export { default as checkboxStyles } from './checkboxes.module.css';
export { default as statusBadgeStyles } from './statusBadges.module.css';
export { default as actionButtonStyles } from './actionButtons.module.css';
export { default as iconContainerStyles } from './iconContainers.module.css';
export { default as iconStyles } from './icons.module.css';
export { default as cardHeaderStyles } from './cardHeaders.module.css';
export { default as listContainerStyles } from './listContainers.module.css';
export { default as scrollStyles } from './scroll.module.css';
export { default as layoutStyles } from './layout.module.css';
export { default as menuIconStyles } from './menuIcons.module.css';
export { default as modalStyles } from './modals.module.css';

// Convenience exports matching mobile app structure
export const buttons = buttonStyles;
export const cards = cardStyles;
export const forms = formStyles;
export const containers = containerStyles;
export const headers = headerStyles;
export const badges = badgeStyles;
export const textStyles = typographyStyles;
export const search = searchStyles;
export const ratings = ratingStyles;
export const tags = tagStyles;
export const summaryCards = summaryCardStyles;
export const details = detailStyles;
export const filters = filterStyles;
export const hero = heroStyles;
export const checkboxes = checkboxStyles;
export const statusBadges = statusBadgeStyles;
export const actionButtons = actionButtonStyles;
export const iconContainers = iconContainerStyles;
// Note: 'icons' is exported from theme (icon constants), iconStyles is already exported above
export const cardHeaders = cardHeaderStyles;
export const listContainers = listContainerStyles;
export const scroll = scrollStyles;
export const layout = layoutStyles;
export const menuIcons = menuIconStyles;
export const modals = modalStyles;

