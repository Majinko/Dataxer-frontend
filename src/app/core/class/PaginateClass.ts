import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {IPaginate} from '../interface/IPaginate';
import {DocumentFilter} from '../models/filters/document-filter';
import {MessageService} from '../services/message.service';
import {ConfirmDialogComponent} from '../../theme/component/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

export class PaginateClass<T> {
  destroyMsg: string = 'Položka bola odstránená';
  pageSize: number = 15;
  pageIndex: number = 0;
  totalElements: number;
  isLoadingResults: boolean;
  data: T[];

  paginator: MatPaginator;

  constructor(
    public messageService: MessageService,
    public service: IPaginate<T>,
    public dialog: MatDialog) {
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

  filtering(event: DocumentFilter) {
    this.service.filter = event;

    this.paginate();
  }
}
