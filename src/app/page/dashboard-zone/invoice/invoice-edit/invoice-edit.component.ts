import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../../../../core/services/invoice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
  }

}
