import {Item} from './item';
import {CategoryItemNode} from './category-item-node';

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
}
