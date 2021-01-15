import {Contact} from './contact';
import {User} from './user';
import {CategoryItemNode} from './category-item-node';
import {Project} from './project';
import {CustomFile} from './customFile';

export interface Cost {
  id: number;
  contact: Contact;
  user: User;
  project: Project;
  title: string;
  number: string;
  variableSymbol: string;
  constantSymbol: string;
  costOrder: string;
  note: string;
  state: string;
  type: string;
  period: string;
  price: number;
  tax: number;
  totalPrice: number;
  dueAtDays: number;
  category: CategoryItemNode;
  isInternal: boolean;
  isRepeated: boolean;
  isPaid: boolean;
  repeatedFrom: Date;
  repeatedTo: Date;
  deliveredDate: Date;
  taxableSupply: Date;
  nextRepeatedCost: Date;
  createdDate: Date;
  dueDate: Date;
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
