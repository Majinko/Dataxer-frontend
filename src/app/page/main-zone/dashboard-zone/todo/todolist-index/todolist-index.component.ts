import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todolist} from '../../../../../core/models/task';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todolist-index',
  templateUrl: './todolist-index.component.html',
  styleUrls: ['./todolist-index.component.scss']
})
export class TodolistIndexComponent implements OnInit {
  create = false;
  todoLists: Todolist[];

  constructor(
    private todoService: TodoService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getTodolist();
    this.todoService.closeSubject.subscribe(() => {
      this.create = false;
    });
    this.todoService.storeUpdateSubject.subscribe(() => {
      this.create = false;
      this.getTodolist();
    });
  }

  drop(event: CdkDragDrop<Todolist[]>) {
    moveItemInArray(this.todoLists, event.previousIndex, event.currentIndex);
    const ids = [];
    this.todoLists.forEach( f => {
      ids.push(f.id);
    });
    this.todoService.listReorder(ids).subscribe(res => {
      console.log(res);
    });
  }

  getTodolist() {
    this.todoService.allTodoList(+this.route.snapshot.paramMap.get('projectId')).subscribe(res => {
      this.todoLists = res;
      this.getPercent();
    });
  }

  getPercent() {
    this.todoLists.forEach(todolist => {
      const complete = todolist.todos.filter( f => f.isFinished === true).length;
      const length = todolist.todos.length;
      todolist.completeText = complete + '/' + length;
      todolist.percent = complete / length * 100;
    });
  }

  completeTodo(list: Todolist) {
    const complete = list.todos.filter( f => f.isFinished === true);
    return complete.length + '/' + list.todos.length;
  }

  todoCreate($event: any) {
    if ($event === true) {
      this.getTodolist();
    }
  }

  openNewList() {
    this.create = true;
  }
}
