import {Contact} from './contact';
import {User, UserOverviewPrice, UserOverviewProfit} from './user';
import {CategoryItemNode} from './category-item-node';
import {DocumentBase} from './documentBase';

export interface Project {
  id: number;
  description: string;
  title: string;
  number: string;
  state: string;
  address: string;
  area: number;
  projectProfit: number;
  fullTitle?: string;
  group?: string;
  startedAt: Date;
  finishedAt: Date;
  color?: string;
  isProjectFinish?: boolean;

  payedInvoices: number;
  notPayedInvoices: number;
  payedCosts: number;
  notPayedCosts: number;
  manHours: number;
  priceBrutto: number;
  monthsDuration: number;
  profit: number;
  manHoursProfit: number;
  profitSurcharge: number;

  demand?: DocumentBase;
  contact: Contact;
  user: User;
  categories: CategoryItemNode[];
}

export interface ProjectEvaluation {
  categoryId: number;
  categoryName: string;
  categoryTimeSum: number;
  userTimePriceOverviewList: UserOverviewPrice[];
}

export interface ProjectManHours {
  sumPriceNetto: number;
  sumPriceBrutto: number;
  userTimePriceOverviewList: UserOverviewPrice[];
}

export interface ProjectProfit {
  title: string;
  marge: number; // Zisk z obratu (marža):
  sumPriceNetto: number;
  sumPriceBrutto: number;
  sumTimeProfitUser: number;
  profit: number;
  coefficient: number;
  profitPercent: number;
  isFinish: boolean;
  user: UserOverviewProfit[];
}
