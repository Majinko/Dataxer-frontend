import {CategoryItemNode} from './category-item-node';
import {Contact} from './contact';
import {CustomFile} from './customFile';

export interface Item {
  id: number;
  title: string;
  type?: string;
  shortDescription?: string;
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
  isPartOfSet?: boolean;
  needMontage?: boolean;
  file?: any;
  itemPrice?: ItemPrice;
  categories?: CategoryItemNode[];
  supplier?: Contact;
  files?: CustomFile[];
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
