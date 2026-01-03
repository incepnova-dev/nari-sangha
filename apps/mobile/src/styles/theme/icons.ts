/**
 * Icon constants for the application theme
 * Centralized location for all icon emojis/symbols
 * All icon emojis used across the application should be defined here
 */
export const icons = {
  // Navigation & Menu
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
  community: '👥',
  discussions: '💬',
  createCommunity: '➕',
  search: '🔍',
  
  // Health & Medical
  vaccine: '💉',
  screening: '🩺',
  hospital: '🏥',
  clinic: '🏥',
  doctor: '👩‍⚕️',
  doctorMale: '👨‍⚕️',
  medicine: '💊',
  syringe: '💉',
  stethoscope: '🩺',
  shield: '🛡️',
  virus: '🦠',
  flu: '🤧',
  heart: '💗',
  bone: '🦴',
  blood: '🩸',
  testTube: '🧪',
  dna: '🧬',
  microscope: '🔬',
  thermometer: '🌡️',
  
  // Products & Shopping
  pill: '💊',
  bottle: '🧴',
  bandage: '🩹',
  shopping: '🛒',
  cart: '🛒',
  
  // Women's Health
  pregnancy: '🤰',
  reproductive: '🌸',
  menopause: '🦋',
  perimenopause: '🌅',
  period: '📅',
  cycle: '📅',
  
  // Insurance & Finance
  insurance: '🏥',
  bank: '🏦',
  briefcase: '💼',
  money: '💰',
  
  // Status & Actions
  star: '⭐',
  starHalf: '🌟',
  starEmpty: '☆',
  checkmark: '✓',
  warning: '⚠️',
  success: '✅',
  heartEmoji: '💖',
  sparkles: '✨',
  
  // Calendar & Time
  calendar: '📅',
  clock: '🕐',
  date: '📅',
  
  // Knowledge & Education
  book: '📚',
  research: '🔬',
  study: '📖',
  target: '🎯',
  lightbulb: '💡',
  graduation: '🎓',
  
  // Lifestyle & Wellness
  yoga: '🧘‍♀️',
  exercise: '🏃‍♀️',
  food: '🥗',
  fire: '🔥',
  balance: '⚖️',
  wellness: '😌',
  hair: '💇',
  moon: '🌓',
  flower: '🌸',
  butterfly: '🦋',
  sunrise: '🌅',
  
  // Security & Privacy
  lock: '🔒',
  globe: '🌐',
  
  // Special
  featured: '⭐',
  bestValue: '⭐',
  popular: '🔥',
  robot: '🤖',
  ai: '🤖',
  question: '❓',
  faq: '❓',
} as const;

/**
 * Get icon by key with type safety
 */
export const getIcon = (key: keyof typeof icons): string => {
  return icons[key];
};

/**
 * Icon categories for easier access
 */
export const iconCategories = {
  navigation: {
    home: icons.home,
    profile: icons.profile,
    products: icons.products,
    search: icons.search,
    menu: icons.menu,
    alert: icons.alert,
  },
  health: {
    vaccine: icons.vaccine,
    screening: icons.screening,
    hospital: icons.hospital,
    clinic: icons.clinic,
    doctor: icons.doctor,
    medicine: icons.medicine,
    stethoscope: icons.stethoscope,
    heart: icons.heart,
    blood: icons.blood,
  },
  womensHealth: {
    pregnancy: icons.pregnancy,
    reproductive: icons.reproductive,
    menopause: icons.menopause,
    perimenopause: icons.perimenopause,
    period: icons.period,
  },
  products: {
    pill: icons.pill,
    bottle: icons.bottle,
    bandage: icons.bandage,
    shopping: icons.shopping,
  },
  status: {
    star: icons.star,
    checkmark: icons.checkmark,
    warning: icons.warning,
    success: icons.success,
  },
} as const;

