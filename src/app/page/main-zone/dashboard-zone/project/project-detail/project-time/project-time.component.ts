import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../../../../../../core/services/time.service';
import { Time } from '../../../../../../core/models/time';
import * as lodash from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ProjectTimeFilterComponent } from './project-time-filter/project-time-filter.component';

@Component({
  selector: 'app-project-time',
  templateUrl: './project-time.component.html',
  styleUrls: ['./project-time.component.scss']
})
export class ProjectTimeComponent implements OnInit {
  times: Time[] = [];
  totalTime: number = 0;
  totalPrice: number = 0;
  isLoadingResults: boolean = true;
  daysPriceTime: { time: number, price: number }[] = [];
  months: { start: string, end: string, title: string }[] = [];
  displayedColumns: string[] = ['dateWork', 'stats', 'person', 'description', 'category'];

  @ViewChild(ProjectTimeFilterComponent, { static: false })
  public filterRef: ProjectTimeFilterComponent | undefined;

  constructor(
    private route: ActivatedRoute,
    private timeService: TimeService,
  ) {
  }

  ngOnInit(): void {
    this.getProjectTime();
  }

  getProjectTime(filter?: any) {
    this.timeService.getAllByProjectInDetail(+this.route.parent.snapshot.paramMap.get('id'), filter).subscribe((times) => {
      this.times = times;
      this.isLoadingResults = false;

      this.prepareData();
      this.prepareTimeInDay();
    });
  }

  private prepareData() {
    this.totalPrice = lodash.sumBy(this.times, 'price');
    this.totalTime = lodash.sumBy(this.times, 'time');

    if (this.times && this.times.length > 0) {
      this.prepareMonthsForFilter();
    }
  }

  prepareMonthsForFilter() {
    const start: Moment = moment(this.times[0].dateWork);
    const end: Moment = moment(this.times[this.times.length - 1].dateWork);

    for (let i = 0; i <= end.diff(start, 'month'); i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.months.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
      });
    }
  }

  private prepareTimeInDay() {
    this.daysPriceTime = [];

    this.times.forEach((time) => {
      if (!this.daysPriceTime[time.day]) {
        this.daysPriceTime[time.day] = {
          time: time.time,
          price: time.price
        };
      } else {
        this.daysPriceTime[time.day].time += time.time;
        this.daysPriceTime[time.day].price += time.price;
      }
    });
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', { month: 'long' }) + ' ' + momentData.year();
  }
}
