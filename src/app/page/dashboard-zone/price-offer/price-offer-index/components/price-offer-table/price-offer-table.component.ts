import {Component, OnInit, ViewChild} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';
import {MatPaginator} from '@angular/material/paginator';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {PdfServiceService} from '../../../../../../core/services/pdf-service.service';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {CompanyService} from '../../../../../../core/services/company.service';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
  providers: [DocumentHelper]
})
export class PriceOfferTableComponent extends PaginateClass<PriceOffer> implements OnInit {
  displayedColumns: string[];
  destroyMsg = 'Cenová ponuka bola odstránená';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public http: HttpClient,
    private documentHelper: DocumentHelper,
    public priceOfferService: PriceOfferService,
    public messageService: MessageService,
    public dialog: MatDialog,
    private pdfService: PdfServiceService,
    private companyService: CompanyService
  ) {
    super(messageService, priceOfferService, dialog);
  }

  ngOnInit(): void {
    this.prepareColumns();
  }

  prepareColumns() {
    this.companyService.all().subscribe(c => {
      this.displayedColumns = [
        'number',
        'title',
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

    this.pdfService.downloadPdf(id, 'priceOffer').subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
  }
}
