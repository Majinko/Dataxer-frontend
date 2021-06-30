import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../core/services/category.service';
import {ProjectService} from '../../../../core/services/project.service';
import {Project} from '../../../../core/models/project';
import {CategoryItemNode} from '../../../../core/models/category-item-node';
import {User} from '../../../../core/models/user';
import {UserService} from '../../../../core/services/user.service';
import {TaskService} from '../../../../core/services/task.service';
import {Router} from '@angular/router';
import {MessageService} from '../../../../core/services/message.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {UploadHelper} from '../../../../core/class/UploadHelper';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ],
})
export class TaskCreateComponent implements OnInit {
  formGroup: FormGroup;

  users: User[] = [];
  projects: Project[] = [];
  categories: CategoryItemNode[] = [];

  constructor(
    public uploadHelper: UploadHelper,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();

    this.getUsers();
    this.getProjects();
    this.getCategories();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      project: null,
      category: null,
      user: null,
      state: null,
      sendEmail: true,
      completion: '',
      finishedAt: new Date(),
    });
  }

  private getProjects() {
    this.projectService.all().subscribe((p) => this.projects = p);
  }

  private getCategories() {
    this.categoryService.all().subscribe((c) => this.categories = c);
  }

  private getUsers() {
    return this.userService.all().subscribe((u) => this.users = u);
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.taskService.store(this.formGroup.value, this.uploadHelper.files).subscribe(() => {
      this.router.navigate(['/task']).then(() => this.messageService.add('Úloha bola pridaná'));
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
