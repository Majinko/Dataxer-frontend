import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { Todo } from 'src/app/core/models/task';
import {APP_DATE_FORMATS} from '../../../../../../../helper';
import {EDITORCONFIG} from '../../../../../../core/data/editor-config';
import {TodoService} from '../../../../../../core/services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ],
})
export class TodoCreateComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  editorConfig = EDITORCONFIG;
  noteShow = false;

  @Input() todo?: Todo = null;
  @Input() todolistId?: number;

  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('titleTextarea') titleTextarea: ElementRef<HTMLInputElement>;

  @Output() action: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      assignedUser: null,
      notifyWhenDone: null,
      project: null,
      category: null,
      dueDate: null,
      note: null,
    });
    if (this.todo) {
      this.formGroup.patchValue(this.todo);
      if (this.todo.note) {
        this.noteShow = true;
      }
    }
  }
  ngAfterViewInit() {
    if (this.todo) {
      this.titleTextarea?.nativeElement.focus();
    } else {
      this.titleInput?.nativeElement.focus();
    }
    this.cdr.detectChanges();
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.todo) {
      this.todoService.updateTodo(this.formGroup.value).subscribe(res => {
        this.action.emit(true);
      });
    } else {
      this.todoService.storeTodo(this.todolistId, this.formGroup.value).subscribe(res => {
        this.action.emit(true);
      });
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  addNote($event: MouseEvent) {
    this.noteShow = true;
  }

  cancel($event: MouseEvent) {
    this.action.emit(false);
  }

  checkedTodo(checked: boolean) {
    if (this.todo?.id) {
      this.todoService.markSolved(this.todo.id).subscribe(res => {
        console.log(res);
      });
    }
  }
}
