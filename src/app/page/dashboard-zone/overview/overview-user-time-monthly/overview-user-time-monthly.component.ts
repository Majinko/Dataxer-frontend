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
  isLoad: boolean = false;
  countMonthDays: number[] = [];
  userMonthlyOverviews: UserMonthlyOverview[] = [];

  startDate: string = moment().clone().startOf('month').format('YYYY-MM-DD');
  endDate: string = moment().clone().endOf('month').format('YYYY-MM-DD');

  constructor(private overviewService: OverviewService) {
  }

  ngOnInit(): void {
    this.countMonthDays = new Array(moment().daysInMonth());

    this.overviewService.getUsersMonthlyOverview(this.startDate, this.endDate).subscribe(response => {
      this.isLoad = true;
      this.userMonthlyOverviews = response;
    });
  }

  isWeekendDay(index: any) {
    const newDay = new Date(this.startDate);
    newDay.setDate(index + 1);

    return newDay.getDay() % 6 === 0;
  }
}
