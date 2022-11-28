import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Todo, Todolist} from 'src/app/core/models/task';
import {APP_DATE_FORMATS} from '../../../../../../../helper';
import {EDITORCONFIG} from '../../../../../../core/data/editor-config';
import {TodoService} from '../../todo.service';
import {MessageService} from '../../../../../../core/services/message.service';
import {CategoryItemNode} from '../../../../../../core/models/category-item-node';
import {Project} from '../../../../../../core/models/project';
import {ProjectService} from '../../../../../../core/services/project.service';

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
  submitted = false;
  categories: CategoryItemNode[] = [];

  @Input() todo?: Todo = null;
  @Input() todolist?: Todolist;

  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('titleTextarea') titleTextarea: ElementRef<HTMLInputElement>;

  @Output() action: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private todoService: TodoService,
    private messageService: MessageService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      assignedUsers: null,
      notifyUsers: null,
      project: null,
      category: null,
      dueDate: null,
      note: null,
    });
    this.handleChangeProject();
    if (this.todo) {
      this.todo?.assignedUsers?.forEach( f => {
        f.displayName = f.firstName + ' ' + f.lastName.charAt(0);
      });
      this.todo?.notifyUsers?.forEach( f => {
        f.displayName = f.firstName + ' ' + f.lastName.charAt(0);
      });
      this.formGroup.patchValue(this.todo);
      if (this.todo.note) {
        this.noteShow = true;
      }
    }
    if (this.todolist && this.todolist.project) {
      this.formGroup.get('project').patchValue(this.todolist.project);
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
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.messageService.add('Napíšte názov úlohy.');
      return;
    }

    if (this.todo) {
      this.todoService.updateTodo(this.formGroup.value).subscribe(res => {
        this.action.emit(true);
      });
    } else {
      this.todoService.storeTodo(this.todolist.id, this.formGroup.value).subscribe(res => {
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

  // handle change project
  private handleChangeProject() {
    this.formGroup.get('project').valueChanges.subscribe((project: Project) => {
      this.projectService.getCategories(project.id).subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

}
