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
