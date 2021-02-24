import {OfferType} from '../enums/offerType.enum';
import {User} from './user';
import {Contact} from './contact';
import {Pack} from './pack';
import {Project} from './project';
import {Company} from './company';
import {BankAccount} from './bank-account';

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
    user: User,
    firm: Company;
    contact: Contact;
    bankAccount: BankAccount;
  };
  price: number;
  totalPrice: number;
  discount: number;
  project: Project;
  contact: Contact;
  packs: Pack[];
}

export enum PriceOfferState {
  pending = 'Čakajúca'
}
