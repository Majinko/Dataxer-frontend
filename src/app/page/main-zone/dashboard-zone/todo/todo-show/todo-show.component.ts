import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {TodoService} from '../../../../../core/services/todo.service';
import {Todo, TodoComment} from '../../../../../core/models/task';
import {EDITORCONFIG} from '../../../../../core/data/editor-config';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.scss']
})
export class TodoShowComponent implements OnInit {
  formGroup: FormGroup;
  editorConfig = EDITORCONFIG;
  editTodo = false;
  writeComment = false;
  todoId: number;
  todoListId: number;
  todo: Todo;
  comments: TodoComment[] = [];

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
  ) {
  }

  ngOnInit(): void {
    this.todoId = +this.route.snapshot.paramMap.get('todo');
    this.todoListId = +this.route.snapshot.paramMap.get('id');
    this.editorConfig.uploadUrl = '/test/image/upload';
    this.editorConfig.toolbarHiddenButtons = [
      [
        'strikeThrough',
        'heading',
        'fontName',
      ],
      [
        'customClasses',
        'insertHorizontalRule',
        'removeFormat',
      ]
    ];

    this.formGroup = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    this.getTodolist();
    this.getMessages();
  }

  getTodolist() {
    this.todoService.todoById(this.todoId).subscribe(res => {
      this.todo = res;
      console.log('todoById');
      console.log(res);
    });
  }

  getMessages() {
    this.todoService.todoMessages(this.todoId).subscribe(res => {
      console.log('getMessages');
      console.log(res);
      this.comments = res;
    });
  }

  checkedTodo(checked: boolean) {
    if (this.todo?.id) {
      this.todoService.markSolved(this.todo.id).subscribe(res => {
        console.log(res);
      });
    }
  }

  todoEdit($event: boolean) {
    if ($event === false) {
      this.editTodo = false;
    } else {
      this.getTodolist();
    }
  }

  editButton($event: MouseEvent) {
    this.editTodo = true;
  }

  addComment($event: MouseEvent) {
    this.writeComment = true;
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    const formData = {
      text: this.formGroup.value.comment,
      todo: this.todo,
      messageType: 'USER_MESSAGE'
    };
    console.log(this.formGroup.value);
    console.log(formData);
    this.todoService.storeMessage(formData).subscribe(res => {
      console.log(res);
    });
  }
}
