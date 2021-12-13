import {Component, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {Router} from '@angular/router';
import {ProjectService} from '../../../../core/services/project.service';
import {User} from '../../../../core/models/user';
import {UserService} from '../../../../core/services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import {CategoryService} from '../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
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
    AddPercentPipe
  ],
})
export class ProjectCreateComponent implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  categories: CategoryItemNode[] = [];
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<ProjectCreateComponent>,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getAllCategories(['PROJECT']);
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      number: [null, Validators.required],
      description: '',
      categoryGroup: 'PROJECT',
      contact: null,
      state: null,
      address: '',
      projectProfit: [0, Validators.pattern(/^[0-9]\d*$/)],
      area: [0, Validators.pattern(/^[0-9]\d*$/)],
      startedAt: new Date(),
      finishedAt: new Date(),
      categories: null
    });
  }

  getAllCategories(groups: string[]) {
    this.categoryService.fallByGroupIn(groups).subscribe((nestedCategories) => {
      this.categories = nestedCategories;
    });
  }

  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.projectService.store(this.formGroup.value).subscribe(() => {
      this.messageService.add('Zákazka bola vytvorena');

      if (this.dialogRef === null) {
        this.router.navigate(['/project']).then(() => {
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  close() {
    if (this.formGroup.valid) {
      this.dialogRef.close();
    }
  }
}
