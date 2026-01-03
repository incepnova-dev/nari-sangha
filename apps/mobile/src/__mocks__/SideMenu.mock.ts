import { icons } from '../styles';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  onPress?: () => void;
}

export const mockMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: icons.home,
    route: 'HomeLanding',
  },
  {
    id: 'products',
    label: 'Products',
    icon: icons.products,
    route: 'ProductsOption',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: icons.profile,
    route: 'Profile',
  },
  {
    id: 'about',
    label: 'About Us',
    icon: icons.about,
    route: 'AboutUs',
  },
];

