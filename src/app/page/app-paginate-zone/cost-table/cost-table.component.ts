import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CostService} from '../../../core/services/cost.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../core/services/message.service';
import {Cost} from '../../../core/models/cost';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  PaymentDialogComponent
} from '../../../theme/component/payments/components/payment-dialog/payment-dialog.component';
import {AppPaginate} from '../../../core/class/AppPaginate';
import {Subscription} from 'rxjs';
import {GodButtonService} from '../../../core/services/god-button.service';
import {FilterService} from '../../../core/store/service/filter.service';
import {PaymentService} from '../../../core/services/payment.service';
import {CompanyService} from '../../../core/services/company.service';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent extends AppPaginate<Cost> implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private companyService: CompanyService,
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
    this.prepareColumns();
  }

  ngAfterViewInit(): void {
    this.paymentService.newPayment.subscribe(() => {
      this.paginate();
    });
  }

  prepareColumns() {
    this.companyService.all().subscribe(c => {
      this.displayedColumns = [
        'title', 'project', 'client', 'category', 'number', 'createdDate', 'deliveredDate', 'dueDate', 'state', 'price', 'actions'
      ];

      // ak ma pouzivatel viacej ako jednu spolocnost nech vidi z akej spolocnosti je
      if (c.length > 1) {
        this.displayedColumns = ['company'].concat(this.displayedColumns);
      }
    });
  }

  showCost(cost: Cost) {
    this.router.navigate(['/cost/show', cost.id]).then();
  }

  editCost(id: number) {
    this.router.navigate(['/cost/edit', id]).then();
  }

  showPaymentDialog(documentId: number, documentType: string) {
    this.dialog.open(PaymentDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        documentId,
        documentType
      }
    });
  }
}
