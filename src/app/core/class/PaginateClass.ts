import {merge, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {IPaginate} from '../interface/IPaginate';
import {MessageService} from '../services/message.service';
import {ConfirmDialogComponent} from '../../theme/component/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {PaginateClassData} from './PaginateClassData';

export class PaginateClass<T> extends PaginateClassData {
  data: T[];

  constructor(
    public messageService: MessageService,
    public service: IPaginate<T>,
    public dialog: MatDialog) {
    super();
  }

  public paginate() {
    merge(
      this.paginator.page
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          setTimeout(() => {
            this.isLoadingResults = true;
          }, 1);

          return this.service.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          setTimeout(() => {
            this.isLoadingResults = false;
          }, 1);

          this.totalPrice = data.totalPrice ?? 0;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => {

        this.data = data;
        this.paginateFinish.next(true);
      });
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.service.destroy(id).subscribe((r) => {
          this.paginate();

          this.messageService.add(this.destroyMsg);
        });
      }
    });
  }

  filterData(data: any) {
    this.service.filter = data.documentFilter;
    this.service.rsqlFilter = data.rsqlFilter;

    this.paginate();
  }
}
