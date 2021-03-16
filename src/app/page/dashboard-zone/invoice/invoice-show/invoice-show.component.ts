import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {Invoice} from '../../../../core/models/invoice';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {PaymentService} from '../../../../core/services/payment.service';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss'],
  providers: [DocumentHelper]
})
export class InvoiceShowComponent implements OnInit {
  invoice: Invoice;
  canCreateTaxDocument: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private paymentService: PaymentService,
    public documentHelper: DocumentHelper
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
    });
  }
}
