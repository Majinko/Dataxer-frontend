import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../../../../core/services/overview.service';

@Component({
  selector: 'app-overview-year-by-company',
  templateUrl: './overview-year-by-company.component.html',
  styleUrls: ['./overview-year-by-company.component.scss']
})
export class OverviewYearByCompanyComponent implements OnInit {
  isLoading: boolean;
  companiesData: any;
  years: number[] = [2022, 2021, 2020, 2019]; // todo
  year: number = new Date().getFullYear();

  constructor(
    private overviewService: OverviewService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;

    this.overviewService.yearReviewFinanceByCompany(this.year).subscribe((r) => {
      this.isLoading = false;

      this.companiesData = r;
    });
  }
}
