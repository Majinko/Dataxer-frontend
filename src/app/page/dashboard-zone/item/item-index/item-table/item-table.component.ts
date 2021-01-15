import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ItemService} from '../../../../../core/services/item.service';
import {Item} from '../../../../../core/models/item';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../../core/services/message.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {UploadHelper} from '../../../../../core/class/UploadHelper';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
  providers: [UploadHelper]
})
export class ItemTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  items: Item[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'title', 'manufacturer', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private storageService: StorageService,
    private itemService: ItemService,
    private messageService: MessageService,
    public uploadHelper: UploadHelper,
  ) {
  }

  ngAfterViewInit() {
    this.paginate();
  }

  paginate() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.paginator.page,
      this.sort.sortChange,
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.itemService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe(data => {
        this.items = data;
      });
  }


  destroy(item: Item) {
    this.itemService.destroy(item.id).subscribe(r => {
      this.paginate();

      this.messageService.add('Item was delete');
    });
  }
}
