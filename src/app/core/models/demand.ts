import {DocumentBase} from './documentBase';
import {OfferType} from '../enums/offerType.enum';


export class Demand extends DocumentBase {
  state: OfferType;
}
