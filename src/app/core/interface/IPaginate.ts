import {Paginate} from '../models/paginate';
import {Observable} from 'rxjs';
import {BaseFilter} from '../models/filters/baseFilter';

export interface IPaginate<T> {
  rsqlFilter?: string;
  pageIndex?: number;
  pageSize?: number;

  destroy(id: number): Observable<void>;

  paginate(index: number, size: number): Observable<Paginate<T>>;
}
