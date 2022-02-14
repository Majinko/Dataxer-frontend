import {Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../../../core/models/invoice';
import {MatPaginator} from '@angular/material/paginator';
import {InvoiceService} from '../../../../../../core/services/invoice.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';
import {PaymentService} from '../../../../../../core/services/payment.service';
import {PaymentDialogComponent} from '../../../../../../theme/component/payments/components/payment-dialog/payment-dialog.component';
import {PdfServiceService} from '../../../../../../core/services/pdf-service.service';
import {CompanyService} from '../../../../../../core/services/company.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  providers: [DocumentHelper]
})
export class InvoiceTableComponent extends PaginateClass<Invoice> implements OnInit {
  totalPrice: number = 0;
  destroyMsg = 'Faktura bola odstránená';
  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private documentHelper: DocumentHelper,
    public messageService: MessageService,
    public invoiceService: InvoiceService,
    public dialog: MatDialog,
    private paymentService: PaymentService,
    private pdfService: PdfServiceService,
    private companyService: CompanyService
  ) {
    super(messageService, invoiceService, dialog);
  }

  ngOnInit(): void {
    this.paymentService.newPayment.subscribe(() => {
      this.paginate();
    });

    this.paymentService.destroyPayment.subscribe(() => {
      this.paginate();
    });

    this.prepareColumns();
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
}
