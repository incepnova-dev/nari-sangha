import { icons } from '../styles';

export interface Product {
  id: string;
  icon: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  availableStores: number;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    icon: icons.pill,
    name: 'Folic Acid Tablets',
    description: 'Essential supplement for pregnant women. Helps prevent neural tube defects. 90 tablets pack.',
    rating: 4.7,
    reviewCount: 1234,
    priceRange: '₹249 - ₹399',
    availableStores: 12,
  },
  {
    id: '2',
    icon: icons.bottle,
    name: 'Prenatal Vitamins',
    description: 'Complete multivitamin for pregnancy. Contains DHA, Iron, and essential nutrients. 60 capsules.',
    rating: 4.5,
    reviewCount: 892,
    priceRange: '₹599 - ₹899',
    availableStores: 8,
  },
  {
    id: '3',
    icon: icons.bandage,
    name: 'Menstrual Pain Relief',
    description: 'Fast-acting pain relief for menstrual cramps. Non-drowsy formula. 20 tablets.',
    rating: 4.8,
    reviewCount: 2145,
    priceRange: '₹149 - ₹249',
    availableStores: 15,
  },
  {
    id: '4',
    icon: icons.pill,
    name: 'Iron Supplements',
    description: 'High-potency iron tablets for anemia prevention. Gentle on stomach. 60 tablets.',
    rating: 4.6,
    reviewCount: 1567,
    priceRange: '₹299 - ₹449',
    availableStores: 10,
  },
  {
    id: '5',
    icon: icons.bottle,
    name: 'Calcium + Vitamin D3',
    description: 'Bone health support for women. Reduces risk of osteoporosis. 60 tablets.',
    rating: 4.4,
    reviewCount: 987,
    priceRange: '₹349 - ₹499',
    availableStores: 9,
  },
];

