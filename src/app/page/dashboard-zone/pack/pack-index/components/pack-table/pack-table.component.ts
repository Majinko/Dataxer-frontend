import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PackService} from "../../../../../../core/services/pack.service";
import {Pack} from "../../../../../../core/models/pack";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessageService} from "../../../../../../core/services/message.service";
import {merge} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-group-table',
  templateUrl: './pack-table.component.html',
  styleUrls: ['./pack-table.component.scss']
})
export class PackTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  packs: Pack[] = []
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'title', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private packService: PackService,
    private messageService: MessageService
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
          return this.packService.paginate(
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
      .subscribe(data => (this.packs = data));
  }

  destroy(pack: Pack) {
    this.packService.destroy(pack.id).subscribe(r => {
      this.paginate();

      this.messageService.add("Pack was delete");
    })
  }
}
