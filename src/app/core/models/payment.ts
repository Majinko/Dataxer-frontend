export interface Payment {
  id: number;
  documentId: number;
  documentType: string;
  payedValue: number;
  paymentMethod: string;
  taxDocumentCreated: boolean;
  payedDate: Date;
}
