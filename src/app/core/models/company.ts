import {BillingInformation} from './billing-information';

export interface Company {
  id: number;
  billingInformation?: BillingInformation[];
  name: string;
  legalForm: string;
  street: string;
  city: string;
  postalCode: number;
  country: string;
  email: string;
  phone: string;
  web: string;
  identifyingNumber: string;
  vat: string;
  netOfVat: string;
  iban: string;
}
