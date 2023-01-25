import {AppPaginateData} from './AppPaginateData';
import {IPaginate} from '../interface/IPaginate';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {GodButtonService} from '../services/god-button.service';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../theme/component/confirm-dialog/confirm-dialog.component';
import {MessageService} from '../services/message.service';
import {FilterService} from '../store/service/filter.service';
import {Paginate} from '../models/paginate';

export class AppPaginate<T> extends AppPaginateData<T> {
  constructor(
    protected service: IPaginate<T>,
    protected godButtonService: GodButtonService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected filterService: FilterService
  ) {
    super();
  }

  // init it
  protected init(): void {
    // good button service
    this.godButtonService.menuItem = this.route.snapshot.data.menuItem;
    this.godButtonService.title = this.route.snapshot.data.godButtonTitle;
    this.godButtonService.routerLink = this.route.snapshot.data.gotButtonRouteLink;
  }

  protected callPaginate() {
    setTimeout(() => {
      this.paginate();
    });
  }

  // paginate
  protected paginate() {
    // set page index and page size
    this.setPageAndIndex();

    merge(
      this.paginator.page,
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

          // check data empty a wrong page index
          this.checkPageIndexAndEmptyData(data);

          // store paginate
          this.storePaginate();

          this.price = data.price ?? 0;
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


  // destroy something
  public destroy(event: MouseEvent, id: number): void {
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

  /**
   * Check if page index is not out
   * @param data
   * @private
   */
  private checkPageIndexAndEmptyData(data: Paginate<T>) {
    if (data.empty && this.service.pageIndex > 0) {
      this.service.pageIndex = 0;
      this.paginate();
    }
  }

  /**
   * Set page and page index
   * @private
   */
  private setPageAndIndex() {
    this.paginator.pageSize = this.service.pageSize;
    this.paginator.pageIndex = this.service.pageIndex;
  }

  /**
   * Store paginate to service
   * @private
   */
  private storePaginate() {
    this.service.pageSize = this.paginator.pageSize;
    this.service.pageIndex = this.paginator.pageIndex;
  }
}
