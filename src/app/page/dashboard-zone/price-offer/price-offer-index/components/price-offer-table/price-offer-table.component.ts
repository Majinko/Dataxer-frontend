import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';

import {MatPaginator} from '@angular/material/paginator';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {sum} from '../../../../../../../helper';
import {PdfServiceService} from '../../../../../../core/services/pdf-service.service';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
  providers: [DocumentHelper]
})
export class PriceOfferTableComponent extends PaginateClass<PriceOffer> implements AfterViewInit {
  totalPrice: number = 0;
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
    this.paginateFinish.subscribe((value) => {
      if (value === true) {
        this.totalPrice = sum(this.data, 'price');
      }
    });
  }

  constructor(
    public http: HttpClient,
    private documentHelper: DocumentHelper,
    public priceOfferService: PriceOfferService,
    public messageService: MessageService,
    public dialog: MatDialog,
    private pdfService: PdfServiceService,
  ) {
    super(messageService, priceOfferService, dialog);
  }

  pdf(event: MouseEvent, id: number, name: string) {
    event.stopPropagation();

    this.pdfService.downloadPdf(id, 'priceOffer').subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
  }
}
