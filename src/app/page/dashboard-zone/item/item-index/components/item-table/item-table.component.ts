import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ItemService} from '../../../../../../core/services/item.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {UploadHelper} from '../../../../../../core/class/UploadHelper';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {Item} from '../../../../../../core/models/item';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
  providers: [UploadHelper]
})
export class ItemTableComponent extends PaginateClass<Item>{
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public itemService: ItemService,
    public messageService: MessageService,
    public dialog: MatDialog,
  ) {
    super(messageService, itemService, dialog);
  }
}
