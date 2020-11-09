import {CostState, CostType} from "../models/cost";

export const COSTTYPES: CostType[] = [
  {
    key: 'invoice',
    value: 'Faktúra'
  }
]

export const COSTSTATES: CostState[] = [
  {
    key: 'payed',
    value: 'Uhradený'
  },
  {
    key: 'unpaid',
    value: 'Neuhradený'
  },
  {
    key: 'overdue',
    value: 'Po splatnosti'
  }
]
