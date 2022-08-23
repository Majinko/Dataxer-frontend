import {Project} from './project';
import {Item} from './item';

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
  supplierPrice: number;
  profitPrice: number;
  budgetPackItemsOverview: BudgetPackItemOverview[];
  allComplete?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

export interface BudgetPackItemOverview {
  title: string;
  unit: string;
  marge: number;
  price: number;
  tax: number;
  qty: number;
  discount: number;
  totalPrice: number;
  profitPrice: number;
  item?: Item;
  checked?: boolean;
}

