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
    buyLink: 'https://www.careinsurance.com',
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
    buyLink: 'https://www.maxbupa.com',
  },
];

