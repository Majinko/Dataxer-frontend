import {Component, ViewChild} from '@angular/core';
import {DemandService} from '../../../../../../core/services/demand.service';
import {Demand} from '../../../../../../core/models/demand';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-demand-table',
  templateUrl: './demand-table.component.html',
  styleUrls: ['./demand-table.component.scss']
})
export class DemandTableComponent extends PaginateClass<Demand>  {
  displayedColumns: string[] = [
    'type',
    'company',
    'number',
    'title',
    'action',
    'created',
    'state',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private demandService: DemandService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super(messageService, demandService, dialog);
  }
}
