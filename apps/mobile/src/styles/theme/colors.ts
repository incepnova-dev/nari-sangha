/**
 * Color constants for the application theme
 * Comprehensive color palette extracted from all components
 */
export const colors = {
  // Primary brand colors
  primary: '#E91E63', // Pink - main brand color
  primaryDark: '#C2185B',
  primaryLight: '#F8BBD0',
  
  // Background colors
  background: {
    primary: '#FFF5F7', // Light pink background
    secondary: '#F8F8F8', // Light gray background
    tertiary: '#FFE4E9', // Very light pink
    white: '#FFFFFF',
    dark: '#030718',
    overlay: 'rgba(15, 8, 40, 0.65)',
    card: '#FCE4EC', // Card background
    lightGray: '#F5F5F5',
  },
  
  // Text colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    light: '#CCCCCC',
    white: '#FFFFFF',
    muted: 'rgba(255, 255, 255, 0.7)',
  },
  
  // Button colors
  button: {
    primary: '#E91E63',
    secondary: 'rgba(233, 30, 99, 0.1)',
    border: '#E91E63',
    disabled: '#CCCCCC',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#667eea',
  },
  
  // Border colors
  border: {
    light: '#F0F0F0',
    medium: '#E0E0E0',
    dark: '#DDDDDD',
    primary: '#E91E63',
    white: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Status colors
  status: {
    success: '#4CAF50',
    error: '#FF4081',
    warning: '#FF9800',
    info: '#1976D2',
  },
  
  // Accent colors for different sections
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
  
  // Story card backgrounds
  story: {
    pregnancy: '#E8F5E9',
    reproductive: '#FFF3E0',
    perimenopause: '#E3F2FD',
    menopause: '#F3E5F5',
  },
  
  // Shadow colors
  shadow: {
    default: '#000000',
    primary: '#E91E63',
    success: '#4CAF50',
  },
  
  // Rating/Star colors
  rating: {
    star: '#FFB300',
  },
} as const;
