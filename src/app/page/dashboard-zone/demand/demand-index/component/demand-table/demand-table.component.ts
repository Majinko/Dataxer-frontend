import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DemandService} from '../../../../../../core/services/demand.service';
import {Demand} from '../../../../../../core/models/demand';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../../../core/services/message.service';

@Component({
  selector: 'app-demand-table',
  templateUrl: './demand-table.component.html',
  styleUrls: ['./demand-table.component.scss']
})
export class DemandTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  demands: Demand[] = [];
  isLoadingResults = true;

  displayedColumns: string[] = [
    'title',
    'contact',
    'state',
    'source',
    'actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private demandService: DemandService,
    private messageService: MessageService
  ) {
  }

  ngAfterViewInit() {
    this.paginate();
  }

  paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.demandService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.demands = data));
  }

  destroy(id: number) {
    return this.demandService.destroy(id).subscribe(d => {
      this.messageService.add('Dopyt bol zmazaný');

      this.demands = this.demands.filter(demand => demand.id !== id);
      this.totalElements = this.demands.length;
    });
  }
}
