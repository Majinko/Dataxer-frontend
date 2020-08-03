import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Task} from "../../../../../../core/models/task";
import {MatPaginator} from "@angular/material/paginator";
import {TaskService} from "../../../../../../core/services/task.service";
import {MessageService} from "../../../../../../core/services/message.service";
import {merge} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements AfterViewInit {
  pageSize = 15;
  totalElements = 0;
  tasks: Task[] = []
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
    private taskService: TaskService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.paginate();
  }

  private paginate() {
    this.paginator.pageIndex = 0

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.taskService.paginate(
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
      .subscribe((data) => (this.tasks = data));
  }

  destroy(id: number) {
    this.taskService.destroy(id).subscribe(() => {
      this.paginate();
      this.messageService.add("Uloha bola vymazana");
    })
  }
}
