import { Item } from './item';

export interface DocumentItem {
    id: number;
    item?: Item;
    name: string;
    qty: number;
    unit: string;
    price: number;
    tax: number;
    totalPrice: number;
}

export interface DemandItem {
  id: number;
  item?: Item;
  title: string;
  qty: number;
  unit: string;
  price: number;
  tax: number;
  totalPrice: number;
}
