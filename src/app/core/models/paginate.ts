export interface Paginate<T> {
  content: T[];
  totalPrice: number;
  totalElements: number;
  empty: boolean;
}

export class PaginateOption {
  pageIndex: number | 0;
  pageSize: number | 15;
}
