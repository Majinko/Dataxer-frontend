export interface DocumentNumbering {
  id: number;
  title: string;
  type: string;
  format: string;
  period: string;
  isDefault: boolean
}

export enum DocumentNumberingType{
  INVOICE = 'Faktura'
}
