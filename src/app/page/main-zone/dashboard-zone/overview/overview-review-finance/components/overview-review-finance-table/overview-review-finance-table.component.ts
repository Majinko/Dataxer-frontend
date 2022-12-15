import {Component, Input, OnInit} from '@angular/core';
import {CategoryCostsOverview, CategoryMonthsCosts} from '../../../../../../../core/models/overview';
import {OverviewService} from '../../../../../../../core/services/overview.service';

@Component({
  selector: 'app-overview-review-finance-table',
  templateUrl: './overview-review-finance-table.component.html',
  styleUrls: ['./overview-review-finance-table.component.scss']
})
export class OverviewReviewFinanceTableComponent implements OnInit {
  isLoad: boolean = true;
  months: number[] = new Array(12);
  year: number = new Date().getFullYear();
  years: number[] = [];

  // tslint:disable-next-line:max-line-length
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
  categoryCostsOverview: any;

  @Input() data;

  constructor(
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    this.categoryCostsOverview = this.data;
    this.isLoad = false;
  }

  getPadding(categoryMonth: any) {
    return categoryMonth.categoryDepth * 25 + 'px';
  }

  loadData(categoryMonth: CategoryMonthsCosts) {
    categoryMonth.isOpen = !categoryMonth.isOpen;

    if (!categoryMonth.children) {
      this.isLoad = true;
      this.overviewService.getCostsOverview(categoryMonth.categoryId, this.year).subscribe(response => {
        this.isLoad = false;
        categoryMonth.children = response.categoryMonthsCostsDTOS;
      });
    } else {
      this.showHideAllChildren(categoryMonth.children, categoryMonth);
    }
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
