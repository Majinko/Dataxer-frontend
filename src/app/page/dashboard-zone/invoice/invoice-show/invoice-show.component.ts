import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {Invoice} from '../../../../core/models/invoice';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {PaymentService} from '../../../../core/services/payment.service';
import {MatDialog} from '@angular/material/dialog';
import {DocumentEmailDialogComponent} from '../../../../theme/component/document-email-dialog/document-email-dialog.component';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss'],
  providers: [DocumentHelper]
})
export class InvoiceShowComponent implements OnInit {
  invoice: Invoice;
  canCreateTaxDocument: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    public documentHelper: DocumentHelper,
    private dialog: MatDialog,
    private pdfService: PdfServiceService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getById();
    });

    this.paymentService.newPayment.subscribe(() => {
      this.getById();
    });

    this.paymentService.destroyPayment.subscribe(() => {
      this.getById();
    });
  }

  getById() {
    this.invoiceService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
      this.invoice = invoice;

      this.documentHelper.prepareTaxes(invoice.packs);
      this.documentHelper.prepareTaxesFromPackForSummaryInvoice(invoice.packs);
    });
  }

  pdf(id: number, name: string) {
    this.pdfService.downloadPdf(id).subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
  }

  sendEmail(invoice: Invoice) {
    this.dialog.open(DocumentEmailDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        ...invoice
      }
    });
  }
}
