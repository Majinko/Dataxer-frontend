import {Company} from './company';

export interface DocumentNumbering {
  id: number;
  title: string;
  type: string;
  format: string;
  period: string;
  isDefault: boolean;
  company: Company;
}

export enum DocumentNumberingType{
  INVOICE = 'Faktura'
}
