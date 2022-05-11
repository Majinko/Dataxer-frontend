import {Component, Input, OnInit} from '@angular/core';
import {BudgetPackOverview} from '../../../../../../../../core/models/budget';

@Component({
  selector: 'app-project-budget-pack-table',
  templateUrl: './project-budget-pack-table.component.html',
  styleUrls: ['./project-budget-pack-table.component.scss']
})
export class ProjectBudgetPackTableComponent implements OnInit {
  @Input() budgetPacksOverview: BudgetPackOverview[] = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.budgetPacksOverview);
  }
}
