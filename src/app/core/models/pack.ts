import {Item} from './item';

export interface Pack {
  id: number;
  title: string;
  customPrice?: boolean;
  packItems: PackItem[];
  price?: number;
  tax?: number;
  totalPrice?: number;
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
}
