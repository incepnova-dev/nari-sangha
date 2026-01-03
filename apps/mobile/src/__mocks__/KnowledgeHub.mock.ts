export interface Disease {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  symptoms: string[];
  prevalence: string;
}

export const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Polycystic Ovary Syndrome (PCOS)',
    icon: '🩺',
    category: 'Hormonal Disorders',
    description: 'A hormonal disorder causing enlarged ovaries with small cysts. Affects 1 in 10 women of childbearing age.',
    symptoms: ['Irregular periods', 'Excess hair growth', 'Weight gain', 'Acne'],
    prevalence: 'Common',
  },
  {
    id: '2',
    name: 'Endometriosis',
    icon: '🎀',
    category: 'Reproductive Health',
    description: 'Tissue similar to uterine lining grows outside the uterus, causing pain and fertility issues.',
    symptoms: ['Pelvic pain', 'Painful periods', 'Heavy bleeding', 'Infertility'],
    prevalence: 'Moderate',
  },
  {
    id: '3',
    name: 'Breast Cancer',
    icon: '💗',
    category: 'Oncology',
    description: 'Cancer that forms in breast cells. Early detection through regular screening significantly improves outcomes.',
    symptoms: ['Breast lump', 'Nipple discharge', 'Skin changes', 'Breast pain'],
    prevalence: 'Common',
  },
  {
    id: '4',
    name: 'Osteoporosis',
    icon: '🦴',
    category: 'Bone Health',
    description: 'A condition where bones become weak and brittle, more common in postmenopausal women.',
    symptoms: ['Bone fractures', 'Loss of height', 'Back pain', 'Stooped posture'],
    prevalence: 'Common',
  },
];

