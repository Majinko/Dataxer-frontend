import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';

import {Contact} from '../../../../../core/models/contact';
import {MessageService} from '../../../../../core/services/message.service';
import {ContactService} from '../../../../../core/services/contact.service';

import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {SearchBarService} from '../../../../../core/services/search-bar.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  contacts: Contact[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = ['id', 'name', 'contact', 'actions'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    @Inject(ContactService) private readonly contactService: ContactService,
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(SearchBarService)
    private readonly searchBarService: SearchBarService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.paginator.showFirstLastButtons = true;

    this.paginate();
  }

  paginate() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchBarService.appSearch
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this.contactService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.active,
            this.searchBarService.filterValue
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe(data => (this.contacts = data));
  }

  destroy(event: MouseEvent, contact: Contact) {
    event.stopPropagation();

    this.contacts = this.contacts.filter(c => c !== contact);

    this.contactService.destroy(contact.id).subscribe(() => {
      this.messageService.add('Kontakt bol zmazaný');
    });

    return;
  }
}
