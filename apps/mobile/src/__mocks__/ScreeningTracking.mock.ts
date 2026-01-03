import { icons } from '../styles';

export interface Screening {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendedFrequency: string;
  lastScreening?: string;
  nextDueDate?: string;
  status: 'completed' | 'upcoming' | 'overdue';
}

export const mockScreenings: Screening[] = [
  {
    id: '1',
    name: 'Pap Smear / Cervical Cancer Screening',
    icon: icons.screening,
    description: 'Screening for cervical cancer and abnormal cells',
    recommendedFrequency: 'Every 3 years (21-65 years)',
    lastScreening: '2023-06-15',
    nextDueDate: '2026-06-15',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Mammogram',
    icon: icons.heart,
    description: 'Breast cancer screening using X-ray imaging',
    recommendedFrequency: 'Every 1-2 years (40+ years)',
    lastScreening: '2023-09-20',
    nextDueDate: '2024-09-20',
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Bone Density Test',
    icon: icons.bone,
    description: 'Osteoporosis screening for bone health',
    recommendedFrequency: 'Every 2 years (65+ years)',
    nextDueDate: '2024-05-10',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Blood Pressure Check',
    icon: icons.blood,
    description: 'Regular blood pressure monitoring',
    recommendedFrequency: 'Annually',
    lastScreening: '2023-12-01',
    nextDueDate: '2024-12-01',
    status: 'upcoming',
  },
  {
    id: '5',
    name: 'Cholesterol Screening',
    icon: icons.testTube,
    description: 'Lipid profile and cholesterol levels',
    recommendedFrequency: 'Every 5 years (20+ years)',
    lastScreening: '2022-03-10',
    nextDueDate: '2024-03-10',
    status: 'overdue',
  },
];

