import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Invoice} from '../../../../../../core/models/invoice';
import {AppPaginate} from '../../../../../../core/class/AppPaginate';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {GodButtonService} from '../../../../../../core/services/god-button.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {FilterService} from '../../../../../../core/store/service/filter.service';
import {InvoiceService} from '../../../../../../core/services/invoice.service';

@Component({
  selector: 'app-item-projects-dialog',
  templateUrl: './item-projects-dialog.component.html',
  styleUrls: ['./item-projects-dialog.component.scss']
})
export class ItemProjectsDialogComponent extends AppPaginate<Invoice> implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'variableSymbol',
    'client',
    'action',
    'created',
    'state',
    'price',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected invoiceService: InvoiceService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(invoiceService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.invoiceService.rsqlFilter = `(invoice.project.id==${this.dialogData.element.project.id})`;
    this.paginate();
  }
}
