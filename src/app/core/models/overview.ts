export interface UserMonthlyOverview {
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl: string;
  totalUserHours: string;
  totalUserPrice: number;
  activeHourPrice: number;
  userHours: { key: number, value: string }[];
}

export interface UserYearlyOverview {
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl: string;
  yearHours: { key: number, value: string }[];
}

export interface CategoryCostsOverview {
  categoryMonthsCostsDTOS: CategoryMonthsCosts[];
  monthsTotalCosts: { key: number, value: number }[];
  totalCosts: number;
}

export interface CategoryMonthsCosts {
  categoryId: number;
  categoryParentId: number;
  categoryName: string;
  categoryDepth: number;
  totalMonthsCosts: { key: number, value: number }[];
  categoryTotalPrice: number;
  documentType: string;
  hasChildren: boolean;
  cssClass: string;
  isOpen: boolean | true;
  children?: CategoryMonthsCosts[];
}
