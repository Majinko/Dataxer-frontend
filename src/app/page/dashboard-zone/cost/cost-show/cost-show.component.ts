import {Component, OnInit} from '@angular/core';
import {CostService} from '../../../../core/services/cost.service';
import {Cost} from '../../../../core/models/cost';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cost-show',
  templateUrl: './cost-show.component.html',
  styleUrls: ['./cost-show.component.scss']
})
export class CostShowComponent implements OnInit {

  cost: Cost;

  constructor(
    private costService: CostService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getCost();
  }

  private getCost() {
    this.costService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(cost => {
      this.cost = cost;
    });
  }
}
