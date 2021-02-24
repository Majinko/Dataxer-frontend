import {Component, ViewChild, AfterViewInit} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {DocumentFilterComponent} from '../../components/document-filter/document-filter.component';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
})
export class PriceOfferTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  priceOffers: PriceOffer[] = [];
  isLoadingResults = true;
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
  @ViewChild(DocumentFilterComponent, {static: false}) private documentFilterRef: DocumentFilterComponent;

  ngAfterViewInit() {
    this.paginate();
  }

  constructor(
    private priceOfferService: PriceOfferService,
    private messageService: MessageService
  ) {
  }

  public paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.priceOfferService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.documentFilterRef.filterForm.value
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.priceOffers = data));
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    this.priceOfferService.destroy(id).subscribe(r => {
      this.paginate();

      this.messageService.add('Cenová ponuka bola odstránená');
    });
  }
}
