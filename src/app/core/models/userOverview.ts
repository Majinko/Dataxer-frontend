import {Salary} from './salary';
import {Role} from './role';

export interface UserOverview {
  id: number;
  uid: string;
  fullName: string;
  startWork: Date;
  endWork: Date;
  projectCount: number;
  sumTime: number;
  years: number;
  salary: Salary;
  roles: Role[];
}
