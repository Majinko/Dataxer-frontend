import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APP_DATE_FORMATS, timeRange} from '../../../../../helper';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AddPercentPipe} from '../../../../core/pipes/add-percent.pipe';
import * as moment from 'moment';
import {TimeService} from '../../../../core/services/time.service';
import {MessageService} from '../../../../core/services/message.service';

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
    AddPercentPipe
  ],
})
export class TimeCreateComponent implements OnInit {
  formGroup: FormGroup;
  timeRange: string[] = timeRange();
  filteredOptions: string[];
  isSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
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

  search(value: string) {
    this.filteredOptions = this._filter(value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.timeRange.filter(range => range.toLowerCase().replace(':', '').replace(/^0+/, '') >= filterValue.replace(/^0+/, ''));
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

    if (this.f.timeTo <= this.f.timeFrom){
      this.messageService.add('Čas do nemôže byt menší, ako čas od.');
      return;
    }

    this.timeService.store(this.formGroup.value).subscribe(() => {

      this.messageService.add('Čas bol uložený');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
