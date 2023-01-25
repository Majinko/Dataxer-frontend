import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APP_DATE_FORMATS} from '../../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {TimeService} from '../time.service';
import {MessageService} from '../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {ProjectService} from 'src/app/core/services/project.service';
import {StrftimePipe} from '../../../../../core/pipes/strftime.pipe';
import {Project} from '../../../../../core/models/project';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {MatRadioButton} from '@angular/material/radio';
import {TimeHelperClass} from '../../../../../core/class/TimeHelperClass';
import {CategoryService} from '../../../../../core/services/category.service';
import {
  CategorySelectGroupComponent
} from '../../../../../theme/component/category-select-group/category-select-group.component';

@Component({
  selector: 'app-time-create',
  templateUrl: './time-create.component.html',
  styleUrls: ['./time-create.component.scss'],
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
    AddPercentPipe,
    StrftimePipe
  ],
})
export class TimeCreateComponent extends TimeHelperClass implements OnInit, AfterViewChecked {
  formGroup: FormGroup;
  filteredOptions: string[];
  isSubmit: boolean = false;
  lastProjects: Project[];
  lastCategories: CategoryItemNode[];

  @ViewChild('categorySelect') categorySelect: CategorySelectGroupComponent;
  @ViewChild('radioCategories') radioSelect: MatRadioButton;
  @ViewChild('radioProjects') radioProjects: MatRadioButton;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router,
    private categoryService: CategoryService,
    private strftimePipe: StrftimePipe,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.prepareForm();
    this.getLastUserTime();
    this.getLastUsersProject();
    this.changeProjectGetCategories();
    this.handleFormChange();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      description: null,
      dateWork: [new Date(), Validators.required],
      timeFromForUser: '8:00',
      timeFrom: null,
      timeToForUser: this.prepareTime(),
      timeTo: null,
      time: null,
      project: [null, Validators.required],
      category: [null, Validators.required],
      km: 0,
      isOutOfWork: false,
    });
  }

  public changeProjectGetCategories() {
    this.f.project.valueChanges.subscribe((project) => {
      if (project?.id) {
        this.getProjectCategories(project);
      } else {
        this.allTimeCategoryForCompany();
      }
    });
  }

  getInternalCategories(groups: string[]) {
    this.categoryService.fallByGroupIn(groups, false).subscribe((nestedCategories) => {
      this.formGroup.patchValue({category: null});
      this.lastCategories = [];
      this.categorySelect.categoryItemNodes = nestedCategories;
    });
  }

  allTimeCategoryForCompany() {
    this.categoryService.allTimeCategoryForCompany().subscribe((nestedCategories) => {
      this.formGroup.patchValue({category: null});
      this.lastCategories = [];
      this.categorySelect.categoryItemNodes = nestedCategories;
    });
  }

  private handleFormChange() {
    // handle project ng select change
    this.formGroup.get('project').valueChanges.subscribe((project) => {
      if (project.id) {
        this.getLatestProjectCategories(project.id);
      }
    });
  }

  private getLastUsersProject() {
    this.timeService.getLastUsersProject(this.userService.user.id).subscribe(projects => {
      if (projects.length > 0) {
        this.lastProjects = projects;

        this.formGroup.patchValue({project: projects[0]});
        if (projects[0].id) {
          this.getLatestProjectCategories(projects[0].id);
        }
      }
    });
  }

  private getLatestProjectCategories(projectId: number) {
    this.timeService.getLatestProjectCategories(projectId).subscribe(categories => {
      this.lastCategories = categories;
      if (categories) {
        this.formGroup.patchValue({category: categories[0]});
      }
    });
  }

  private getLastUserTime() {
    return this.timeService.getLastUserTime().subscribe(time => {
      if (time != null) {
        this.formGroup.patchValue({
          timeFromForUser: this.strftimePipe.transform(time.timeTo),
          timeToForUser: this.prepareTime(),
          isOutOfWork: time.isOutOfWork
        });
      }
    });
  }

  private getProjectCategories(project: Project) {
    // ak sa zapisuje cas do ukonceneho projektu, beru sa len kategorie ktore maju type TIME_AFTER_PROJECT_END
    this.projectService.getCategories(project.id, project.isProjectFinish ? 'TIME_AFTER_PROJECT_END' : null).subscribe(categories => {
      if (categories.length > 0) {
        if (!this.lastCategories) {
          this.formGroup.patchValue({category: categories[0]});
        }
      } else {
        this.formGroup.patchValue({category: null});
      }
      this.categorySelect.categoryItemNodes = categories;
    });
  }

  search(value: string) {
    this.filteredOptions = this._filter(value);
  }

  setProject(project: Project) {
    this.formGroup.patchValue({project});
  }

  setCategory(category: CategoryItemNode) {
    this.formGroup.patchValue({category});
  }

  submit() {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.formGroup.patchValue(this.getTimeData(this.f), {emitEvent: false});

    if (this.f.timeTo.value <= this.f.timeFrom.value) {
      this.messageService.add('Čas do nemôže byt menší, ako čas od.');
      return;
    }

    const formData = this.formGroup.value;
    if (!formData.project.id) {
      formData.project = null;
    }

    this.timeService.store(formData).subscribe(() => {
      this.router.navigate(['/paginate/time']).then(() => {
        this.messageService.add('Čas bol uložený');
      });
    }, error => {
      this.messageService.add(error.error.message);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
