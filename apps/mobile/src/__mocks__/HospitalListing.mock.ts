export interface Hospital {
  id: string;
  name: string;
  icon: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  specialties: string[];
  emergency: boolean;
  beds: string;
}

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    icon: '🏨',
    rating: 4.6,
    reviewCount: 1234,
    address: '789 Hospital Road, City',
    distance: '5.2 km',
    specialties: ['Emergency', 'Maternity', 'Cardiology', 'Surgery'],
    emergency: true,
    beds: '500+',
  },
  {
    id: '2',
    name: 'Women\'s Specialty Hospital',
    icon: '🏥',
    rating: 4.8,
    reviewCount: 892,
    address: '456 Health Boulevard',
    distance: '3.8 km',
    specialties: ['Maternity', 'Gynecology', 'Pediatrics'],
    emergency: true,
    beds: '300+',
  },
  {
    id: '3',
    name: 'Community Medical Center',
    icon: '🏩',
    rating: 4.5,
    reviewCount: 567,
    address: '123 Community Street',
    distance: '2.1 km',
    specialties: ['General Medicine', 'Emergency', 'Outpatient'],
    emergency: true,
    beds: '200+',
  },
];

