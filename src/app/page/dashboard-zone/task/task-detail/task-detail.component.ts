import {Component, Inject, OnInit} from '@angular/core';
import {TodoComment, Todos} from '../../../../core/models/task';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  editTodo = false;
  todo: Todos = {
    listId: 2,
    id: 102,
    title: 'pridat log aj tu pri pridavani',
    checked: false,
    position: 1,
  };
  comments: TodoComment[] = [
    {
      id: 1,
      time: 'Jan 11',
      name: 'Marek Hlavčo',
      text: 'tu to pridať'
    },
    {
      id: 2,
      time: 'Jan 12',
      name: 'Janko Hraško',
      text: 'aj tu?'
    },
    {
      id: 3,
      time: 'Jan 16',
      name: 'Marek Hlavčo',
      text: 'ano'
    }
  ];

  constructor(
    @Inject(UserService) public readonly userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  checkedTodo(checked: boolean) {
    console.log(checked);
  }

  todoEdit($event: boolean) {
    if ($event === false) {
      this.editTodo = false;
    }
  }

  editButton($event: MouseEvent) {
    this.editTodo = true;
  }
}
