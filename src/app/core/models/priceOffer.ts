import {OfferType} from '../enums/offerType.enum';
import {User} from './user';
import {Contact} from './contact';
import {Pack} from "./pack";

export interface PriceOffer {
  id: number;
  title: string;
  subject: string;
  number: string;
  state: OfferType;
  createdDate: Date;
  deliveredDate: Date;
  dueDate: Date;
  note: string;
  documentData: {
    user: User
  };
  price: number;
  totalPrice: number;
  contact: Contact;
  packs: Pack[]
}

export enum PriceOfferState {
  pending = 'Čakajúca'
}
