import {MenuItem} from '../models/menu-item';

export const MenuItems: MenuItem[] = [
  {
    routerLink: ['/contact'],
    title: 'Kontakty',
    icon: 'person',
    permission: 'Contact'
  },
  {
    routerLink: ['/task'],
    title: 'Úlohy',
    icon: 'check_circle',
    permission: 'Task'
  },
/*  {
    routerLink: ['/demand'],
    title: 'Dopyty',
    icon: 'request_quote',
    permission: 'Demand'
  },*/
  {
    routerLink: ['/project'],
    title: 'Zákazky',
    icon: 'layers',
    permission: 'Project'
  },
  {
    routerLink: ['/price-offer'],
    title: 'Cenové ponuky',
    icon: 'account_balance',
    permission: 'Document'
  },
  {
    routerLink: ['/invoice'],
    title: 'Fakturácia',
    icon: 'description',
    permission: 'Document'
  },
  {
    routerLink: ['/cost'],
    title: 'Náklady',
    icon: 'equalizer',
    permission: 'Cost'
  },
  {
    routerLink: ['/time'],
    title: 'Čas',
    icon: 'timer',
    permission: 'Time'
  },
  {
    routerLink: ['/item'],
    title: 'Položky',
    icon: 'extension',
    permission: 'Item'
  },
  {
    routerLink: ['/pack'],
    title: 'Sady položiek',
    icon: 'apps',
    permission: 'Pack'
  },
  {
    routerLink: ['/overview'],
    title: 'Prehľady',
    icon: 'show_chart',
    permission: 'Overview'
  }
];
