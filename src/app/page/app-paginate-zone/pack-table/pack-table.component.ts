import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PackService} from '../../../core/services/pack.service';
import {Pack} from '../../../core/models/pack';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../core/services/message.service';
import {PaginateClass} from '../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {GodButtonService} from '../../../core/services/god-button.service';
import {ContactService} from '../../../core/services/contact.service';
import {FilterService} from '../../../core/store/service/filter.service';
import {AppPaginate} from '../../../core/class/AppPaginate';

@Component({
  selector: 'app-group-table',
  templateUrl: './pack-table.component.html',
  styleUrls: ['./pack-table.component.scss']
})
export class PackTableComponent extends AppPaginate<Pack> implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected packService: PackService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(packService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.paginator.pageIndex = 0;
        this.packService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showPack(pack: Pack) {
    this.router.navigate(['/pack/show', pack.id]).then();
  }
}
