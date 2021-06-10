import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {IPaginate} from '../interface/IPaginate';
import {DocumentFilter} from '../models/filters/document-filter';

export class PaginateClass<T> {
  pageSize: number = 15;
  pageIndex: number = 0;
  totalElements: number;
  isLoadingResults: boolean;
  data: T[];

  paginator: MatPaginator;

  constructor(private service: IPaginate<T>) {
  }

  public paginate() {
    merge(
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  filtering(event: DocumentFilter) {
    this.service.filter = event;

    this.paginate();
  }
}
