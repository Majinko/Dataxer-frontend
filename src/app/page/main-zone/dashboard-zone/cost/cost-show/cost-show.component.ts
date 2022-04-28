import {Component, OnInit} from '@angular/core';
import {CostService} from '../../../../../core/services/cost.service';
import {Cost} from '../../../../../core/models/cost';
import {ActivatedRoute} from '@angular/router';
import {PaymentService} from '../../../../../core/services/payment.service';
import {DocumentHelper} from '../../../../../core/class/DocumentHelper';

@Component({
  selector: 'app-cost-show',
  templateUrl: './cost-show.component.html',
  styleUrls: ['./cost-show.component.scss'],
  providers: [DocumentHelper]
})
export class CostShowComponent implements OnInit {
  cost: Cost;

  constructor(
    public costService: CostService,
    public documentHelper: DocumentHelper,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
  ) {
  }

  ngOnInit(): void {
    this.paymentService.newPayment.subscribe(() => {
      this.getCost();
    });

    this.paymentService.destroyPayment.subscribe(() => {
      this.getCost();
    });

    this.getCost();
  }

  private getCost() {
    this.costService.getById(+this.route.snapshot.paramMap.get('id')).subscribe(cost => {
      this.cost = cost;
    });
  }
}
