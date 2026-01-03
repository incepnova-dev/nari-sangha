import { icons } from '../styles';

export interface Stat {
  number: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface WhyItem {
  icon: string;
  title: string;
  text: string;
}

export const mockStats: Stat[] = [
  { number: '500K+', label: 'Women Served' },
  { number: '1000+', label: 'Expert Doctors' },
  { number: '50+', label: 'Health Topics' },
  { number: '24/7', label: 'AI Support' },
];

export const mockServices: Service[] = [
  {
    icon: icons.products,
    title: 'Product Search & Comparison',
    description: 'Find the best healthcare products tailored to your needs with intelligent search and price comparison.',
    features: [
      'Compare prices across multiple vendors',
      'Verified product reviews and ratings',
      'Expert recommendations',
      'Exclusive discounts and offers',
    ],
  },
  {
    icon: icons.hospital,
    title: 'Health Insurance Guidance',
    description: 'Navigate health insurance options with personalized recommendations and coverage insights.',
    features: [
      'Policy comparison tools',
      'Claim assistance support',
      'Coverage recommendations',
      'Premium calculators',
    ],
  },
  {
    icon: icons.knowledgeHub,
    title: 'Knowledge Hub',
    description: 'Comprehensive information on women-focused diseases, conditions, and health topics.',
    features: [
      'Evidence-based articles',
      'Expert-written guides',
      'Latest research updates',
      'Interactive learning modules',
      'PCOS, Endometriosis, PCOD',
      'Menopause & Hormonal Health',
    ],
  },
  {
    icon: icons.vaccine,
    title: 'Vaccination & Screening Guidelines',
    description: 'Stay up-to-date with personalized vaccination schedules and screening recommendations.',
    features: [
      'Age-appropriate screening reminders',
      'HPV & Cervical cancer screening',
      'Breast cancer detection guidelines',
      'Prenatal and maternal vaccinations',
      'Personalized health calendars',
    ],
  },
  {
    icon: icons.ai,
    title: 'AI Health Assistant',
    description: 'Get instant answers to your health questions with our intelligent 24/7 AI assistant.',
    features: [
      'Instant health query responses',
      'Symptom assessment guidance',
      'Medication information',
      'Appointment scheduling help',
      'Multilingual support',
    ],
  },
  {
    icon: icons.faq,
    title: "Women's Health FAQs",
    description: 'Quick answers to the most common women\'s health questions from trusted experts.',
    features: [
      'Menstrual health queries',
      'Pregnancy & fertility FAQs',
      'Hormonal health concerns',
      'Sexual health guidance',
      'Lifestyle & wellness tips',
    ],
  },
];

export const mockWhyItems: WhyItem[] = [
  {
    icon: icons.target,
    title: 'Women-Centric Approach',
    text: 'Designed specifically for women\'s unique health needs across all life stages',
  },
  {
    icon: icons.doctor,
    title: 'Expert Medical Team',
    text: 'Access to board-certified specialists in obstetrics, gynecology, and women\'s health',
  },
  {
    icon: icons.lock,
    title: 'Privacy & Confidentiality',
    text: 'Your health information is protected with industry-leading security measures',
  },
  {
    icon: icons.globe,
    title: 'Accessible Anywhere',
    text: 'Get quality healthcare guidance from the comfort of your home, anytime',
  },
  {
    icon: icons.money,
    title: 'Affordable Care',
    text: 'Best prices, insurance support, and transparent pricing with no hidden costs',
  },
  {
    icon: icons.microscope,
    title: 'Evidence-Based',
    text: 'All information backed by latest medical research and clinical guidelines',
  },
];

