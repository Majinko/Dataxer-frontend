import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimeService} from '../time.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {APP_DATE_FORMATS, timeRange} from '../../../../../../helper';
import {AddPercentPipe} from '../../../../../core/pipes/add-percent.pipe';
import {MessageService} from '../../../../../core/services/message.service';
import {Time} from '../../../../../core/models/time';
import strftime from 'strftime';
import {TimeHelperClass} from '../../../../../core/class/TimeHelperClass';

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
export class TimeEditComponent extends TimeHelperClass implements OnInit {
  formGroup: FormGroup;
  time: Time;
  isSubmit: boolean = false;
  filteredOptions: string[];
  timeRange: { timesForHuman: string; timesForPc: string }[] = timeRange();

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
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

      if (t.project === null) {
        this.formGroup.get('project').patchValue({id: null, title: 'Firemný čas'});
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const regex = new RegExp(filterValue + '.*', 'g');

    return this.timeRange.filter(range => range.timesForPc.replace(':', '').match(regex)).map(range => {
      return range.timesForHuman;
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
