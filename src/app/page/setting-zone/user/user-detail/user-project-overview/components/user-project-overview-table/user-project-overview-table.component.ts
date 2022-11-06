import {Component, Input, OnInit} from '@angular/core';
import {ProjectProfit} from '../../../../../../../core/models/project';

@Component({
  selector: 'app-user-project-overview-table',
  templateUrl: './user-project-overview-table.component.html',
  styleUrls: ['./user-project-overview-table.component.scss']
})
export class UserProjectOverviewTableComponent implements OnInit {
  @Input() projectProfit: ProjectProfit[] = [];

  displayedColumns: string[] = ['project', 'timeSum', 'profitInPercent', 'profitInEuro'];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.projectProfit);
  }

}
