import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APP_DATE_FORMATS, timeRange} from '../../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import * as moment from 'moment';
import {TimeService} from '../../../../../core/services/time.service';
import {MessageService} from '../../../../../core/services/message.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../../core/services/user.service';
import {ProjectService} from 'src/app/core/services/project.service';
import {NewCategorySelectComponent} from 'src/app/theme/component/new-category-select/new-category-select.component';
import {StrftimePipe} from '../../../../../core/pipes/strftime.pipe';
import {Project} from '../../../../../core/models/project';
import {CategoryItemNode} from '../../../../../core/models/category-item-node';
import {MatRadioButton} from '@angular/material/radio';

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
export class TimeCreateComponent implements OnInit {
  formGroup: FormGroup;
  timeRange: { timesForHuman: string; timesForPc: string }[] = timeRange();
  filteredOptions: string[];
  isSubmit: boolean = false;
  lastProjects: Project[];
  lastCategories: CategoryItemNode[];

  @ViewChild('categorySelect') categorySelect: NewCategorySelectComponent;
  @ViewChild('radioCategories') radioSelect: MatRadioButton;
  @ViewChild('radioProjects') radioProjects: MatRadioButton;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router,
    private strftimePipe: StrftimePipe
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getLastUserTime();
    this.getLastUsersProject();
    this.changeProjectGetCategories();
    this.handleFormChange();
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
      km: 0
    });
  }

  public changeProjectGetCategories() {
    this.f.project.valueChanges.subscribe((project) => {
      this.getProjectCategories(project);
    });
  }

  private handleFormChange() {
    // handle project ng select change
    this.formGroup.get('project').valueChanges.subscribe((project) => {
      this.getLatestProjectCategories(project.id);
    });
  }

  private getLastUsersProject() {
    this.timeService.getLastUsersProject(this.userService.user.id).subscribe(projects => {
      if (projects.length > 0) {
        this.lastProjects = projects;

        this.formGroup.patchValue({project: projects[0]});
        this.getLatestProjectCategories(projects[0].id);
      }
    });
  }

  private getLatestProjectCategories(projectId: number) {
    this.timeService.getLatestProjectCategories(projectId).subscribe(categories => {
      this.lastCategories = categories;

      this.formGroup.patchValue({category: categories[0]});
    });
  }

  private getLastUserTime() {
    return this.timeService.getLastUserTime().subscribe(time => {
      if (time != null) {
        this.formGroup.patchValue({
          timeFromForUser: this.strftimePipe.transform(time.timeTo),
          timeToForUser: this.prepareTime()
        });
      }
    });
  }

  private getProjectCategories(project: Project) {
    this.projectService.getCategories(project.id).subscribe(categories => {
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const regex = new RegExp(filterValue + '.*', 'g');

    return this.timeRange.filter(range => range.timesForPc.replace(':', '').match(regex)).map(range => {
      return range.timesForHuman;
    });
  }

  private prepareTimeToUnix() {
    this.formGroup.patchValue({
      dateWork: moment(this.f.dateWork.value).format('YYYY-MM-DD'),
      timeFrom: moment(this.f.timeFromForUser.value, 'hh:mm').unix(),
      timeTo: moment(this.f.timeToForUser.value, 'hh:mm').unix(),
      time: moment(this.f.timeToForUser.value, 'hh:mm').unix() - moment(this.f.timeFromForUser.value, 'hh:mm').unix()
    }, {emitEvent: false});
  }

  submit() {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.prepareTimeToUnix();

    if (this.f.timeTo.value <= this.f.timeFrom.value) {
      this.messageService.add('Čas do nemôže byt menší, ako čas od.');
      return;
    }

    this.timeService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/paginate/tiems']).then(() => {
        this.messageService.add('Čas bol uložený');
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  /**
   * Prepare time to
   * @private
   */
  private prepareTime(): string {
    const coefficient = 1000 * 60 * 5;

    const date = new Date();
    const rounded = new Date(Math.round(date.getTime() / coefficient) * coefficient);

    return moment(rounded).format('HH:mm');
  }
}
