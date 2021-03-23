import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APP_DATE_FORMATS, timeRange} from '../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import * as moment from 'moment';
import {TimeService} from '../../../../core/services/time.service';
import {MessageService} from '../../../../core/services/message.service';
import {Router} from '@angular/router';
import {UserService} from '../../../../core/services/user.service';
import {ProjectService} from 'src/app/core/services/project.service';
import {NewCategorySelectComponent} from 'src/app/theme/component/new-category-select/new-category-select.component';
import {StrftimePipe} from '../../../../core/pipes/strftime.pipe';

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
  timeRange: string[] = timeRange();
  filteredOptions: string[];
  isSubmit: boolean = false;

  @ViewChild('categorySelect') categorySelect: NewCategorySelectComponent;

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
    this.getLastUsersProject();
    this.getLastUserTime();
  }

  prepareForm() {
    this.formGroup = this.formBuilder.group({
      description: null,
      dateWork: [new Date(), Validators.required],
      timeFromForUser: '8:00',
      timeFrom: null,
      timeToForUser: '16:00',
      timeTo: null,
      time: null,
      project: [null, Validators.required],
      category: [null, Validators.required],
      km: 0
    });
  }

  private getLastUsersProject() {
    this.timeService.getLastUsersProject(this.userService.user.id).subscribe(projects => {
      if (projects.length > 0) {
        this.formGroup.patchValue({project: projects[0]});
        this.getLatestProjectCategories(projects[0].id);
      }

      this.changeProjectGetCategories();
    });
  }

  private getLatestProjectCategories(projectId: number) {
    this.timeService.getLatestProjectCategories(projectId).subscribe(cateogires => {
      if (cateogires.length > 0) {
        this.formGroup.patchValue({category: cateogires[0]});
      }
    });
  }

  private getLastUserTime() {
    return this.timeService.getLastUserTime().subscribe(time => {
      if (time != null) {
        this.formGroup.patchValue({
          timeFromForUser: this.strftimePipe.transform(time.timeTo),
          timeToForUser: this.strftimePipe.transform(time.timeTo + 3600)
        });
      }
    });
  }

  public changeProjectGetCategories() {
    this.f.project.valueChanges.subscribe((project) => {
      this.projectService.getCategories(project.id).subscribe(categories => {

        this.categorySelect.categoryItemNodes = categories;
      });
    });
  }

  search(value: string) {
    this.filteredOptions = this._filter(value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.timeRange.filter(range => range.toLowerCase().replace(':', '') >= filterValue);
  }

  private prepareTimeToUnix() {
    this.formGroup.patchValue({
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
      this.router.navigate(['/time']).then(() => {
        this.messageService.add('Čas bol uložený');
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
