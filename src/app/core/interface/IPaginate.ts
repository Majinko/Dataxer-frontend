import {Paginate, PaginateOption} from '../models/paginate';
import {Observable} from 'rxjs';
import {DocumentFilter} from '../models/filters/document-filter';

export interface IPaginate<T> {
  filter: DocumentFilter;
  paginate(index: number, size: number): Observable<Paginate<T>>;
}
