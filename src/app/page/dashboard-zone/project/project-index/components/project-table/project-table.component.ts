import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../../../core/services/project.service';
import {Project} from '../../../../../../core/models/project';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {MessageService} from '../../../../../../core/services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  projects: Project[] = [];
  isLoadingResults = true;

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
    private projectService: ProjectService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paginate();
  }

  private paginate() {
    this.paginator.pageIndex = 0;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.projectService.paginate(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.totalElements = data.totalElements;

          return data.content;
        })
      )
      .subscribe((data) => (this.projects = data));
  }

  destroy(event: MouseEvent, id: number) {
    event.stopPropagation();

    this.projectService.destroy(id).subscribe(() => {
      this.paginate();
      this.messageService.add('Zákazka bola vymazana');
    });
  }

  show(project: Project) {
    this.router.navigate(['/project/show', project.id]).then();
  }
}
