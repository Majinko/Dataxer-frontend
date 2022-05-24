import {CategoryItemNode} from './category-item-node';
import {Contact} from './contact';
import {CustomFile} from './customFile';
import {IItem} from '../interface/IItem';

export class Item implements IItem {
  id: number;
  title: string;
  type?: string;
  description?: string;
  manufacturer?: string;
  previewUrl?: string;
  web?: string;
  unit?: string;
  code?: string;
  dimensions?: string;
  priceLevel?: string;
  model?: string;
  series?: string;
  color?: string;
  material?: string;
  needMontage?: boolean;
  file?: any;
  category?: CategoryItemNode;
  itemPrice?: ItemPrice;
  itemPrices?: ItemPrice[];
  supplier?: Contact;
  files?: CustomFile[];
}

export class ItemPrice {
  wholesalePrice?: number;
  wholesaleTax?: number;
  wholesalePriceTax?: number;
  surcharge?: number;
  price?: number;
  tax?: number;
  priceTax?: number;
  marge?: number;
}

export class DocumentItem {
  id: number;
  item?: Item;
  name: string;
  qty: number;
  unit: string;
  price: number;
  tax: number;
  totalPrice: number;
}
