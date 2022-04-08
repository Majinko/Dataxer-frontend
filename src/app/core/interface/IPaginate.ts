import {Paginate} from '../models/paginate';
import {Observable} from 'rxjs';
import {BaseFilter} from '../models/filters/baseFilter';

export interface IPaginate<T> {
  filter: BaseFilter;
  rsqlFilter?: string;
  pageIndex?: number;
  pageSize?: number;

  destroy(id: number): Observable<void>;

  paginate(index: number, size: number, rsqlFilter?: string): Observable<Paginate<T>>;
}
