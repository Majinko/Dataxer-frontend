import {CostState, CostType} from '../models/cost';

export const COSTTYPES: CostType[] = [
  {
    key: 'INVOICE',
    value: 'Faktúra'
  },
  {
    key: 'BILL',
    value: 'Pokladničný blok'
  },
  {
    key: 'INTERNAL',
    value: 'Interný doklad'
  },
  {
    key: 'CONTRIBUTION',
    value: 'Odvody'
  },
  {
    key: 'RECEIVED_CREDIT_NOTE',
    value: 'Prijatý dobropis'
  },
  {
    key: 'NONDEDUCTIBLE',
    value: 'Nedaňový náklad'
  },
  {
    key: 'OTHER',
    value: 'Iné'
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
