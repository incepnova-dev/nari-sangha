/**
 * Central export file for all styles
 * Matches mobile app structure for easy migration
 */

// Theme constants (already converted to CSS variables in variables.css)
export * from './theme';

// Common styles (CSS Modules) - explicit exports to avoid conflicts
export {
  // CSS Module exports
  buttonStyles,
  cardStyles,
  formStyles,
  containerStyles,
  headerStyles,
  badgeStyles,
  typographyStyles,
  searchStyles,
  ratingStyles,
  tagStyles,
  summaryCardStyles,
  detailStyles,
  filterStyles,
  heroStyles,
  checkboxStyles,
  statusBadgeStyles,
  actionButtonStyles,
  iconContainerStyles,
  iconStyles,
  cardHeaderStyles,
  listContainerStyles,
  scrollStyles,
  layoutStyles,
  menuIconStyles,
  modalStyles,
  // Convenience exports
  buttons,
  cards,
  forms,
  containers,
  headers,
  badges,
  textStyles,
  search,
  ratings,
  tags,
  summaryCards,
  details,
  filters,
  hero,
  checkboxes,
  statusBadges,
  actionButtons,
  iconContainers,
  cardHeaders,
  listContainers,
  scroll,
  layout,
  menuIcons,
  modals,
} from './common';

// Legacy CSS imports (existing web app styles)
import './auth/SignUpModal.css';
import './auth/SignInModal.css';
import './narisangha/narisangha.css';
import './narisangha/UnauthenticatedLanding.css';
import './narisangha/header/Header.css';
import './narisangha/leftsection/LeftSection.css';
import './narisangha/leftsection/LiveConversations.css';
import './narisangha/leftsection/ProviderConnections.css';
import './narisangha/leftsection/CreatedGroupsList.css';
import './narisangha/leftsection/ExternalGroupsList.css';
import './narisangha/rightsection/FreshDiscussions.css';
import './narisangha/rightsection/CommunityOverview.css';
