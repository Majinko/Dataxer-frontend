import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../../../core/models/invoice';
import {MatPaginator} from '@angular/material/paginator';
import {InvoiceService} from '../../../../../../core/services/invoice.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {DocumentHelper} from '../../../../../../core/class/DocumentHelper';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  providers: [DocumentHelper]
})
export class InvoiceTableComponent extends PaginateClass<Invoice> implements OnInit, AfterViewInit {
  destroyMsg = 'Faktura bola odstránená';
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
  }

  constructor(
    private router: Router,
    private documentHelper: DocumentHelper,
    public messageService: MessageService,
    public invoiceService: InvoiceService,
    public dialog: MatDialog
  ) {
    super(messageService, invoiceService, dialog);
  }

  ngOnInit(): void {
  }

  pdf(event: MouseEvent, id: number, name: string) {
    event.stopPropagation();

    this.invoiceService.pdf(id).subscribe(r => {
      this.documentHelper.pdf(r, name);
    });
  }
}
