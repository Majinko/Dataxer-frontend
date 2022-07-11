import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../../../core/services/item.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../core/services/message.service';
import {UploadHelper} from '../../../../core/class/UploadHelper';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../core/models/item';
import {AppPaginate} from '../../../../core/class/AppPaginate';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';
import {CompanyService} from '../../../../core/services/company.service';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
  providers: [UploadHelper]
})
export class ItemTableComponent extends AppPaginate<Item> implements OnInit, AfterViewInit, OnDestroy{
  displayedColumns: string[] = ['id', 'title', 'price', 'actuality', 'actions'];
  showWithDph = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected itemService: ItemService,
    protected companyService: CompanyService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(itemService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.itemService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
