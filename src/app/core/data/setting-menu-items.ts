import {MenuItem} from '../models/menu-item';

export const SettingMenuItems: MenuItem[] = [
  {
    routerLink: ['/setting/role'],
    title: 'Role',
    icon: 'admin_panel_settings',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/user/all'],
    title: 'Používatelia',
    icon: 'groups',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/company'],
    title: 'Spoločnosti',
    icon: 'account_balance',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/category'],
    title: 'Kategórie',
    icon: 'folder',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/numbering'],
    title: 'Číselníky',
    icon: 'point_of_sale',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/bank-account'],
    title: 'Bankové účty',
    icon: 'account_balance_wallet',
    permission: 'Settings'
  }
];
