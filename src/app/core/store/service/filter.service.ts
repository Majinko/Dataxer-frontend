import {Subject} from 'rxjs';
import {Filter} from '../models/filter';
import {Injectable} from '@angular/core';

// todo user filter store next time
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter: Filter;
  doFilter = new Subject<Filter>();
}
