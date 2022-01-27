import {DocumentBase} from './documentBase';
import {Payment} from './payment';

export interface Invoice extends DocumentBase {
  variableSymbol: string;
  constantSymbol: string;
  specificSymbol: string;
  documentType: string;
  paymentPrice?: number;
  dueAtDays: number;
  paymentDate: Date;
  payments?: Payment[];
}
