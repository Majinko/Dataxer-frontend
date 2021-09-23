import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryCostsOverview, CategoryMonthsCosts} from '../../../../../../core/models/overview';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-overview-cost-table-row]',
  templateUrl: './overview-cost-table-row.component.html',
  styleUrls: ['./overview-cost-table-row.component.scss']
})
export class OverviewCostTableRowComponent implements OnInit {
  @Input() months: number[];
  @Input() categoryCostsOverview: CategoryCostsOverview;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() private onCategoryClick: EventEmitter<CategoryMonthsCosts> = new EventEmitter<CategoryMonthsCosts>();

  constructor() {
  }

  ngOnInit(): void {
  }

  startLoadData(categoryMonth: CategoryMonthsCosts) {
    this.onCategoryClick.emit(categoryMonth);
  }
}
