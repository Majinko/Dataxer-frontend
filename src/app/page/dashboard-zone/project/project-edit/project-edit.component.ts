import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../core/services/project.service';
import {MessageService} from '../../../../core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../../core/models/project';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionSelectionChange} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../helper';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import {CategoryService} from '../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../core/models/category-item-node';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
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
export class ProjectEditComponent implements OnInit {
  formGroup: FormGroup;
  project: Project;
  submitted: boolean = false;
  categories: CategoryItemNode[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getProject();
    this.getAllCategories();
  }


  prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      number: [null, Validators.required],
      description: null,
      contact: null,
      state: null,
      address: null,
      area: null,
      startedAt: null,
      finishedAt: null,
      categories: null
    });
  }

  private getProject() {
    this.projectService.getById(+this.route.snapshot.paramMap.get('project_id')).subscribe((p) => {
      this.project = p;

      this.formGroup.patchValue(p);
    });
  }

  private getAllCategories() {
    this.categoryService.all().subscribe((nestedCategories) => {
      this.categories = nestedCategories;
    });
  }


  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.projectService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Zákazka bola aktualizovana');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  pathValue(event: MatOptionSelectionChange, categoryItemNode: CategoryItemNode) {

  }
}
