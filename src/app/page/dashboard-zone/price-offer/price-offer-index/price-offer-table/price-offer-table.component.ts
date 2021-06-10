import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';

import {MatPaginator} from '@angular/material/paginator';
import {PaginateClass} from '../../../../../core/class/PaginateClass';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
})
export class PriceOfferTableComponent extends PaginateClass<PriceOffer> implements AfterViewInit {
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
    private messageService: MessageService,
  ) {
    super(priceOfferService);
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    this.priceOfferService.destroy(id).subscribe(r => {
      this.paginate();

      this.messageService.add('Cenová ponuka bola odstránená');
    });
  }
}
