import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../core/services/project.service';
import {Project} from '../../../../core/models/project';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AppPaginate} from '../../../../core/class/AppPaginate';
import {GodButtonService} from '../../../../core/services/god-button.service';
import {FilterService} from '../../../../core/store/service/filter.service';
import {sum} from '../../../../../helper';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent extends AppPaginate<Project> implements OnInit, AfterViewInit, OnDestroy {
  destroyMsg: string = 'Zákazka bola vymazana';
  projectData: { profit: number, payedInvoices: number, notPayedInvoices: number, payedCosts: number, notPayedCosts: number, manHours: number, priceBrutto: number, manHoursProfit: 0, marge: 0 } = {
    profit: 0,
    payedInvoices: 0,
    notPayedInvoices: 0,
    payedCosts: 0,
    notPayedCosts: 0,
    manHours: 0,
    priceBrutto: 0,
    manHoursProfit: 0,
    marge: 0
  };

  displayedColumns: string[] = [
    'number',
    'title',
    'client',
    'address',
    'payedInvoices',
    'notPayedInvoices',
    'payedCosts',
    'notPayedCosts',
    'manHours',
    'priceBrutto',
    'startedAt',
    'finishedAt',
    'monthsDuration',
    'profit',
    'manHoursProfit',
    'profitSurcharge',
    'completed',
    'actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    protected godButtonService: GodButtonService,
    protected projectService: ProjectService,
    protected messageService: MessageService,
    protected dialog: MatDialog,
    protected filterService: FilterService,
  ) {
    super(projectService, godButtonService, messageService, dialog, route, filterService);
  }

  ngOnInit(): void {
    this.init();
    this.handlePaginateFinish();
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.projectService.rsqlFilter = data.rsQlFilter;

        this.paginate();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  show(project: Project) {
    this.router.navigate(['/project/show', project.id]).then();
  }

  private handlePaginateFinish() {
    this.paginateFinish.subscribe(() => {
      for (const [key, value] of Object.entries(this.projectData)) {
        this.projectData[key] = sum(this.data, key.toString());
      }
    });
  }
}
