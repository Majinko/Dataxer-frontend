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
  sumPriceNetto: number;
  sumPriceBrutto: number;
  sumTimeProfitUser: number;
  user: UserOverviewProfit[];
}
