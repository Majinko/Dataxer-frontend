import {User} from './user';
import {CustomFile} from './customFile';
import {DocumentBase} from './documentBase';
import {CategoryItemNode} from './category-item-node';

export interface Cost extends DocumentBase{
  user: User;
  variableSymbol: string;
  constantSymbol: string;
  costOrder: string;
  state: string;
  category?: CategoryItemNode;
  type: string;
  period: string;
  currency: string;
  tax: number;
  dueAtDays: number;
  isInternal: boolean;
  isRepeated: boolean;
  paymentDate: Date;
  repeatedFrom: Date;
  repeatedTo: Date;
  taxableSupply: Date;
  nextRepeatedCost: Date;
  deletedAt: Date;
  files: CustomFile[];
}

export interface CostType {
  key: string;
  value: string;
}

export interface CostState {
  key: string;
  value: string;
}
