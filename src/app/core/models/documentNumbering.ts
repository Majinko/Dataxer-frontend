import {Company} from './company';

export interface DocumentNumbering {
  id: number;
  title: string;
  type: string;
  company: Company;
  format: string;
  period: string;
  isDefault: boolean;
}

export enum DocumentNumberingType {
  INVOICE = 'Faktura'
}
