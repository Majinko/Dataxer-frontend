import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EDITORCONFIG} from '../../../../../core/data/editor-config';
import {Todo, TodoComment, Todolist} from '../../../../../core/models/task';
import {UserService} from '../../../../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from '../../../../../core/services/todo.service';
import {MessageService} from '../../../../../core/services/message.service';


@Component({
  selector: 'app-todolist-show',
  templateUrl: './todolist-show.component.html',
  styleUrls: ['./todolist-show.component.scss']
})
export class TodolistShowComponent implements OnInit {
  formGroup: FormGroup;
  editorConfig = EDITORCONFIG;
  todolist: Todolist;
  todolistId: number;
  completeTodo: Todo[];
  comments: TodoComment[] = [];
  percent: number;
  writeComment = false;

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    public route: ActivatedRoute,
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.todolistId = +this.route.snapshot.paramMap.get('id');
    this.formGroup = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    this.getTodolist();
    this.getMessages();
  }

  private getTodolist() {
    this.todoService.todoListById(this.todolistId).subscribe(res => {
      res.todos.forEach(f => {
        f.assignedUsers?.forEach( f => {
          f.displayName = f.firstName + ' ' + f.lastName.charAt(0);
        });
      });
      this.todolist = res;
      this.completeTodo = this.todolist.todos.filter( f => f.isFinished === true);
      this.percent = this.completeTodo?.length / this.todolist?.todos?.length * 100;
    });
  }

  addComment($event: MouseEvent) {
    this.writeComment = true;
  }

  getMessages() {
    this.todoService.todoMessages(this.todolistId, 'todolist').subscribe(res => {
      this.comments = res;
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.messageService.add('Žiadny text v komentáry.');
      return;
    }
    const formData = {
      text: this.formGroup.value.comment,
      todoList: this.todolist,
      messageType: 'USER_MESSAGE'
    };
    this.todoService.storeMessage(formData).subscribe(res => {
      this.getMessages();
      this.formGroup.reset();
    });
  }

  todoCreate($event: boolean) {
    this.getTodolist();
  }
}
