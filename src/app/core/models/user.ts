import {Salary} from './salary';
import {Role} from './role';
import {Company} from './company';

export interface User {
  id?: number;
  uid: string;
  position?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoUrl?: string;
  appKey?: string;
  email: string;
  token?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  isDisabled?: boolean;
  roles?: Role[];
  companies?: Company[];
}

export interface UserInit {
  user: User;
  salary: Salary;
}

export interface UserOverviewPrice {
  name: string;
  hours: number;
  hourNetto: number;
  hourBrutto: number;
  priceNetto: number;
  priceBrutto: number;
}

export interface UserOverviewProfit extends UserOverviewPrice {
  isCalcProfit: boolean;
  userId: number;
  uid: string;
}
