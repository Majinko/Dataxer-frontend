import {MenuItem} from '../models/menu-item';

export const MenuItems: MenuItem[] = [
  {
    routerLink: ['/contact'],
    title: 'Kontakty',
    icon: 'person',
  },
  {
    routerLink: ['/task'],
    title: 'Úlohy',
    icon: 'work',
  },
  {
    routerLink: ['/demand'],
    title: 'Dopyty',
    icon: 'request_quote',
  },
  {
    routerLink: ['/project'],
    title: 'Zákazky',
    icon: 'layers',
  },
  {
    routerLink: ['/price-offer'],
    title: 'Kalkulácie',
    icon: 'account_balance',
  },
  {
    routerLink: ['/invoice'],
    title: 'Fakturácia',
    icon: 'description',
  },
  {
    routerLink: ['/cost'],
    title: 'Náklady',
    icon: 'equalizer',
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
