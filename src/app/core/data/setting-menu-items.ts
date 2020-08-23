import {MenuItem} from '../models/menu-item';

export const SettingMenuItems: MenuItem[] = [
  {
    routerLink: ['/setting/user'],
    title: 'Osobné údaje',
    icon: 'person',
  },
  {
    routerLink: ['/setting/company'],
    title: 'Spoločnosti',
    icon: 'account_balance',
  },
  {
    routerLink: ['/setting/category'],
    title: 'Kategórie',
    icon: 'folder',
  },
  {
    routerLink: ['/setting/numbering'],
    title: 'Číselníky',
    icon: 'point_of_sale',
  }
];
