import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DemandService} from '../../../../core/services/demand.service';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../core/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {AppPaginate} from '../../../../core/class/AppPaginate';
import {ActivatedRoute} from '@angular/router';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';
import {Demand} from '../../../../core/models/demand';

@Component({
  selector: 'app-demand-table',
  templateUrl: './demand-table.component.html',
  styleUrls: ['./demand-table.component.scss']
})
export class DemandTableComponent extends AppPaginate<Demand> implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'type',
    'company',
    'number',
    'title',
    'action',
    'created',
    'state',
    'actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected demandService: DemandService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(demandService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.service.pageIndex = 0;
        this.demandService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
