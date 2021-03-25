import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CostService} from '../../../../../../core/services/cost.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Cost} from '../../../../../../core/models/cost';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent implements OnInit, AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  costs: Cost[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    'title',
    'project',
    'client',
    'category',
    'number',
    'createdDate',
    'deliveredDate',
    'dueDate',
    'state',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private costService: CostService,
    private messageService: MessageService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paginate();
  }

  public paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.costService.paginate(
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
      .subscribe((data) => (this.costs = data));
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    this.costService.destroy(id).subscribe(() => {
      this.totalElements -= 1;
      this.costs = this.costs.filter(c => c.id !== id);

      this.messageService.add('Náklad bol odstránení');
    });

    return;
  }

  showCost(cost: Cost) {
    this.router.navigate(['/cost/show', cost.id]).then();
  }

  editCost(id: number) {
    this.router.navigate(['/cost/edit', id]).then();
  }
}
