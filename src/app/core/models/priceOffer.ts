import {OfferType} from '../enums/offerType.enum';
import {DocumentBase} from './documentBase';

export class PriceOffer extends DocumentBase {
  state: OfferType;
}
