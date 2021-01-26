import {User} from './user';
import {Contact} from './contact';
import {Pack} from './pack';
import {InvoiceTypeEnum} from '../enums/invoiceType.enum';
import {Company} from './company';
import {BankAccount} from './bank-account';

export interface Invoice {
  id: number;
  title: string;
  subject: string;
  number: string;
  variableSymbol: string;
  constantSymbol: string;
  specificSymbol: string;
  state: InvoiceTypeEnum;
  createdDate: Date;
  deliveredDate: Date;
  dueDate: Date;
  note: string;
  documentData: {
    user: User;
    firm: Company;
    contact: Contact;
    bankAccount: BankAccount;
  };
  discount: number;
  price: number;
  totalPrice: number;
  contact: Contact;
  packs: Pack[];
}
