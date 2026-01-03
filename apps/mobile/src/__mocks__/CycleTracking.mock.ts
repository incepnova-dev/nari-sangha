export interface Cycle {
  id: string;
  date: string;
  duration: number;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
}

export interface CycleData {
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriod: string;
  nextPeriodPredicted: string;
  nextOvulationPredicted: string;
  recentCycles: Cycle[];
}

export const mockCycleData: CycleData = {
  averageCycleLength: 28,
  averagePeriodLength: 5,
  lastPeriod: '2024-01-15',
  nextPeriodPredicted: '2024-02-12',
  nextOvulationPredicted: '2024-01-29',
  recentCycles: [
    {
      id: '1',
      date: '2024-01-15',
      duration: 5,
      flow: 'medium',
      symptoms: ['Cramps', 'Bloating'],
    },
    {
      id: '2',
      date: '2023-12-18',
      duration: 4,
      flow: 'light',
      symptoms: ['Mild cramps'],
    },
    {
      id: '3',
      date: '2023-11-20',
      duration: 6,
      flow: 'heavy',
      symptoms: ['Cramps', 'Headache', 'Fatigue'],
    },
  ],
};

