import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../../../core/services/overview.service';
import {CategoryCostsOverview} from '../../../../core/models/overview';

@Component({
  selector: 'app-overview-cost-yearly',
  templateUrl: './overview-cost-yearly.component.html',
  styleUrls: ['./overview-cost-yearly.component.scss']
})
export class OverviewCostYearlyComponent implements OnInit {
  isLoad: boolean = false;
  months: number[] = new Array(12);
  // tslint:disable-next-line:max-line-length
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
  categoryCostsOverview: CategoryCostsOverview;

  constructor(private overviewService: OverviewService) {
  }

  ngOnInit(): void {
    this.overviewService.getCostsOverview().subscribe(response => {
      this.isLoad = true;

      this.categoryCostsOverview = response;
    });
  }
}
