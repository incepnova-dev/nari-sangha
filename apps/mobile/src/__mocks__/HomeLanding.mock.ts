import { icons } from '../styles';

export interface Story {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  theme: 'pregnancy' | 'reproductive' | 'perimenopause' | 'menopause';
}

export interface Research {
  title: string;
  authors: string;
  journal: string;
  url?: string;
}

export interface Video {
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  url: string;
}

export interface Product {
  icon: string;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  vendors: { icon: string; name: string }[];
}

export interface Insurance {
  icon: string;
  name: string;
  provider: string;
  features: string[];
  price: string;
  period: string;
}

export interface Condition {
  icon: string;
  name: string;
  description: string;
  tags: { text: string; type: 'pink' | 'green' | 'orange' }[];
}

export const mockStories: Story[] = [
  {
    icon: icons.pregnancy,
    title: 'Pregnancy Journey',
    subtitle: 'Nurturing new life, embracing transformation',
    description: '"Every kick, every flutter reminds me of the miracle within. Pregnancy isn\'t just about growing a baby—it\'s about discovering strength you never knew you had. From morning sickness to that first heartbeat, every moment is precious. You\'re not just expecting a baby; you\'re becoming a superhero."',
    theme: 'pregnancy',
  },
  {
    icon: icons.reproductive,
    title: 'Reproductive Health',
    subtitle: 'Understanding your body, owning your choices',
    description: '"Your reproductive health is your power. Whether managing PCOS, planning a family, or simply understanding your cycle better—knowledge is empowerment. Regular checkups, honest conversations with your doctor, and listening to your body are acts of self-love. You deserve care, understanding, and respect."',
    theme: 'reproductive',
  },
  {
    icon: icons.perimenopause,
    title: 'Perimenopause Transition',
    subtitle: 'The bridge to a new chapter of vitality',
    description: '"Hot flashes? Mood swings? Welcome to the transition that no one talks about enough! Perimenopause is your body\'s way of preparing for wisdom years. It\'s not an ending—it\'s a transformation. Stay active, eat well, seek support, and remember: this phase brings clarity, confidence, and freedom you\'ve been working toward your whole life."',
    theme: 'perimenopause',
  },
  {
    icon: icons.menopause,
    title: 'Menopause & Beyond',
    subtitle: 'Celebrating wisdom, strength, and new beginnings',
    description: '"Menopause is your body\'s way of saying: \'You\'ve done enough caregiving for others—now it\'s YOUR time!\' No more periods, no pregnancy worries, just pure freedom to focus on YOU. This is when many women start businesses, travel the world, or finally pursue that dream. Bone health, heart health, and mental wellness become priorities. You\'re not aging—you\'re ascending!"',
    theme: 'menopause',
  },
];

export const mockResearch: Research[] = [
  {
    title: 'Advances in Management of Obesity, Menopause, and Osteoporosis',
    authors: 'JAMA Network Research Team',
    journal: 'JAMA Women\'s Health • 2025',
    url: 'https://jamanetwork.com/collections/42139/womens-health',
  },
  {
    title: 'New Directions For Women\'s Health: Expanding Understanding and Research',
    authors: 'Health Affairs Research Initiative',
    journal: 'Health Affairs • January 2025',
    url: 'https://www.healthaffairs.org/doi/10.1377/hlthaff.2024.01004',
  },
  {
    title: 'Closing the Women\'s Health Gap: Diagnostic Delays and Tailored Treatments',
    authors: 'American Society for Microbiology',
    journal: 'ASM Research • May 2025',
    url: 'https://asm.org/articles/2025/may/closing-the-women-s-health-gap',
  },
  {
    title: 'A New Vision for Women\'s Health Research Across NIH',
    authors: 'National Academies of Sciences',
    journal: 'National Academies Press • December 2024',
    url: 'https://www.nationalacademies.org/projects/HMD-BPH-23-04/publication/28586',
  },
  {
    title: 'Single-Dose HPV Vaccine: Breakthrough in Cervical Cancer Prevention',
    authors: 'Gates Foundation Research',
    journal: 'Women\'s Health Technology • 2024',
  },
];

export const mockVideos: Video[] = [
  {
    title: 'The Science of Women\'s Health: Ob/Gyn Reveals 10 Truths You Need to Know',
    channel: 'Mel Robbins • Expert Interview',
    views: '210K views',
    duration: '1:07:13',
    thumbnail: 'https://i.ytimg.com/vi/7KX2x0d42EE/hq720.jpg',
    url: 'https://www.youtube.com/watch?v=7KX2x0d42EE',
  },
  {
    title: '5 Things Your Gynecologist Wants You To Know: Getting Pregnant',
    channel: 'Mama Doctor Jones • Board Certified ObGyn',
    views: '1.2M views',
    duration: '10:29',
    thumbnail: 'https://i.ytimg.com/vi/EkqVrsrIgAI/hq720.jpg',
    url: 'https://www.youtube.com/watch?v=EkqVrsrIgAI',
  },
];

