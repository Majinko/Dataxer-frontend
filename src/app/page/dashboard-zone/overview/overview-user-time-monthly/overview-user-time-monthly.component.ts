import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {OverviewService} from '../../../../core/services/overview.service';
import {UserMonthlyOverview} from '../../../../core/models/overview';

@Component({
  selector: 'app-overview-user-time-monthly',
  templateUrl: './overview-user-time-monthly.component.html',
  styleUrls: ['./overview-user-time-monthly.component.scss']
})
export class OverviewUserTimeMonthlyComponent implements OnInit {
  isLoad: boolean = true;
  countMonthDays: number[] = [];
  userMonthlyOverviews: UserMonthlyOverview[] = [];
  month: { start: string, end: string, title: string };
  months: { start: string, end: string, title: string } [] = [];

  startDate: string = moment().clone().startOf('month').format('YYYY-MM-DD');
  endDate: string = moment().clone().endOf('month').format('YYYY-MM-DD');

  constructor(private overviewService: OverviewService) {
  }

  ngOnInit(): void {
    this.prepareMonths();
    this.getData();
  }

  isWeekendDay(index: any) {
    // todo funkcie v html sa nemaju pouzivat, pridat do objektu
    const newDay = new Date(this.startDate);
    newDay.setDate(index + 1);

    return newDay.getDay() % 6 === 0;
  }

  prepareMonths() {
    for (let i = 0; i <= 12; i++) {
      const monthStart: moment.Moment = moment().subtract(i, 'months').startOf('month');

      this.months.push({
        start: moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD'),
        end: moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD'),
        title: this.getMonthData(monthStart),
      });
    }

    this.month = this.months[0];
  }

  getData() {
    this.isLoad = true;
    this.countMonthDays = new Array(moment(this.month.start).daysInMonth());

    this.overviewService.getUsersMonthlyOverview(this.month.start, this.month.end).subscribe(response => {
      this.isLoad = false;
      this.userMonthlyOverviews = response;
    });
  }

  private getMonthData = (momentData: moment.Moment): string => {
    const date = new Date(momentData.year(), momentData.month(), momentData.date());

    return date.toLocaleString('default', {month: 'long'}) + ' ' + momentData.year();
  }
}
