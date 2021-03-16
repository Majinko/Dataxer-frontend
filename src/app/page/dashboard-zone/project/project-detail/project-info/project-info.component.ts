import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../../../../core/services/invoice.service';
import {PriceOfferService} from '../../../../../core/services/priceOffer.service';
import {CostService} from '../../../../../core/services/cost.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  constructor(
    private invoiceService: InvoiceService,
    private priceOfferService: PriceOfferService,
    private costService: CostService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.invoiceService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(r => {
      console.log(r);
    });

    this.costService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(r => {
      console.log(r);
    });

    this.priceOfferService.findAllByProject(+this.route.snapshot.paramMap.get('id')).subscribe(r => {
      console.log(r);
    });
  }
}
