import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../../../core/services/project.service';
import {Project} from '../../../../../../core/models/project';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent extends PaginateClass<Project> implements AfterViewInit {
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
    public projectService: ProjectService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super(messageService, projectService, dialog);
  }

  ngAfterViewInit() {
    this.paginate();
  }

  show(project: Project) {
    this.router.navigate(['/project/show', project.id]).then();
  }
}
