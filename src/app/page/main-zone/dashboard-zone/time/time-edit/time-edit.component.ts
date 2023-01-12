import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimeService} from '../time.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS} from '../../../../../../helper';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {MessageService} from '../../../../../core/services/message.service';
import {Time} from '../../../../../core/models/time';
import strftime from 'strftime';
import {TimeHelperClass} from '../../../../../core/class/TimeHelperClass';
import {Project} from '../../../../../core/models/project';
import {CategoryService} from '../../../../../core/services/category.service';
import {ProjectService} from '../../../../../core/services/project.service';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {
  CategorySelectGroupComponent
} from '../../../../../theme/component/category-select-group/category-select-group.component';

@Component({
  selector: 'app-time-edit',
  templateUrl: './time-edit.component.html',
  styleUrls: ['./time-edit.component.scss'],
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
export class TimeEditComponent extends TimeHelperClass implements OnInit, AfterViewChecked {
  formGroup: FormGroup;
  time: Time;
  isSubmit: boolean = false;
  filteredOptions: string[];
  lastCategories: CategoryItemNode[];

  @ViewChild('categorySelect') categorySelect: CategorySelectGroupComponent;

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  search(value: string) {
    this.filteredOptions = this._filter(value);
  }

  private prepareForm() {
    this.timeService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(t => {
      this.formGroup = this.formBuilder.group({
        id: t.id,
        description: t.description,
        dateWork: [t.dateWork, Validators.required],
        timeFromForUser: strftime('%H:%M', new Date(t.timeFrom * 1000)),
        timeFrom: t.timeFrom,
        timeToForUser: strftime('%H:%M', new Date(t.timeTo * 1000)),
        timeTo: t.timeTo,
        time: t.time,
        project: [t.project, Validators.required],
        category: [t.category, Validators.required],
        km: t.km,
        isOutOfWork: t.isOutOfWork
      });

      this.changeProjectGetCategories();
      this.time = t;

      if (t.project === null) {
        this.formGroup.get('project').patchValue({id: null, title: 'Firemný čas'});
      } else {
        this.getProjectCategories(t.project);
      }
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

  private getProjectCategories(project: Project) {
    // ak sa zapisuje cas do ukonceneho projektu, beru sa len kategorie ktore maju type TIME_AFTER_PROJECT_END
    this.projectService.getCategories(project.id, project.isProjectFinish ? 'TIME_AFTER_PROJECT_END' : null).subscribe(categories => {
      setTimeout(() => {
        this.categorySelect.categoryItemNodes = categories;
      }, 1);
    });
  }

  allTimeCategoryForCompany() {
    this.categoryService.allTimeCategoryForCompany().subscribe((nestedCategories) => {
      this.formGroup.patchValue({category: null});
      this.lastCategories = [];
      this.categorySelect.categoryItemNodes = nestedCategories;
    });
  }

  submit(): void {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    if (this.formGroup.get('project').value.id === null) {
      this.formGroup.patchValue({
        project: null
      }, {emitEvent: false});
    }

    this.formGroup.patchValue(this.getTimeData(this.f), {emitEvent: false});

    if (this.f.timeTo.value <= this.f.timeFrom.value) {
      this.messageService.add('Čas do nemôže byt menší, ako čas od.');
      return;
    }

    this.timeService.update(this.formGroup.value).subscribe(() => {
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
