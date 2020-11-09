import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from "../../../../../core/models/invoice";
import {MatPaginator} from "@angular/material/paginator";
import {DocumentFilterComponent} from "../../../price-offer/components/document-filter/document-filter.component";
import {InvoiceService} from "../../../../../core/services/invoice.service";
import {MessageService} from "../../../../../core/services/message.service";
import {merge} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
})
export class InvoiceTableComponent implements OnInit, AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  invoices: Invoice[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    "id",
    "client",
    "action",
    "created",
    "state",
    "price",
    "actions",
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(DocumentFilterComponent, {static: false}) private documentFilterRef: DocumentFilterComponent

  ngAfterViewInit() {
    this.paginate();
  }

  constructor(
    private invoiceService: InvoiceService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  public paginate() {
    this.paginator.pageIndex = 0

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

  destroy(id: number) {
    this.invoiceService.destroy(id).subscribe(r => {
      this.paginate();

      this.messageService.add("Faktura bola odstránená");
    })
  }
}
