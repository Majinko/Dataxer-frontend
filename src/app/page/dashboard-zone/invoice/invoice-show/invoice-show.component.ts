import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {Invoice} from '../../../../core/models/invoice';
import {Taxes} from '../../../../core/models/taxes';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {MessageService} from '../../../../core/services/message.service';
import {PaymentService} from '../../../../core/services/payment.service';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss'],
  providers: [DocumentHelper]
})
export class InvoiceShowComponent implements OnInit {
  invoice: Invoice;
  taxResult: Taxes[] = [];
  canCreateTaxDocument: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private documentHelper: DocumentHelper,
    private messageService: MessageService,
    private paymentService: PaymentService
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

      this.prepareTaxes();
    });
  }

  private prepareTaxes() {
    this.invoice.packs.forEach(pack => {
      if (pack.customPrice) {
        this.prepareTaxResult(pack);
      } else {
        pack.packItems.forEach(item => {
          this.prepareTaxResult(item, true);
        });
      }
    });
  }

  private prepareTaxResult(item, isItem = false) {
    const tAxResult = this.taxResult.find(t => t.tax === item.tax);
    if (tAxResult !== undefined) {
      if (isItem) {
        tAxResult.price += +this.documentHelper.removePercent(+item.price, +item.discount);
        tAxResult.totalPrice += +this.documentHelper.removePercent(+item.totalPrice, +item.discount);
      } else {
        tAxResult.price += +item.price;
        tAxResult.totalPrice += +item.totalPrice;
      }
    } else {
      if (isItem) {
        this.taxResult.push({
          tax: item.tax,
          price: +this.documentHelper.removePercent(+item.price * +item.qty, +item.discount),
          totalPrice: +this.documentHelper.removePercent(+item.totalPrice, +item.discount)
        });
      } else {
        this.taxResult.push({tax: item.tax, price: item.price, totalPrice: item.totalPrice});
      }
    }
  }
}
