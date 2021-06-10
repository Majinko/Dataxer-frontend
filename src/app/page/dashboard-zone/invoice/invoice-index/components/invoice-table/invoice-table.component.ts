import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../../../core/models/invoice';
import {MatPaginator} from '@angular/material/paginator';
import {InvoiceService} from '../../../../../../core/services/invoice.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  providers: [DocumentHelper]
})
export class InvoiceTableComponent extends PaginateClass<Invoice> implements OnInit, AfterViewInit {
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
    private router: Router,
    private documentHelper: DocumentHelper,
    private messageService: MessageService,
    public invoiceService: InvoiceService,
  ) {
    super(invoiceService);
  }

  ngOnInit(): void {
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
