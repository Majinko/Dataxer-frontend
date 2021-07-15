export interface Paginate<T> {
  content: T[];
  totalElements: number;
}

export class PaginateOption {
  pageIndex: number | 0;
  pageSize: number | 15;
}
