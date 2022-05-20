import {Item} from './item';
import {CategoryItemNode} from './category-item-node';
import {Contact} from './contact';

export class Pack {
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
  item?: Pack;
  demandItem: Item; // this is item from demand in pack
}

export class PackItem {
  id: any;
  item: Item;
  title: string;
  unit?: string;
  qty: number;
  discount?: number;
  price?: number;
  tax?: number;
  totalPrice?: number;
  totalPriceRoundThreeDigits?: number;
  category?: CategoryItemNode;
  packBudget?: PackBudgetItem;
  contacts?: Contact[];
  project?: any;
  checked?: boolean;
}

export class DemandPackItem extends PackItem {
  packs?: Pack[];
  totalPrice: number;
}

export class PackBudgetItem {
  paymentPrice?: number;
  dueAtDays: number;
  totalPrice: number;
  paymentDate: Date;
  state?: string;
}
