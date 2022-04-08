import {Subject} from 'rxjs';
import {Filter} from '../models/filter';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  doPaginate = new Subject<string>();
  filterSubject = new Subject<Filter>();
}
