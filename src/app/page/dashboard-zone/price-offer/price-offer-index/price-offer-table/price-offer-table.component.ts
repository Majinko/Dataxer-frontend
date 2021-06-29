import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';

import {MatPaginator} from '@angular/material/paginator';
import {PaginateClass} from '../../../../../core/class/PaginateClass';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
})
export class PriceOfferTableComponent extends PaginateClass<PriceOffer> implements AfterViewInit {
  destroyMsg = 'Cenová ponuka bola odstránená';
  displayedColumns: string[] = [
    'id',
    'client',
    'action',
    'created',
    'state',
    'price',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngAfterViewInit() {
    this.paginate();
  }

  constructor(
    public http: HttpClient,
    public priceOfferService: PriceOfferService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super(messageService, priceOfferService, dialog);
  }
}
