import {Company} from './company';

export interface BillingInformation {
  id?: number;
  company?: Company;
  street: string;
  city: string;
  country: string;
  postalCode: number;
}
