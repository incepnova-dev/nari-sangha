import { icons } from '../styles';
import { ROUTES, RouteName } from '../components/routes/Routes';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: RouteName;
  onPress?: () => void;
}

export const mockMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: icons.home,
    route: ROUTES.HOME_LANDING,
  },
  {
    id: 'products',
    label: 'Products',
    icon: icons.products,
    route: ROUTES.PRODUCTS_OPTION,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: icons.profile,
    route: ROUTES.PROFILE,
  },
  {
    id: 'about',
    label: 'About Us',
    icon: icons.about,
    route: ROUTES.ABOUT_US,
  },
];

