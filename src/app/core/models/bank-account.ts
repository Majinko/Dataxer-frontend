export interface BankAccount{
  id: number;
  bankCode: number;
  accountNumber: number;
  bankName: string;
  currency: string;
  iban: string;
  swift: string;
  isDefault: boolean;
}
