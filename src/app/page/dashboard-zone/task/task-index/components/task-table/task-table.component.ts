import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Task} from '../../../../../../core/models/task';
import {MatPaginator} from '@angular/material/paginator';
import {TaskService} from '../../../../../../core/services/task.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {PaginateClass} from '../../../../../../core/class/PaginateClass';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent extends PaginateClass<Task> implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  tasks: Task[] = [];
  isLoadingResults = true;

  displayedColumns: string[] = [
    'title',
    'userFrom',
    'user',
    'project',
    'state',
    'actions'
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    public taskService: TaskService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) {
    super(messageService, taskService, dialog);
  }

  ngAfterViewInit() {
    this.paginate();
  }

  show(task: Task) {
    this.router.navigate(['/task/show', task.id]).then();
  }
}
