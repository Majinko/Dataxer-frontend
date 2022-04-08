import {MatPaginator} from '@angular/material/paginator';
import {Subject} from 'rxjs';

export class AppPaginateData<T> {
  data: T[] = [];
  paginator: MatPaginator;
  paginateFinish = new Subject<boolean>();

  pageSize: number = 15;
  totalPrice: number = 0;
  totalElements: number = 0;

  isLoadingResults: boolean = false;

  rsqlFilter: string = null;
  destroyMsg: string = 'Položka bola odstránená';
}
