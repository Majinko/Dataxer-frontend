import {MenuItem} from '../models/menu-item';

export const SettingMenuItems: MenuItem[] = [
  {
    routerLink: ['/setting/profile'],
    title: 'Profil',
    icon: 'account_circle',
    permission: 'Settings'
  },
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
    routerLink: ['/setting/category/group/COMPANY'],
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
  },
  {
    routerLink: ['/setting/items'],
    title: 'Položky',
    icon: 'extension',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/mail-template'],
    title: 'Šablóny emailov',
    icon: 'format_paint',
    permission: 'Settings'
  },
  {
    routerLink: ['/setting/document-template'],
    title: 'Šablóny poznámok',
    icon: 'format_paint',
    permission: 'Settings'
  }
];
