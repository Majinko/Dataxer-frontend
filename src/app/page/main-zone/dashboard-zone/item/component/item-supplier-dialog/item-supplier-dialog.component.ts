import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AppPaginate} from '../../../../../../core/class/AppPaginate';
import {Cost} from '../../../../../../core/models/cost';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {GodButtonService} from '../../../../../../core/services/god-button.service';
import {CostService} from '../../../../../../core/services/cost.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {FilterService} from '../../../../../../core/store/service/filter.service';

@Component({
  selector: 'app-item-supplier-dialog',
  templateUrl: './item-supplier-dialog.component.html',
  styleUrls: ['./item-supplier-dialog.component.scss']
})
export class ItemSupplierDialogComponent extends AppPaginate<Cost> implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'project', 'client', 'number', 'createdDate', 'deliveredDate', 'dueDate', 'state', 'price'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected costService: CostService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(costService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.costService.rsqlFilter = `(cost.contractor.id==${this.dialogData.element.contractor.id})`;
    this.paginate();
  }

  showCost(cost: Cost) {
    this.router.navigate(['/cost/show', cost.id]).then();
  }
}
