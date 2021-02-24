import {Salary} from './salary';

export interface User {
  id?: number;
  uid: string;
  position?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  appKey?: string;
  email: string;
  token?: string;
  phone?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface UserInit {
  user: User;
  salary: Salary;
}
