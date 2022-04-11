import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../../core/models/contact';
import {MessageService} from '../../../core/services/message.service';
import {ContactService} from '../../../core/services/contact.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {GodButtonService} from '../../../core/services/god-button.service';
import {AppPaginate} from '../../../core/class/AppPaginate';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/models/app-state.model';
import {Subscription} from 'rxjs';
import {FilterService} from '../../../core/store/service/filter.service';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent extends AppPaginate<Contact> implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'contact', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected contactService: ContactService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(contactService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.paginator.pageIndex = 0;
        this.contactService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
