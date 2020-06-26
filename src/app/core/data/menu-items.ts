import {MenuItem} from '../models/menu-item';

export const MenuItems: MenuItem[] = [
  {
    routerLink: ['/contact'],
    title: 'Kontakty',
    icon: 'person',
  },
  {
    routerLink: ['/price-offer'],
    title: 'Kalkulácie',
    icon: 'account_balance',
  },
  {

    routerLink: ['/time'],
    title: 'Čas',
    icon: 'timer',
  },
  {
    routerLink: ['/item'],
    title: 'Položky',
    icon: 'extension',
  },
  {
    routerLink: ['/pack'],
    title: 'Sady položiek',
    icon: 'apps',
  }
];
