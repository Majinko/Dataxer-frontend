import {Component, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../core/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../core/services/project.service';
import {User} from '../../../../../core/models/user';
import {UserService} from '../../../../../core/services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../helper';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {CategoryService} from '../../../../../core/services/category.service';
import {
  CategoryItemNode,
  CategoryItemNodeWithSharedCategory,
  ProjectCategoriesMap
} from '../../../../../core/models/category-item-node';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';
import {DemandService} from '../../../../../core/services/demand.service';
import {DemandPackItem} from '../../../../../core/models/pack';

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
    DocumentHelper,
    AddPercentPipe
  ],
})
export class ProjectCreateComponent implements OnInit {
  formGroup: FormGroup;
  demandId: number = null;
  submitted: boolean = false;

  users: User[] = [];
  demandItems: DemandPackItem[] = [];
  categories: CategoryItemNode[] = [];
  groups: { group: string, title: string, categories: CategoryItemNode[], fillCategories: CategoryItemNodeWithSharedCategory[] }[] = [
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
    public documentHelper: DocumentHelper,
    private userService: UserService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private demandService: DemandService,
    @Optional() public dialogRef: MatDialogRef<ProjectCreateComponent>,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getAllCategories(['PROJECT', 'TYPE_PROJECT']);

    this.route.params.subscribe(() => {
      if (this.route.snapshot.paramMap.get('demandId')) {
        this.demandId = +this.route.snapshot.paramMap.get('demandId');

        this.getDemandItems(this.demandId);
      }
    });
  }

  getAllCategories(groups: string[]) {
    this.categoryService.fallByGroupIn(groups).subscribe((nestedCategories) => {
      this.categories = nestedCategories;

      if (this.categories) {
        this.groups.forEach((group) => {
          group.categories = this.categories.filter((c) => c.categoryGroup === group.group);
        });
      }
    });
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      number: null,
      description: '',
      categoryGroup: 'PROJECT',
      contact: null,
      state: null,
      address: '',
      projectProfit: 0,
      area: null,
      demandId: this.demandId,
      startedAt: new Date(),
      finishedAt: new Date(),
      categories: null,
    });
  }

  private getDemandItems(demandId: number) {
    this.demandService.gedDemandPackItem(demandId).subscribe(items => {
      this.demandItems = items;
    });
  }

  private prepareCategoriesBeforeStore() {
    const categories: ProjectCategoriesMap[] = [];

    this.groups.forEach((item) => {
      item.fillCategories.forEach(category => {
        categories.push({
          category: category as CategoryItemNode,
          categoryPared: category.sharedCategory ?? null,
          showName: category.sharedCategory ? category.sharedCategory.showName : null,
          showPerson: category.sharedCategory ? category.sharedCategory.showPerson : null
        });
      });
    });

    this.formGroup.patchValue({categories});
  }

  submit() {
    this.prepareCategoriesBeforeStore();

    this.submitted = true;

    if (this.formGroup.invalid) {
      setTimeout(() => {
        this.documentHelper.scrollIfFormHasErrors(this.formGroup).then(() => {
          this.messageService.add('Prosíme o skontrolovanie povinných údajov');
        });
      }, 100);
      return;
    }

    this.projectService.store(this.formGroup.value).subscribe(() => {
      this.messageService.add('Zákazka bola vytvorena');

      if (this.dialogRef === null) {
        this.router.navigate(['/paginate/projects']).then(() => {
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
