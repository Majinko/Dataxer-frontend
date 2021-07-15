import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  filterValue: string = '';
  showBar: boolean = true;

  appSearch = new Subject<string>();

  constructor() {
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue;

    this.appSearch.next(filterValue);
  }
}
