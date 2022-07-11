import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todolist} from '../../../../../core/models/task';
import {TodoService} from '../../../../../core/services/todo.service';

@Component({
  selector: 'app-todolist-index',
  templateUrl: './todolist-index.component.html',
  styleUrls: ['./todolist-index.component.scss']
})
export class TodolistIndexComponent implements OnInit {
  formGroup: FormGroup;
  create: string;
  todoLists: Todolist[];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.create = this.route.snapshot.paramMap.get('type');
    this.prepareForm();
    this.getTodolist();
  }

  prepareForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      isPrivate: false
    });
  }

  drop(event: CdkDragDrop<Todolist[]>) {
    moveItemInArray(this.todoLists, event.previousIndex, event.currentIndex);
    this.todoService.listReorder(this.todoLists).subscribe(res => {
      console.log(res);
    });
  }

  getTodolist() {
    this.todoService.allTodoList().subscribe(res => {
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

  createTodolist() {
    this.todoService.storeTodoList(this.formGroup.value).subscribe(res => {
      this.create = null;
      this.getTodolist();
    });
  }

  completeTodo(list: Todolist) {
    const complete = list.todos.filter( f => f.isFinished === true);
    return complete.length + '/' + list.todos.length;
  }
}
