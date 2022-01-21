import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

export class PaginateClassData {
  destroyMsg: string = 'Položka bola odstránená';
  pageSize: number = 15;
  pageIndex: number = 0;
  totalElements: number;
  totalPrice: number;
  isLoadingResults: boolean = false;
  paginateFinish = new Subject<boolean>();
  paginator: MatPaginator;
}
