import { Component, OnInit } from '@angular/core';
import {Todolist, Todo} from '../../../../../core/models/task';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.scss']
})
export class TaskTodoComponent implements OnInit {
  listId: number;
  createTodo = false;
  todos: Todo[] = [
    {
      listId: 1,
      id: 101,
      title: 'toto treba',
      checked: false,
      position: 1,
    },
    {
      listId: 2,
      id: 102,
      title: 'ak bude mat milan cas a vie to, poprosil by som skopirovat tento todo system do dataxeru. Iba tieto todo - budu sa pridavat prioritne pouzivatelia a potom kontakty, ktorym dovolim. nie je to vobec surne ale pokial by bol volny priestor, urobme to priamo v dataxeri a budeme aj vramc firmy pouzivat...',
      checked: true,
      position: 2,
    },
    {
      listId: 3,
      id: 103,
      title: 'toto treba určite',
      checked: true,
      position: 3,
    },
  ];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.listId = +this.route.snapshot.paramMap.get('id');
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.todos.forEach((todo, index) => {
      todo.position = index;
    });
  }

  checkedTodo(checked: boolean) {
    console.log(checked);
  }

  addTodo($event: MouseEvent) {
    this.createTodo = true;
  }

  todoCreate($event: boolean) {
    if ($event === false) {
      this.createTodo = false;
    }
  }
}
