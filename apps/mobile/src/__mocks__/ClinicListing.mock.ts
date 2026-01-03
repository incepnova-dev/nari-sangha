import { icons } from '../styles';

export interface Clinic {
  id: string;
  name: string;
  icon: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  specialties: string[];
  timings: string;
}

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'Women\'s Health Clinic',
    icon: icons.hospital,
    rating: 4.7,
    reviewCount: 234,
    address: '123 Health Street, City',
    distance: '2.5 km',
    specialties: ['Gynecology', 'Obstetrics', 'General Practice'],
    timings: 'Mon-Sat: 9 AM - 6 PM',
  },
  {
    id: '2',
    name: 'Wellness Care Center',
    icon: icons.pill,
    rating: 4.5,
    reviewCount: 189,
    address: '456 Wellness Avenue',
    distance: '3.2 km',
    specialties: ['General Practice', 'Preventive Care'],
    timings: 'Mon-Fri: 8 AM - 7 PM',
  },
  {
    id: '3',
    name: 'Maternity Care Clinic',
    icon: icons.pregnancy,
    rating: 4.8,
    reviewCount: 312,
    address: '789 Maternity Road',
    distance: '1.8 km',
    specialties: ['Obstetrics', 'Prenatal Care', 'Postnatal Care'],
    timings: 'Mon-Sat: 8 AM - 8 PM',
  },
];

