import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../core/services/task.service';
import {Task} from '../../../../core/models/task';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.scss']
})
export class TaskShowComponent implements OnInit {
  task: Task;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.taskService.getById(+this.route.snapshot.paramMap.get('task_id')).subscribe((task) => {
      this.task = task;
    });
  }
}
