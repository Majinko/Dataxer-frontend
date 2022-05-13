import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {PriceOfferService} from 'src/app/core/services/priceOffer.service';
import {MessageService} from 'src/app/core/services/message.service';
import {PriceOffer} from 'src/app/core/models/priceOffer';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {PdfServiceService} from '../../../../core/services/pdf-service.service';
import {DocumentHelper} from '../../../../core/class/DocumentHelper';
import {CompanyService} from '../../../../core/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../../core/services/payment.service';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';
import {AppDocumentPaginate} from '../../../../core/class/AppDocumentPaginate';
import {DocumentService} from '../../../../core/services/document.service';

@Component({
  selector: 'app-price-offer-table',
  templateUrl: './price-offer-table.component.html',
  providers: [DocumentHelper]
})
export class PriceOfferTableComponent extends AppDocumentPaginate<PriceOffer> implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[];
  destroyMsg = 'Cenová ponuka bola odstránená';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private companyService: CompanyService,
    private pdfService: PdfServiceService,
    private documentHelper: DocumentHelper,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected priceOfferService: PriceOfferService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
    protected documentService: DocumentService,
  ) {
    super(priceOfferService, godButtonService, messageService, dialog, route, filterService, documentService);
  }

  ngOnInit(): void {
    this.init();
    this.prepareColumns();
  }

  ngAfterViewInit(): void {
    // check payment store
    this.paymentService.newPayment.subscribe(() => {
      this.paginate();
    });

    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.service.pageIndex = 0;
        this.priceOfferService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
