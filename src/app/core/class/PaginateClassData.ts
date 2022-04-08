import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

export class PaginateClassData {
  pageSize: number = 15;
  pageIndex: number = 0;
  totalElements: number;
  totalPrice: number;
  isLoadingResults: boolean = false;
  paginateFinish = new Subject<boolean>();
  paginator: MatPaginator;
  destroyMsg: string = 'Položka bola odstránená';
}
