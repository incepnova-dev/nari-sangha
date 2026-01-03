import { icons } from '../styles';

export interface InsurancePlan {
  id: string;
  providerName: string;
  providerIcon: string;
  badge?: string;
  badgeType?: 'bestValue' | 'popular';
  price: string;
  rating: number;
  coverage: string[];
  details?: {
    coverage: string;
    waitingPeriod: string;
    networkHospitals: string;
    claimSettlement: string;
    additionalBenefits: string[];
    terms: string;
  };
  buyLink: string;
}

export const mockInsurancePlans: InsurancePlan[] = [
  {
    id: '1',
    providerName: 'Care Supreme',
    providerIcon: icons.hospital,
    badge: 'Best Value',
    badgeType: 'bestValue',
    price: '₹15,000/year',
    rating: 4.5,
    coverage: [
      'Coverage ₹5L',
      'Maternity coverage included',
      'Annual health checkups',
      'No waiting period for accidents',
    ],
    details: {
      coverage: '₹5,00,000',
      waitingPeriod: '12 months for maternity',
      networkHospitals: '10,000+ hospitals',
      claimSettlement: 'Cashless treatment available',
      additionalBenefits: [
        'Pre and post hospitalization coverage',
        'Day care procedures covered',
        'Domiciliary hospitalization',
        'Organ donor expenses covered',
      ],
      terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
    },
    buyLink: 'https://www.caresupreme.in',
  },
  {
    id: '2',
    providerName: 'Star Health',
    providerIcon: icons.bank,
    badge: 'Most Popular',
    badgeType: 'popular',
    price: '₹18,500/year',
    rating: 4.7,
    coverage: [
      'Coverage ₹7L',
      'Critical illness cover',
      'No claim bonus',
      'Wellness benefits included',
    ],
    details: {
      coverage: '₹7,00,000',
      waitingPeriod: '9 months for maternity',
      networkHospitals: '8,500+ hospitals',
      claimSettlement: 'Quick claim processing',
      additionalBenefits: [
        'Newborn coverage from day 1',
        'Vaccination expenses covered',
        'Post-delivery complications',
        'Lactation consultation',
      ],
      terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
    },
    buyLink: 'https://www.starhealth.in',
  },
  {
    id: '3',
    providerName: 'Max Bupa',
    providerIcon: icons.briefcase,
    price: '₹12,000/year',
    rating: 4.3,
    coverage: [
      'Coverage ₹3L',
      'OPD cover included',
      'Health checkups',
      'Preventive care benefits',
    ],
    details: {
      coverage: '₹3,00,000',
      waitingPeriod: '24 months for maternity',
      networkHospitals: '12,000+ hospitals',
      claimSettlement: '24/7 claim support',
      additionalBenefits: [
        'Mental health counseling sessions',
        'Fertility treatment coverage',
        'Alternative medicine coverage',
        'Wellness program benefits',
      ],
      terms: 'Subject to policy terms and conditions. Premium may vary based on age and medical history.',
    },
    buyLink: 'https://www.maxbupa.com',
  },
];

