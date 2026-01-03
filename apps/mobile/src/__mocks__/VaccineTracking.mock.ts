import { icons } from '../styles';

export interface Vaccine {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedAge: string;
  doses: string;
  nextDueDate?: string;
  status: 'completed' | 'upcoming' | 'due';
}

export const mockVaccines: Vaccine[] = [
  {
    id: '1',
    name: 'HPV Vaccine',
    icon: icons.vaccine,
    description: 'Protects against Human Papillomavirus, which can cause cervical cancer',
    recommendedAge: '9-26 years',
    doses: '2-3 doses',
    nextDueDate: '2024-03-15',
    status: 'upcoming',
  },
  {
    id: '2',
    name: 'Tetanus, Diphtheria, Pertussis (Tdap)',
    icon: icons.shield,
    description: 'Booster vaccine recommended every 10 years',
    recommendedAge: 'Adults',
    doses: '1 dose',
    nextDueDate: '2024-06-20',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Influenza (Flu)',
    icon: icons.flu,
    description: 'Annual flu vaccine recommended for all adults',
    recommendedAge: 'All ages',
    doses: '1 dose annually',
    nextDueDate: '2024-10-01',
    status: 'due',
  },
  {
    id: '4',
    name: 'COVID-19',
    icon: icons.virus,
    description: 'COVID-19 vaccine and booster shots',
    recommendedAge: 'All ages',
    doses: '2-3 doses + boosters',
    status: 'completed',
  },
];

