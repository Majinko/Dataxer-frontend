import {Component, Input, OnInit} from '@angular/core';
import {ProjectProfit} from '../../../../../../../core/models/project';

@Component({
  selector: 'app-user-project-overview-table',
  templateUrl: './user-project-overview-table.component.html',
  styleUrls: ['./user-project-overview-table.component.scss']
})
export class UserProjectOverviewTableComponent implements OnInit {
  @Input() projectProfit: ProjectProfit[] = [];

  total: number = 0;

  displayedColumns: string[] = ['project', 'timeSum', 'profitInPercent', 'profitInEuro'];

  constructor() {
  }

  ngOnInit(): void {
    this.projectProfit.forEach(projectProfit => {
      this.total += (projectProfit.user[0].hours / 60 / 60) * projectProfit.coefficient;
    });
  }
}
