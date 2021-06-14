import {Paginate, PaginateOption} from '../models/paginate';
import {Observable} from 'rxjs';
import {DocumentFilter} from '../models/filters/document-filter';
import {BaseFilter} from '../models/filters/baseFilter';

export interface IPaginate<T> {
  filter: BaseFilter;
  paginate(index: number, size: number): Observable<Paginate<T>>;
}
