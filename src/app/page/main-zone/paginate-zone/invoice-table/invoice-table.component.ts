import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../core/models/invoice';
import {MatPaginator} from '@angular/material/paginator';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {MatDialog} from '@angular/material/dialog';
import {PaymentService} from '../../../../core/services/payment.service';
import {
  PaymentDialogComponent
} from '../../../../theme/component/payments/components/payment-dialog/payment-dialog.component';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';
import {CompanyService} from '../../../../core/services/company.service';
import {AppPaginate} from '../../../../core/class/AppPaginate';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  providers: [DocumentHelper]
})
export class InvoiceTableComponent extends AppPaginate<Invoice> implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[];
  destroyMsg = 'Faktura bola odstránená';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private companyService: CompanyService,
    private pdfService: PdfServiceService,
    private documentHelper: DocumentHelper,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected invoiceService: InvoiceService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(invoiceService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
    this.checkPayments();
    this.prepareColumns();
  }

  ngAfterViewInit(): void {
    // check payment store
    this.paymentService.newPayment.subscribe(() => {
      this.paginate();
    });

    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.service.pageIndex = 0;
        this.invoiceService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prepareColumns() {
    this.companyService.all().subscribe(c => {
      this.displayedColumns = [
        'variableSymbol',
        'client',
        'action',
        'created',
        'state',
        'price',
        'actions',
      ];

      if (c.length > 1) {
        this.displayedColumns = ['company'].concat(this.displayedColumns);
      }
    });
  }

  pdf(event: MouseEvent, id: number, name: string) {
    event.stopPropagation();

    this.pdfService.downloadPdf(id).subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
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
}
