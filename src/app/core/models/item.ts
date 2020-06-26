import {CategoryItemNode} from './category-item-node';
import {Contact} from './contact';

export interface Item {
  id: number;
  title: string;
  type?: string;
  shortDescription?: string;
  description?: string;
  manufacturer?: string;
  web?: string;
  unit?: string;
  code?: string;
  dimensions?: string;
  priceLevel?: string;
  model?: string;
  series?:string;
  color?: string;
  material?: string;
  isPartOfSet?: boolean;
  needMontage?: boolean;
  itemPrice?: ItemPrice;
  categories?: CategoryItemNode;
  supplier?: Contact;
}


export interface ItemPrice {
  wholesalePrice?: number;
  wholesaleTax?: number;
  wholesalePriceTax?: number;
  surcharge?: number;
  price?: number;
  tax?: number;
  priceTax?: number;
  marge?: number;
}
