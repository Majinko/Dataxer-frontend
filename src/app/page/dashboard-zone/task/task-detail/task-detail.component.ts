import {Component, Inject, OnInit} from '@angular/core';
import {Todos} from '../../../../core/models/task';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  todo: Todos = {
    listId: 2,
    id: 102,
    title: 'pridat log aj tu pri pridavani',
    checked: false,
  };

  constructor(
    @Inject(UserService) public readonly userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  checkedTodo(checked: boolean) {
    console.log(checked);
  }
}
