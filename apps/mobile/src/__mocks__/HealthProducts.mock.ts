export interface Product {
  icon: string;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount?: string;
  platforms: string[];
}

export const mock: Product[] = [
  {
    icon: '🧴',
    name: 'Prenatal Vitamins',
    brand: 'HealthPlus',
    price: '₹349',
    originalPrice: '₹499',
    discount: '30% OFF',
    platforms: ['🛒 Amazon', '💊 1mg'],
  },
  {
    icon: '🩺',
    name: 'Menstrual Pain Relief',
    brand: 'WellnessRx',
    price: '₹225',
    originalPrice: '₹300',
    discount: '25% OFF',
    platforms: ['📦 Flipkart', '💊 Netmeds'],
  },
  {
    icon: '🧘‍♀️',
    name: 'Yoga Mat Premium',
    brand: 'FitLife',
    price: '₹799',
    originalPrice: '₹999',
    platforms: ['🛒 Amazon', '🏃 Decathlon'],
  },
  {
    icon: '💊',
    name: 'Iron Supplements',
    brand: 'NutriCare',
    price: '₹299',
    originalPrice: '₹499',
    discount: '40% OFF',
    platforms: ['💊 PharmEasy', '💊 Apollo'],
  },
];

