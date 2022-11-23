import {OfferType} from '../enums/offerType.enum';
import {DocumentBase} from './documentBase';
import {CategoryItemNode} from './category-item-node';

export class PriceOffer extends DocumentBase {
  state: OfferType;
  category: CategoryItemNode;
}
