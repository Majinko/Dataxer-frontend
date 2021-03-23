export interface UserMonthlyOverview {
  firstName: string;
  lastName: string;
  fullName: string;
  totalUserHours: string;
  totalUserPrice: number;
  activeHourPrice: number;
  userHours: { key: number, value: string }[];
}

export interface UserYearlyOverview {
  firstName: string;
  lastName: string;
  fullName: string;
  yearHours: { key: number, value: string }[];
}

export interface CategoryCostsOverview {
  categoryMonthsCostsDTOS: CategoryMonthsCosts[];
  monthsTotalCosts: { key: number, value: number }[];
  totalCosts: number;
}

export interface CategoryMonthsCosts {
  categoryName: string;
  totalMonthsCosts: { key: number, value: number }[];
  categoryTotalPrice: number;
}
