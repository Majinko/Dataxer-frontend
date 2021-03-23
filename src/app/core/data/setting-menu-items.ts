import {MenuItem} from '../models/menu-item';

export const SettingMenuItems: MenuItem[] = [
  {
    routerLink: ['/setting/user/all'],
    title: 'Používatelia',
    icon: 'groups',
  },
  {
    routerLink: ['/setting/role'],
    title: 'Role',
    icon: 'admin_panel_settings',
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
  },
  {
    routerLink: ['/setting/bank-account'],
    title: 'Bankové účty',
    icon: 'account_balance_wallet',
  }
];
