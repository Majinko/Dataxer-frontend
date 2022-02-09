import {OfferType} from '../enums/offerType.enum';
import {User} from './user';
import {Contact} from './contact';
import {Pack} from './pack';
import {Project} from './project';
import {Company} from './company';
import {BankAccount} from './bank-account';
import {DocumentBase} from './documentBase';

export class PriceOffer extends DocumentBase {
  state: OfferType;
}

export enum PriceOfferState {
  pending = 'Čakajúca'
}
