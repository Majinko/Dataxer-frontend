import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../../core/services/message.service';
import {TodoService} from '../../todo.service';
import {ActivatedRoute, Router} from '@angular/router';

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
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private todoService: TodoService,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      visibilityType: ['PRIVATE', Validators.required],
      project: [null, Validators.required]
    });
    if (+this.route.snapshot.paramMap.get('projectId')) {
      this.formGroup.get('project').patchValue({id: this.route.snapshot.paramMap.get('projectId')});
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

    this.todoService.storeTodoList(this.formGroup.value).subscribe(res => {
      this.router.navigate(['/todo/todolist', this.formGroup.get('project').value.id]);
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
