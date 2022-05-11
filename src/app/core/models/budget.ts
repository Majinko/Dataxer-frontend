import {Project} from './project';

export interface Budget {
  id: number;
  project: Project;
}

export interface BudgetOverview {
  categoryId: number;
  categoryTitle: string;
  budgetPacksOverview: BudgetPackOverview[];
}

export interface BudgetPackOverview {
  title: string;
  price: number;
  totalPrice: number;
  customPrice: boolean;
  budgetPackItemsOverview: BudgetPackItemOverview[];
}

export interface BudgetPackItemOverview {
  title: string;
  unit: string;

  price: number;
  tax: number;
  qty: number;
  discount: number;
  totalPrice: number;
}
