import {Company} from './company';
import {Project} from './project';
import {Contact} from './contact';
import {Pack} from './pack';
import {User} from './user';
import {BankAccount} from './bank-account';

export class DocumentBase {
  id: number;
  title: string;
  subject: string;
  number: string;
  note: string;

  createdDate: Date;
  deliveredDate: Date;
  dueDate: Date;

  discount: number;
  price: number;
  totalPrice: number;

  company: Company;
  project: Project;
  contact: Contact;
  packs: Pack[];

  documentData: {
    user: User;
    firm: Company;
    contact: Contact;
    bankAccount: BankAccount;
  };
}
