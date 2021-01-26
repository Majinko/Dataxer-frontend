import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {Invoice} from '../../../../core/models/invoice';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss']
})
export class InvoiceShowComponent implements OnInit {
  invoice: Invoice;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    this.invoiceService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(invoice => {
      this.invoice = invoice;

      this.prepareTaxes();
    });
  }

  prepareTaxes() {
    console.log(this.invoice);
  }
}
