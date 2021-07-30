import {BillingInformation} from './billing-information';

export interface Company {
  id: number;
  billingInformation?: BillingInformation[];
  companyTaxType: string;
  name: string;
  legalForm: string;
  street: string;
  city: string;
  postalCode: number;
  country: string;
  email: string;
  phone: string;
  web: string;
  cin: string;
  tin: string;
  vatin: string;
  iban: string;
  defaultCompany: boolean;
  logoUrl: string;
  signatureUrl: string;
  isTaxPayer: boolean;
}
