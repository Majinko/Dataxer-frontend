import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CostService} from '../../../../core/services/cost.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../core/services/message.service';
import {Cost} from '../../../../core/models/cost';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {
  PaymentDialogComponent
} from '../../../../theme/component/payments/components/payment-dialog/payment-dialog.component';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';
import {PaymentService} from '../../../../core/services/payment.service';
import {CompanyService} from '../../../../core/services/company.service';
import {AppDocumentPaginate} from '../../../../core/class/AppDocumentPaginate';
import {DocumentService} from '../../../../core/services/document.service';
import {Company} from '../../../../core/models/company';

@Component({
  selector: 'app-cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent extends AppDocumentPaginate<Cost> implements OnInit, AfterViewInit, OnDestroy {
  repeatCost: boolean = false;
  displayedColumns: string[] = [];
  companies: Company[] = [];

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
    protected documentService: DocumentService,
  ) {
    super(costService, godButtonService, messageService, dialog, route, filterService, documentService);
  }

  ngOnInit(): void {
    this.prepareColumns();
    this.checkPayments();
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      this.repeatCost = data.rsQlFilter.includes('cost.repeated==TRUE');

      this.displayedColumns = this.repeatCost ? ['title', 'project', 'client', 'price', 'period', 'nextRepeatedCost', 'actions'] : ['title', 'project', 'client', 'number', 'createdDate', 'deliveredDate', 'dueDate', 'state', 'revision', 'price', 'actions'];

      if (this.companies.length > 1) {
        this.displayedColumns = [...['company'], ...this.displayedColumns];
      }

      if (data && data.filteredData) {
        this.costService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  private checkPayments() {
    // check payment store
    this.paymentService.newPayment.subscribe(() => {
      this.paginate();
    });
  }

  private prepareColumns() {
    this.companyService.all().subscribe(c => {
      this.companies = c;

      // ak ma pouzivatel viacej ako jednu spolocnost nech vidi z akej spolocnosti je
      if (c.length > 1) {
        this.displayedColumns = [...['company'], ...this.displayedColumns];
      }
    });
  }
}
