import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {Contact} from '../../../../../../core/models/contact';
import {MessageService} from '../../../../../../core/services/message.service';
import {ContactService} from '../../../../../../core/services/contact.service';
import {MatPaginator} from '@angular/material/paginator';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent extends PaginateClass<Contact> implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'contact', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    public contactService: ContactService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super(messageService, contactService, dialog);
  }

  ngAfterViewInit(): void {
  }
}