export const mockProducts: Product[] = [
  {
    icon: icons.pill,
    name: 'Prenatal Vitamins',
    brand: 'HealthPlus',
    price: '₹349',
    originalPrice: '₹499',
    discount: '30% OFF',
    vendors: [
      { icon: icons.shopping, name: 'Amazon' },
      { icon: icons.hospital, name: '1mg' },
    ],
  },
  {
    icon: icons.pill,
    name: 'Menstrual Pain Relief',
    brand: 'WellnessRx',
    price: '₹225',
    originalPrice: '₹300',
    discount: '25% OFF',
    vendors: [
      { icon: icons.shopping, name: 'Flipkart' },
      { icon: icons.hospital, name: 'Netmeds' },
    ],
  },
  {
    icon: icons.yoga,
    name: 'Yoga Mat Premium',
    brand: 'FitLife',
    price: '₹599',
    originalPrice: '₹999',
    discount: '40% OFF',
    vendors: [
      { icon: icons.shopping, name: 'Amazon' },
      { icon: icons.flower, name: 'Myntra' },
    ],
  },
  {
    icon: icons.pill,
    name: 'Iron Supplements',
    brand: 'NutriCare',
    price: '₹299',
    originalPrice: '₹459',
    discount: '35% OFF',
    vendors: [
      { icon: icons.hospital, name: '1mg' },
      { icon: icons.hospital, name: 'PharmEasy' },
    ],
  },
  {
    icon: icons.thermometer,
    name: 'Digital Thermometer',
    brand: 'MediTech',
    price: '₹399',
    originalPrice: '₹499',
    discount: '20% OFF',
    vendors: [
      { icon: icons.shopping, name: 'Amazon' },
      { icon: icons.hospital, name: '1mg' },
    ],
  },
  {
    icon: icons.blood,
    name: 'Calcium + Vitamin D',
    brand: 'BoneStrong',
    price: '₹349',
    originalPrice: '₹635',
    discount: '45% OFF',
    vendors: [
      { icon: icons.hospital, name: 'Netmeds' },
      { icon: icons.hospital, name: 'PharmEasy' },
    ],
  },
];

export const mockInsurancePlans: Insurance[] = [
  {
    icon: icons.hospital,
    name: "Women's Health Shield",
    provider: 'Star Health Insurance',
    features: [
      'Maternity coverage up to ₹2L',
      'Cancer treatment covered',
      'Annual health checkup included',
    ],
    price: '₹8,999',
    period: 'per year',
  },
  {
    icon: icons.pregnancy,
    name: 'Maternity Care Plus',
    provider: 'ICICI Lombard',
    features: [
      'Pre & post natal coverage',
      'Newborn baby cover (90 days)',
      'Ambulance charges covered',
    ],
    price: '₹12,499',
    period: 'per year',
  },
  {
    icon: icons.screening,
    name: "Complete Women's Wellness",
    provider: 'Max Bupa Health Insurance',
    features: [
      'PCOS & Thyroid treatment covered',
      'Fertility consultations included',
      'Mental health support covered',
    ],
    price: '₹10,999',
    period: 'per year',
  },
];

export const mockConditions: Condition[] = [
  {
    icon: icons.screening,
    name: 'Polycystic Ovary Syndrome (PCOS)',
    description: 'Hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
    tags: [
      { text: 'Irregular periods', type: 'pink' },
      { text: 'Lifestyle changes', type: 'green' },
      { text: 'Hormonal imbalance', type: 'orange' },
    ],
  },
  {
    icon: '🎗️',
    name: 'Breast Cancer',
    description: 'Cancer that forms in breast cells. Early detection through regular screening significantly improves outcomes.',
    tags: [
      { text: 'Breast lump', type: 'pink' },
      { text: 'Regular screening', type: 'green' },
      { text: 'Genetic factors', type: 'orange' },
    ],
  },
  {
    icon: '💢',
    name: 'Endometriosis',
    description: 'Tissue similar to uterine lining grows outside the uterus, causing pain and fertility issues.',
    tags: [
      { text: 'Pelvic pain', type: 'pink' },
      { text: 'Early diagnosis', type: 'green' },
      { text: 'Unknown origin', type: 'orange' },
    ],
  },
];

