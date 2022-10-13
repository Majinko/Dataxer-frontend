import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {TodoService} from '../todo.service';
import {Todo, TodoComment} from '../../../../../core/models/task';
import {EDITORCONFIG} from '../../../../../core/data/editor-config';
import {MessageService} from '../../../../../core/services/message.service';

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
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.todoId = +this.route.snapshot.paramMap.get('todo');
    this.todoListId = +this.route.snapshot.paramMap.get('id');
    this.editorConfig.uploadUrl = '/test/image/upload';

    this.formGroup = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    this.getTodolist();
    this.getMessages();
  }

  getTodolist() {
    this.todoService.todoById(this.todoId).subscribe(res => {
      res?.assignedUsers?.forEach( f => {
        f.displayName = f.firstName + ' ' + f.lastName.charAt(0);
      });
      res?.notifyUsers?.forEach( f => {
        f.displayName = f.firstName + ' ' + f.lastName.charAt(0);
      });
      this.todo = res;
    });
  }

  getMessages() {
    this.todoService.todoMessages(this.todoId, 'todo').subscribe(res => {
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
      this.messageService.add('Žiadny text v komentáry.');
      return;
    }
    const formData = {
      text: this.formGroup.value.comment,
      todo: this.todo,
      messageType: 'USER_MESSAGE'
    };

    this.todoService.storeMessage(formData).subscribe(res => {
      this.getMessages();
      this.formGroup.reset();
    });
  }
}
