import {CostState, CostType} from '../models/cost';

export const COSTTYPES: CostType[] = [
  {
    key: 'INVOICE',
    value: 'Faktúra'
  },
];

export const COSTSTATES: CostState[] = [
  {
    key: 'PAYED',
    value: 'Uhradený'
  },
  {
    key: 'UNPAID',
    value: 'Neuhradený'
  },
  {
    key: 'OVERDUE',
    value: 'Po splatnosti'
  }
];
