import {DocumentBase} from './documentBase';
import {OfferType} from '../enums/offerType.enum';
import {Contact} from './contact';

export class Demand extends DocumentBase {
  state: OfferType;
  contacts: Contact[];
  internal: boolean;
}
