import {Component, OnInit, ViewChild} from '@angular/core';
import {OverviewService} from '../../../../core/services/overview.service';
import {CategoryCostsOverview, CategoryMonthsCosts} from '../../../../core/models/overview';
import {AdHostDirective} from '../../../../core/directives/ad-host.directive';
import {CostService} from '../../../../core/services/cost.service';

@Component({
  selector: 'app-overview-cost-yearly',
  templateUrl: './overview-cost-yearly.component.html',
  styleUrls: ['./overview-cost-yearly.component.scss']
})
export class OverviewCostYearlyComponent implements OnInit {
  isLoad: boolean = true;
  months: number[] = new Array(12);
  year: number = new Date().getFullYear();
  years: number[] = [];
  // tslint:disable-next-line:max-line-length
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
  categoryCostsOverview: CategoryCostsOverview;

  @ViewChild(AdHostDirective, {static: false}) adHost: AdHostDirective;

  constructor(
    private costService: CostService,
    private overviewService: OverviewService) {
  }

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

  loadData(categoryMonth: CategoryMonthsCosts) {
    categoryMonth.isOpen = !categoryMonth.isOpen;

    if (!categoryMonth.children) {
      this.overviewService.getCostsOverview(categoryMonth.categoryId, this.year).subscribe(response => {
        categoryMonth.children = response.categoryMonthsCostsDTOS;
      });
    } else {
      this.showHideAllChildren(categoryMonth.children, categoryMonth);
    }
  }

  getPadding(categoryMonth: CategoryMonthsCosts) {
    return categoryMonth.categoryDepth * 25 + 'px';
  }

  private showHideAllChildren(items: CategoryMonthsCosts[], categoryMonth: CategoryMonthsCosts) {
    if (items) {
      items.forEach((item) => {
        item.cssClass = categoryMonth.isOpen ? '' : 'd-none';
        item.isOpen = item.children && categoryMonth.isOpen;

        if (item.children) {
          this.showHideAllChildren(item.children, categoryMonth);
        }
      });
    }
  }
}
