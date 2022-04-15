import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../../helper';
import {EDITORCONFIG} from '../../../../../../core/data/editor-config';

@Component({
  selector: 'app-task-todo-create',
  templateUrl: './task-todo-create.component.html',
  styleUrls: ['./task-todo-create.component.scss'],
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
export class TaskTodoCreateComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  editorConfig = EDITORCONFIG;
  noteShow = false;
  assignees = {
    type: 'assignees',
    placeholder: 'Zadajte mená, ktoré chcete priradiť'
  };
  completion = {
    type: 'completion',
    placeholder: 'Zadajte mená, ktoré chcete upozorniť'
  };

  @ViewChild('titleInput') titleInput: ElementRef<HTMLInputElement>;

  @Output() action: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      assignees: [null, Validators.required],
      completion: [null, Validators.required],
      project: [null, Validators.required],
      category: [null, Validators.required],
      dueOn: null,
      notes: null,
    });
  }
  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
    this.cdr.detectChanges();
  }

  submit() {
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.value);
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
}
