import {Component, Input, OnInit} from '@angular/core';
import {UserOverviewPrice} from '../../../../../../../core/models/user';

@Component({
  selector: 'app-project-user-evaluation-table',
  templateUrl: './project-user-evaluation-table.component.html',
  styleUrls: ['./project-user-evaluation-table.component.scss']
})
export class ProjectUserEvaluationTableComponent implements OnInit {

  @Input() userOverviewPrice: UserOverviewPrice[] = [];

  displayedColumns: string[] = ['name', 'hours', 'hourNetto', 'priceNetto', 'hourBrutto', 'priceBrutto'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
