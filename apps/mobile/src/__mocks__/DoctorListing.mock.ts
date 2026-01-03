export interface Doctor {
  id: string;
  name: string;
  icon: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  experience: string;
  clinic: string;
  consultationFee: string;
  availability: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    icon: '👩‍⚕️',
    specialization: 'Gynecologist',
    rating: 4.8,
    reviewCount: 456,
    experience: '15 years',
    clinic: 'Women\'s Health Clinic',
    consultationFee: '₹800',
    availability: 'Available Today',
  },
  {
    id: '2',
    name: 'Dr. Sarah Williams',
    icon: '👩‍⚕️',
    specialization: 'Obstetrician',
    rating: 4.9,
    reviewCount: 523,
    experience: '18 years',
    clinic: 'Maternity Care Center',
    consultationFee: '₹1000',
    availability: 'Available Tomorrow',
  },
  {
    id: '3',
    name: 'Dr. Anjali Patel',
    icon: '👩‍⚕️',
    specialization: 'General Practitioner',
    rating: 4.6,
    reviewCount: 312,
    experience: '12 years',
    clinic: 'Wellness Care Center',
    consultationFee: '₹600',
    availability: 'Available Today',
  },
];

