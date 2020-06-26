import {Item, ItemPrice} from "./item";

export interface Pack {
  id: number;
  title: string;
  items: PackItem[],
  tax?: number;
  totalPrice?: number
}

export interface PackItem {
  id: any;
  item: Item;
  title: string;
  qty: number;
  price?: number;
  tax?: number;
  totalPrice?: number
}
