/**
 * Theme constants for web - matching mobile app
 */

export const colors = {
  primary: '#E91E63',
  primaryDark: '#C2185B',
  primaryLight: '#F8BBD0',
  
  background: {
    primary: '#FFF5F7',
    secondary: '#F8F8F8',
    tertiary: '#FFE4E9',
    white: '#FFFFFF',
    dark: '#030718',
    overlay: 'rgba(15, 8, 40, 0.65)',
    card: '#FCE4EC',
    lightGray: '#F5F5F5',
  },
  
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    light: '#CCCCCC',
    white: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.7)',
  },
  
  button: {
    primary: '#E91E63',
    secondary: 'rgba(233, 30, 99, 0.1)',
    border: '#E91E63',
    disabled: '#CCCCCC',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#667eea',
  },
  
  border: {
    light: '#F0F0F0',
    medium: '#E0E0E0',
    dark: '#DDDDDD',
    primary: '#E91E63',
    white: 'rgba(255, 255, 255, 0.2)',
  },
  
  status: {
    success: '#4CAF50',
    error: '#FF4081',
    warning: '#FF9800',
    info: '#1976D2',
  },
  
  accent: {
    pink: '#E91E63',
    purple: '#667eea',
    blue: '#1976D2',
    lightBlue: '#E3F2FD',
    orange: '#FF9800',
    lightOrange: '#FFF3E0',
    green: '#4CAF50',
    lightGreen: '#E8F5E9',
    purpleLight: '#F3E5F5',
    pinkLight: '#FFF8FB',
    pinkVeryLight: '#FFE5F0',
  },
  
  story: {
    pregnancy: '#E8F5E9',
    reproductive: '#FFF3E0',
    perimenopause: '#E3F2FD',
    menopause: '#F3E5F5',
  },
  
  rating: {
    star: '#FFB300',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  containerPadding: 16,
  modalPadding: 20,
  modalContentPadding: 24,
  buttonMargin: 12,
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
    xxl: 48,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const icons = {
  home: '🏠',
  profile: '👤',
  products: '🛍️',
  discover: '🔍',
  track: '📅',
  knowledgeHub: '📚',
  menu: '☰',
  alert: '🔔',
  signOut: '🚪',
  about: 'ℹ️',
  vaccine: '💉',
  screening: '🩺',
  hospital: '🏥',
  clinic: '🏥',
  doctor: '👩‍⚕️',
  medicine: '💊',
  pill: '💊',
  bottle: '🧴',
  bandage: '🩹',
  shopping: '🛒',
  pregnancy: '🤰',
  reproductive: '🌸',
  menopause: '🦋',
  perimenopause: '🌅',
  star: '⭐',
  checkmark: '✓',
  warning: '⚠️',
  success: '✅',
  heartEmoji: '💖',
  sparkles: '✨',
  calendar: '📅',
  book: '📚',
  search: '🔍',
  ai: '🤖',
  faq: '❓',
  target: '🎯',
  lock: '🔒',
  globe: '🌐',
  money: '💰',
  microscope: '🔬',
  // Add more as needed
} as const;

export const getIcon = (key: keyof typeof icons): string => {
  return icons[key];
};

