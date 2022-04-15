import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../../../../core/services/overview.service';
import {TimeService} from '../../../../../core/services/time.service';
import {UserYearlyOverview} from '../../../../../core/models/overview';

@Component({
  selector: 'app-overview-user-time-yearly',
  templateUrl: './overview-user-time-yearly.component.html',
  styleUrls: ['./overview-user-time-yearly.component.scss']
})
export class OverviewUserTimeYearlyComponent implements OnInit {
  isLoad: boolean = false;
  years: number [] = [];
  userYearlyOverviews: UserYearlyOverview[] = [];

  constructor(
    private overviewService: OverviewService,
    private timeService: TimeService
  ) {
  }

  ngOnInit(): void {
    this.timeService.getAllWorkYears().subscribe(years => {
      this.years = years;

      this.overviewService.getUsersYearlyOverview().subscribe(response => {
        this.isLoad = true;

        this.userYearlyOverviews = response;
      });
    });
  }
}
