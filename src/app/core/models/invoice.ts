import {User} from "./user";
import {Contact} from "./contact";
import {Pack} from "./pack";
import {InvoiceTypeEnum} from "../enums/invoiceType.enum";

export interface Invoice {
  id: number;
  title: string;
  subject: string;
  number: string;
  variable_symbol: string;
  constant_symbol: string;
  specific_symbol: string;
  state: InvoiceTypeEnum;
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
