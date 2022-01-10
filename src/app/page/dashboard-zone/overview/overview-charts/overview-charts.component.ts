import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../../../core/services/overview.service';
import { CategoryCostsOverview } from '../../../../core/models/overview';
import { CostService } from '../../../../core/services/cost.service';

@Component({
  selector: 'app-overview-charts',
  templateUrl: './overview-charts.component.html',
  styleUrls: ['./overview-charts.component.scss']
})
export class OverviewChartsComponent implements OnInit {
  isLoad: boolean = true;
  year: number = new Date().getFullYear();
  categoryCostsOverview: CategoryCostsOverview;
  years: number[] = [];

  constructor(
    private costService: CostService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    this.getYears();
    this.getCosts();
  }

  public getCosts() {
    this.overviewService.getCostsOverview(null, this.year).subscribe(response => {
      this.isLoad = false;

      this.categoryCostsOverview = response;
    });
  }

  private getYears(): void {
    this.costService.getCostsYears().subscribe(years => {
      this.years = years;
    });
  }

}
