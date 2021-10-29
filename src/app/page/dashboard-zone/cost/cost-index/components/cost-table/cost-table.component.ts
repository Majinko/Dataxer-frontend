import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CostService} from '../../../../../../core/services/cost.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {Cost} from '../../../../../../core/models/cost';
import {Router} from '@angular/router';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';
import {sum} from '../../../../../../../helper';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent extends PaginateClass<Cost> implements AfterViewInit {
  totalPrice: number = 0;
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
    'price',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public costService: CostService,
    public messageService: MessageService,
    public router: Router,
    public dialog: MatDialog
  ) {
    super(messageService, costService, dialog);
  }

  ngAfterViewInit(): void {
    this.paginateFinish.subscribe((value) => {
      if (value === true) {
        this.totalPrice = sum(this.data, 'price');
      }
    });
  }

  showCost(cost: Cost) {
    this.router.navigate(['/cost/show', cost.id]).then();
  }

  editCost(id: number) {
    this.router.navigate(['/cost/edit', id]).then();
  }

  getCostPrice() {
    console.log(this.data);
    return;
  }
}
