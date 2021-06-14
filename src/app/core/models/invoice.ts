import {User} from './user';
import {Contact} from './contact';
import {Pack} from './pack';
import {Company} from './company';
import {BankAccount} from './bank-account';
import {Project} from './project';
import {DocumentBase} from './documentBase';

export interface Invoice extends DocumentBase{
  title: string;
  subject: string;
  number: string;
  variableSymbol: string;
  constantSymbol: string;
  specificSymbol: string;
  note: string;
  documentType: string;
  createdDate: Date;
  deliveredDate: Date;
  dueDate: Date;
  paymentDate: Date;
  documentData: {
    user: User;
    firm: Company;
    contact: Contact;
    bankAccount: BankAccount;
  };
  discount: number;
  price: number;
  totalPrice: number;
  dueAtDays: number;
  contact: Contact;
  project: Project;
  packs: Pack[];
}
