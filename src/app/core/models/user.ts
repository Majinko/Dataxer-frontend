import {Salary} from './salary';
import {Role} from './role';

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
  roles?: Role[];
}

export interface UserInit {
  user: User;
  salary: Salary;
}
