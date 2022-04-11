import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../core/services/project.service';
import {Project} from '../../../core/models/project';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AppPaginate} from '../../../core/class/AppPaginate';
import {GodButtonService} from '../../../core/services/god-button.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/models/app-state.model';
import {Subscription} from 'rxjs';
import {FilterService} from '../../../core/store/service/filter.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent extends AppPaginate<Project> implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  destroyMsg: string = 'Zákazka bola vymazana';

  displayedColumns: string[] = [
    'number',
    'title',
    'client',
    'address',
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
  }

  ngAfterViewInit(): void {
    this.subscription = this.filterService.doFilter.subscribe(data => {
      if (data && data.filteredData) {
        this.paginator.pageIndex = 0;
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
}
