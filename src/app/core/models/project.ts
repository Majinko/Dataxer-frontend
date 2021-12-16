import {Contact} from './contact';
import {User, UserOverviewPrice} from './user';
import {CategoryItemNode} from './category-item-node';

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
