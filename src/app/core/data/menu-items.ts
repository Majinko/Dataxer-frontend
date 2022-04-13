import {MenuItem} from '../models/menu-item';

export const MenuItems: MenuItem[] = [
  {
    routerLink: ['/paginate/contacts'],
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
/* {
    routerLink: ['/document/demand'],
    title: 'Dopyty',
    icon: 'request_quote',
    permission: 'Demand'
  },*/
  {
    routerLink: ['/paginate/projects'],
    title: 'Zákazky',
    icon: 'layers',
    permission: 'Project'
  },
  {
    routerLink: ['/paginate/priceOffers'],
    title: 'Cenové ponuky',
    icon: 'account_balance',
    permission: 'Document'
  },
  {
    routerLink: ['/paginate/invoices'],
    title: 'Fakturácia',
    icon: 'description',
    permission: 'Document'
  },
  {
    routerLink: ['/paginate/costs'],
    title: 'Náklady',
    icon: 'equalizer',
    permission: 'Cost'
  },
  {
    routerLink: ['/paginate/time'],
    title: 'Čas',
    icon: 'timer',
    permission: 'Time'
  },
  {
    routerLink: ['/paginate/items'],
    title: 'Položky',
    icon: 'extension',
    permission: 'Item'
  },
  {
    routerLink: ['/paginate/packs'],
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
