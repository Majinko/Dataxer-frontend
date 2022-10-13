import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../../core/services/message.service';
import {TodoService} from "../../todo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-todolist-create',
  templateUrl: './todolist-create.component.html',
  styleUrls: ['./todolist-create.component.scss']
})
export class TodolistCreateComponent implements OnInit {
  formGroup: FormGroup;
  noProjectId = false;
  submitted = false;

  constructor(
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      visibilityType: ['PRIVATE', Validators.required],
      projectId: [null, Validators.required]
    });
    if (+this.route.snapshot.paramMap.get('projectId')) {
      this.formGroup.get('projectId').patchValue(+this.route.snapshot.paramMap.get('projectId'));
    } else {
      this.noProjectId = true;
    }
  }

  createTodolist() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.messageService.add('Vyplňte názov zoznamu úloh.');
      return;
    }

    if (this.formGroup.get('projectId').value?.id) {
      const projectId = this.formGroup.get('projectId').value.id;
      this.formGroup.get('projectId').patchValue(projectId);
    }
    this.todoService.storeTodoList(this.formGroup.value).subscribe(res => {
    });
  }

  closeList() {
    this.todoService.closeSubject.next();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
