import {Item} from './item';
import {CategoryItemNode} from './category-item-node';
import {Contact} from './contact';

export interface Pack {
  id: number;
  title: string;
  customPrice?: boolean;
  showItems?: boolean;
  price?: number;
  tax?: number;
  totalPrice?: number;
  packItems: PackItem[];
  demandPacks?: any;
  contacts?: Contact[];
  allComplete?: boolean;
  totalCheck?: number;
  checked?: boolean;
  indeterminate?: boolean;
  itemId?: number;
  item?: Pack; // from demand item
}

export interface PackItem {
  id: any;
  item: Item;
  title: string;
  unit?: string;
  qty: number;
  discount?: number;
  price?: number;
  tax?: number;
  totalPrice?: number;
  category?: CategoryItemNode;
  packBudget?: PackBudgetItem;
  contacts?: Contact[];
  checked?: boolean;
}
export interface PackBudgetItem {
  paymentPrice?: number;
  dueAtDays: number;
  totalPrice: number;
  paymentDate: Date;
  state?: string;
  sumPayments?: number;
}
