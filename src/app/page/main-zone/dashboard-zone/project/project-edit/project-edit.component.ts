import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../../core/services/project.service';
import {MessageService} from '../../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../../../core/models/project';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionSelectionChange} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../helper';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {CategoryService} from '../../../../../core/services/category.service';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {TimeService} from '../../../../../core/services/time.service';

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
  isLoading: boolean = false;
  formGroup: FormGroup;
  project: Project;
  submitted: boolean = false;
  categories: CategoryItemNode[] = [];
  groups: { group: string, title: string, categories: CategoryItemNode[], fillCategories: CategoryItemNode[] }[] = [
    {
      group: 'TYPE_PROJECT',
      title: 'Druhy zákaziek',
      categories: [],
      fillCategories: []
    },
    {
      group: 'PROJECT',
      title: 'Kategórie zákazky',
      categories: [],
      fillCategories: []
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getProject();
    this.getAllCategories(['PROJECT', 'TYPE_PROJECT']);
  }


  prepareForm() {
    this.formGroup = this.formBuilder.group({
      id: null,
      title: [null, Validators.required],
      number: null,
      description: null,
      coworkers: null,
      responsibleUsers: null,
      contact: null,
      state: null,
      address: null,
      projectProfit: 0,
      isProjectFinish: false,
      isDeactivated: false,
      isCompanyProject: false,
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

      this.prepareGroup('fillCategories', p.categories);

      // project finished
      this.setProjectStartFinish(p);
    });
  }

  getAllCategories(groups: string[]) {
    this.categoryService.fallByGroupIn(groups).subscribe((nestedCategories) => {
      this.categories = nestedCategories;

      this.prepareGroup('categories', this.categories);
    });
  }

  prepareGroup(attribute: string, categories: CategoryItemNode[]) {
    this.groups.forEach((item) => {
      item[attribute] = categories.filter((c) => c.categoryGroup === item.group);
    });
  }

  private prepareCategoriesBeforeStore() {
    const categories: CategoryItemNode[] = [];

    this.groups.forEach((item) => {
      item.fillCategories.forEach(category => {
        if (categories.find((existCategory) => existCategory.id === category.id) === undefined) {
          categories.push(category);
        }
      });
    });

    this.formGroup.patchValue({categories});
  }

  private setProjectStartFinish(p: Project) {
    if (!p.isProjectFinish) {
      this.timeService.getProjectStartEnd(p.id).subscribe((r) => {
        if (r) {
          this.formGroup.patchValue({
            startedAt: r.start,
            finishedAt: r.finish
          });
        }
      });
    }
  }

  submit() {
    this.prepareCategoriesBeforeStore();

    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.isLoading = true;

    this.projectService.update(this.formGroup.value).subscribe(() => {
      this.isLoading = false;

      this.router.navigate(['/paginate/projects']).then(() => {
        this.messageService.add('Zákazka bola aktualizovaná');
      });
    }, error => {
      this.isLoading = false;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
