import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimeService} from '../../../../core/services/time.service';
import {ActivatedRoute} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS, timeRange} from '../../../../../helper';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import {MessageService} from '../../../../core/services/message.service';
import {Time} from '../../../../core/models/time';
import strftime from 'strftime';
import * as moment from 'moment';

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
export class TimeEditComponent implements OnInit {
  formGroup: FormGroup;
  timeRange: { timesForHuman: string; timesForPc: string }[] = timeRange();
  filteredOptions: string[];
  isSubmit: boolean = false;
  time: Time;

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  search(value: string) {
    this.filteredOptions = this._filter(value);
  }

  private prepareForm() {
    this.timeService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(t => {
      this.formGroup = this.formBuilder.group({
        id: t.id,
        description: t.description,
        company: [null, Validators.required],
        dateWork: [t.dateWork, Validators.required],
        timeFromForUser: strftime('%H:%M', new Date(t.timeFrom * 1000)),
        timeFrom: t.timeFrom,
        timeToForUser: strftime('%H:%M', new Date(t.timeTo * 1000)),
        timeTo: t.timeTo,
        time: t.time,
        project: [t.project, Validators.required],
        category: [t.category, Validators.required],
        km: t.km
      });

      this.time = t;
    });
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

  submit(): void {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.prepareTimeToUnix();

    if (this.f.timeTo.value <= this.f.timeFrom.value) {
      this.messageService.add('Čas do nemôže byt menší, ako čas od.');
      return;
    }

    this.timeService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Čas bol uložený');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
