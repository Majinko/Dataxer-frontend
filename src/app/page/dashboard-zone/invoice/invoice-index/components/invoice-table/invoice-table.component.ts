import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../../../core/models/invoice';
import {MatPaginator} from '@angular/material/paginator';
import {DocumentFilterComponent} from '../../../../price-offer/components/document-filter/document-filter.component';
import {InvoiceService} from '../../../../../../core/services/invoice.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  providers: [DocumentHelper]
})
export class InvoiceTableComponent implements OnInit, AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  invoices: Invoice[] = [];
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
    private router: Router,
    private documentHelper: DocumentHelper,
    private invoiceService: InvoiceService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  public paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.invoiceService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.invoices = data));
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    this.invoiceService.destroy(id).subscribe(r => {
      this.paginate();

      this.messageService.add('Faktura bola odstránená');
    });
  }

  pdf(event: MouseEvent, id: number, name: string) {
    event.stopPropagation();

    this.invoiceService.pdf(id).subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
  }
}
